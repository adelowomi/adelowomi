import { NextRequest, NextResponse } from "next/server";
import { ZodSchema } from "zod";
import {
  validateRequestBody,
  validateQueryParams,
  validateRouteParams,
  createValidationErrorResponse,
} from "./validation-errors";
import { extractRequestContext } from "./response";

/**
 * Enhanced API route handler with built-in validation
 */
export interface ApiRouteConfig<TBody = any, TQuery = any, TParams = any> {
  bodySchema?: ZodSchema<TBody>;
  querySchema?: ZodSchema<TQuery>;
  paramsSchema?: ZodSchema<TParams>;
  requireAuth?: boolean;
  rateLimit?: {
    maxRequests: number;
    windowMs: number;
  };
}

export interface ValidatedApiRequest<TBody = any, TQuery = any, TParams = any> {
  body?: TBody;
  query?: TQuery;
  params?: TParams;
  request: NextRequest;
  context: {
    requestId: string;
    route: string;
    method: string;
    userAgent?: string;
    ip?: string;
    timestamp: string;
  };
}

/**
 * Create an API route handler with automatic validation
 */
export function createApiHandler<TBody = any, TQuery = any, TParams = any>(
  config: ApiRouteConfig<TBody, TQuery, TParams>,
  handler: (
    req: ValidatedApiRequest<TBody, TQuery, TParams>
  ) => Promise<NextResponse>
) {
  return async (
    request: NextRequest,
    context?: { params?: Record<string, string> }
  ): Promise<NextResponse> => {
    try {
      const requestId = crypto.randomUUID();
      const requestContext = {
        ...extractRequestContext(request),
        requestId,
      };

      // Log request in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[${requestId}] ${request.method} ${request.url}`);
      }

      const validatedRequest: ValidatedApiRequest<TBody, TQuery, TParams> = {
        request,
        context: requestContext,
      };

      // Validate request body if schema provided
      if (config.bodySchema) {
        try {
          const body = await request.json();
          const bodyValidation = validateRequestBody<TBody>(
            config.bodySchema,
            body
          );

          if (!bodyValidation.success) {
            return createValidationErrorResponse(bodyValidation.error);
          }

          validatedRequest.body = bodyValidation.data;
        } catch (error) {
          return createValidationErrorResponse("Invalid JSON in request body");
        }
      }

      // Validate query parameters if schema provided
      if (config.querySchema) {
        const { searchParams } = new URL(request.url);
        const queryParams = Object.fromEntries(searchParams.entries());
        const queryValidation = validateQueryParams<TQuery>(
          config.querySchema,
          queryParams
        );

        if (!queryValidation.success) {
          return createValidationErrorResponse(queryValidation.error);
        }

        validatedRequest.query = queryValidation.data;
      }

      // Validate route parameters if schema provided
      if (config.paramsSchema && context?.params) {
        const paramsValidation = validateRouteParams<TParams>(
          config.paramsSchema,
          context.params
        );

        if (!paramsValidation.success) {
          return createValidationErrorResponse(paramsValidation.error);
        }

        validatedRequest.params = paramsValidation.data;
      }

      // Execute the handler
      const response = await handler(validatedRequest);

      // Log successful response in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[${requestId}] Response: ${response.status}`);
      }

      return response;
    } catch (error) {
      // This will be handled by the global error handler
      throw error;
    }
  };
}

/**
 * Middleware to parse and validate JSON body
 */
export async function parseJsonBody<T>(
  request: NextRequest,
  schema?: ZodSchema<T>
): Promise<
  { success: true; data: T } | { success: false; error: NextResponse }
> {
  try {
    const body = await request.json();

    if (schema) {
      const validation = validateRequestBody<T>(schema, body);
      if (!validation.success) {
        return {
          success: false,
          error: createValidationErrorResponse(validation.error),
        };
      }
      return { success: true, data: validation.data };
    }

    return { success: true, data: body };
  } catch (error) {
    return {
      success: false,
      error: createValidationErrorResponse("Invalid JSON in request body"),
    };
  }
}

/**
 * Middleware to parse and validate form data
 */
export async function parseFormData(
  request: NextRequest,
  requiredFields: string[] = []
): Promise<
  { success: true; data: FormData } | { success: false; error: NextResponse }
> {
  try {
    const formData = await request.formData();

    // Check for required fields
    const missingFields = requiredFields.filter(
      (field) => !formData.has(field)
    );
    if (missingFields.length > 0) {
      const errors = missingFields.reduce((acc, field) => {
        acc[field] = [`${field} is required`];
        return acc;
      }, {} as Record<string, string[]>);

      return {
        success: false,
        error: createValidationErrorResponse(errors),
      };
    }

    return { success: true, data: formData };
  } catch (error) {
    return {
      success: false,
      error: createValidationErrorResponse("Invalid form data"),
    };
  }
}

/**
 * Extract and validate file from form data
 */
export function validateFileUpload(
  formData: FormData,
  fieldName: string,
  options: {
    required?: boolean;
    maxSize?: number; // in bytes
    allowedTypes?: string[];
  } = {}
): { success: true; file: File } | { success: false; error: string } {
  const file = formData.get(fieldName) as File | null;

  if (!file) {
    if (options.required) {
      return { success: false, error: `${fieldName} is required` };
    }
    return { success: true, file: null as any };
  }

  // Check file size
  if (options.maxSize && file.size > options.maxSize) {
    const maxSizeMB = (options.maxSize / (1024 * 1024)).toFixed(1);
    return {
      success: false,
      error: `File size must be less than ${maxSizeMB}MB`,
    };
  }

  // Check file type
  if (options.allowedTypes && !options.allowedTypes.includes(file.type)) {
    return {
      success: false,
      error: `File type must be one of: ${options.allowedTypes.join(", ")}`,
    };
  }

  return { success: true, file };
}

/**
 * Create standardized success response
 */
export function createApiSuccessResponse<T>(
  data: T,
  status: number = 200,
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  }
) {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
      ...(pagination && { pagination }),
    },
    { status }
  );
}

/**
 * Create standardized error response
 */
export function createApiErrorResponse(
  message: string,
  code: string = "INTERNAL_ERROR",
  status: number = 500,
  details?: any
) {
  return NextResponse.json(
    {
      success: false,
      error: {
        code,
        message,
        ...(details && { details }),
      },
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}

/**
 * Utility to check if request method is allowed
 */
export function checkMethodAllowed(
  request: NextRequest,
  allowedMethods: string[]
): NextResponse | null {
  if (!allowedMethods.includes(request.method)) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "METHOD_NOT_ALLOWED",
          message: `Method ${
            request.method
          } not allowed. Allowed methods: ${allowedMethods.join(", ")}`,
        },
        timestamp: new Date().toISOString(),
      },
      {
        status: 405,
        headers: {
          Allow: allowedMethods.join(", "),
        },
      }
    );
  }
  return null;
}
