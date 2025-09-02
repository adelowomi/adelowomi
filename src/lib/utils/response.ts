import { NextResponse } from "next/server";
import {
  ApiError,
  ApiSuccess,
  ErrorCode,
  HttpStatus,
  PaginationMeta,
} from "../../../types/api.types";

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

// Validation error response
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
  details?: any
): NextResponse<ApiError> {
  // Log the error details for debugging
  console.error("Internal server error:", { message, details });

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
  error?: any
): NextResponse<ApiError> {
  console.error(`Database error during ${operation}:`, error);

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
  error?: any
): NextResponse<ApiError> {
  console.error(`Google Drive error during ${operation}:`, error);

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

// Handle async route errors
export function handleRouteError(error: unknown): NextResponse<ApiError> {
  console.error("Route error:", error);

  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes("validation")) {
      return createValidationErrorResponse(error.message);
    }

    if (error.message.includes("not found")) {
      return createNotFoundResponse();
    }

    if (error.message.includes("unauthorized")) {
      return createUnauthorizedResponse();
    }

    if (error.message.includes("forbidden")) {
      return createForbiddenResponse();
    }

    // Generic error with message
    return createInternalErrorResponse(error.message);
  }

  // Unknown error type
  return createInternalErrorResponse("An unexpected error occurred");
}

// Response wrapper for async route handlers
export function withErrorHandling<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleRouteError(error);
    }
  };
}
