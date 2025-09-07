import { NextResponse } from "next/server";
import {
  ApiError,
  ApiSuccess,
  ErrorCode,
  HttpStatus,
  PaginationMeta,
} from "../../../types/api.types";

// Enhanced error logging utility
interface ErrorLogContext {
  route?: string;
  method?: string;
  userId?: string;
  requestId?: string;
  userAgent?: string;
  ip?: string;
  timestamp?: string;
}

function logError(
  error: unknown,
  context: ErrorLogContext = {},
  level: "error" | "warn" | "info" = "error"
) {
  const logData = {
    timestamp: new Date().toISOString(),
    level,
    context,
    error: {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : "UnknownError",
    },
  };

  // In production, you might want to send this to a logging service
  if (process.env.NODE_ENV === "production") {
    // Send to logging service (e.g., Winston, Sentry, etc.)
    console.error("API Error:", JSON.stringify(logData, null, 2));
  } else {
    // Development logging with better formatting
    console.error("API Error:", {
      route: context.route,
      method: context.method,
      message: logData.error.message,
      stack: logData.error.stack,
    });
  }
}

// Success response helper
export function createSuccessResponse<T>(
  data: T,
  status: HttpStatus = HttpStatus.OK,
  pagination?: PaginationMeta
): NextResponse<ApiSuccess<T>> {
  const response: ApiSuccess<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    ...(pagination && { pagination }),
  };

  return NextResponse.json(response, { status });
}

// Error response helper
export function createErrorResponse(
  code: ErrorCode,
  message: string,
  status: HttpStatus = HttpStatus.BAD_REQUEST,
  details?: any
): NextResponse<ApiError> {
  const response: ApiError = {
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status });
}

// Validation error response (legacy - use validation-errors.ts for enhanced handling)
export function createValidationErrorResponse(
  errors: Record<string, string[]> | string
): NextResponse<ApiError> {
  const message = typeof errors === "string" ? errors : "Validation failed";

  const details = typeof errors === "object" ? errors : undefined;

  return createErrorResponse(
    ErrorCode.VALIDATION_ERROR,
    message,
    HttpStatus.BAD_REQUEST,
    details
  );
}

// Not found error response
export function createNotFoundResponse(
  resource: string = "Resource"
): NextResponse<ApiError> {
  return createErrorResponse(
    ErrorCode.NOT_FOUND,
    `${resource} not found`,
    HttpStatus.NOT_FOUND
  );
}

// Unauthorized error response
export function createUnauthorizedResponse(
  message: string = "Authentication required"
): NextResponse<ApiError> {
  return createErrorResponse(
    ErrorCode.UNAUTHORIZED,
    message,
    HttpStatus.UNAUTHORIZED
  );
}

// Forbidden error response
export function createForbiddenResponse(
  message: string = "Insufficient permissions"
): NextResponse<ApiError> {
  return createErrorResponse(
    ErrorCode.FORBIDDEN,
    message,
    HttpStatus.FORBIDDEN
  );
}

// Conflict error response (for duplicates, capacity issues, etc.)
export function createConflictResponse(
  message: string,
  code: ErrorCode = ErrorCode.DUPLICATE_REGISTRATION
): NextResponse<ApiError> {
  return createErrorResponse(code, message, HttpStatus.CONFLICT);
}

// Internal server error response
export function createInternalErrorResponse(
  message: string = "Internal server error",
  details?: any,
  context?: ErrorLogContext
): NextResponse<ApiError> {
  // Enhanced error logging
  logError(new Error(message), context, "error");

  return createErrorResponse(
    ErrorCode.INTERNAL_ERROR,
    message,
    HttpStatus.INTERNAL_SERVER_ERROR,
    process.env.NODE_ENV === "development" ? details : undefined
  );
}

// Database error response
export function createDatabaseErrorResponse(
  operation: string = "Database operation",
  error?: any,
  context?: ErrorLogContext
): NextResponse<ApiError> {
  logError(error, { ...context, operation }, "error");

  return createErrorResponse(
    ErrorCode.DATABASE_ERROR,
    `${operation} failed`,
    HttpStatus.INTERNAL_SERVER_ERROR,
    process.env.NODE_ENV === "development" ? error?.message : undefined
  );
}

// Google Drive error response
export function createDriveErrorResponse(
  operation: string = "File operation",
  error?: any,
  context?: ErrorLogContext
): NextResponse<ApiError> {
  logError(error, { ...context, operation }, "error");

  return createErrorResponse(
    ErrorCode.DRIVE_ERROR,
    `${operation} failed`,
    HttpStatus.INTERNAL_SERVER_ERROR,
    process.env.NODE_ENV === "development" ? error?.message : undefined
  );
}

// Pagination helper
export function createPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  return {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
}

// Handle async route errors with enhanced context
export function handleRouteError(
  error: unknown,
  context?: ErrorLogContext
): NextResponse<ApiError> {
  // Enhanced error logging with context
  logError(error, context, "error");

  if (error instanceof Error) {
    // Handle Prisma database errors
    if (error.name === "PrismaClientKnownRequestError") {
      const prismaError = error as any;
      switch (prismaError.code) {
        case "P2002":
          return createConflictResponse(
            "A record with this information already exists",
            ErrorCode.DUPLICATE_REGISTRATION
          );
        case "P2025":
          return createNotFoundResponse();
        case "P2003":
          return createValidationErrorResponse(
            "Invalid reference to related record"
          );
        default:
          return createDatabaseErrorResponse(
            "Database operation",
            error,
            context
          );
      }
    }

    // Handle Zod validation errors
    if (error.name === "ZodError") {
      const zodError = error as any;
      const fieldErrors: Record<string, string[]> = {};
      zodError.issues?.forEach((issue: any) => {
        const field = issue.path.join(".");
        if (!fieldErrors[field]) {
          fieldErrors[field] = [];
        }
        fieldErrors[field].push(issue.message);
      });
      return createValidationErrorResponse(fieldErrors);
    }

    // Handle specific error message patterns
    if (error.message.includes("validation")) {
      return createValidationErrorResponse(error.message);
    }

    if (error.message.includes("not found")) {
      return createNotFoundResponse();
    }

    if (
      error.message.includes("unauthorized") ||
      error.message.includes("Admin access required")
    ) {
      return createUnauthorizedResponse(error.message);
    }

    if (error.message.includes("forbidden")) {
      return createForbiddenResponse(error.message);
    }

    if (error.message.includes("capacity") || error.message.includes("full")) {
      return createConflictResponse(error.message, ErrorCode.CAPACITY_EXCEEDED);
    }

    if (
      error.message.includes("duplicate") ||
      error.message.includes("already registered")
    ) {
      return createConflictResponse(
        error.message,
        ErrorCode.DUPLICATE_REGISTRATION
      );
    }

    if (error.message.includes("drive") || error.message.includes("file")) {
      return createDriveErrorResponse("File operation", error, context);
    }

    if (
      error.message.includes("database") ||
      error.message.includes("prisma")
    ) {
      return createDatabaseErrorResponse("Database operation", error, context);
    }

    // Generic error with message
    return createInternalErrorResponse(error.message, undefined, context);
  }

  // Unknown error type
  return createInternalErrorResponse(
    "An unexpected error occurred",
    undefined,
    context
  );
}

// Enhanced response wrapper for async route handlers with context extraction
export function withErrorHandling<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>,
  routeName?: string
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      // Extract context from request if available
      const request = args[0] as any;
      const context: ErrorLogContext = {
        route: routeName || request?.url || "unknown",
        method: request?.method || "unknown",
        userAgent: request?.headers?.get("user-agent") || undefined,
        ip:
          request?.headers?.get("x-forwarded-for") ||
          request?.headers?.get("x-real-ip") ||
          request?.ip ||
          undefined,
        timestamp: new Date().toISOString(),
      };

      return handleRouteError(error, context);
    }
  };
}

// Global error handler for unhandled promise rejections
export function setupGlobalErrorHandlers() {
  if (typeof process !== "undefined") {
    process.on("unhandledRejection", (reason, promise) => {
      logError(
        reason,
        {
          type: "unhandledRejection",
          promise: promise.toString(),
        },
        "error"
      );
    });

    process.on("uncaughtException", (error) => {
      logError(
        error,
        {
          type: "uncaughtException",
        },
        "error"
      );
      // In production, you might want to gracefully shutdown
      if (process.env.NODE_ENV === "production") {
        process.exit(1);
      }
    });
  }
}

// Request context extractor utility
export function extractRequestContext(request: Request): ErrorLogContext {
  return {
    route: request.url,
    method: request.method,
    userAgent: request.headers.get("user-agent") || undefined,
    ip:
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      undefined,
    timestamp: new Date().toISOString(),
  };
}
