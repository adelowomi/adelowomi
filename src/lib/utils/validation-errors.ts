import { ZodError, ZodIssue } from "zod";
import { NextResponse } from "next/server";
import { ApiError, ErrorCode, HttpStatus } from "../../../types/api.types";

// Enhanced validation error types
export interface ValidationErrorDetail {
  field: string;
  message: string;
  code: string;
  value?: any;
  suggestion?: string;
}

export interface ValidationErrorResponse {
  success: false;
  error: {
    code: ErrorCode.VALIDATION_ERROR;
    message: string;
    details: {
      fields: ValidationErrorDetail[];
      summary: string;
      totalErrors: number;
    };
  };
  timestamp: string;
}

// Field-specific error message mappings for better UX
const FIELD_ERROR_MESSAGES: Record<string, Record<string, string>> = {
  email: {
    invalid_string: "Please enter a valid email address",
    too_small: "Email address is too short",
    too_big: "Email address is too long",
    invalid: "Please enter a valid email address (e.g., user@example.com)",
  },
  phone: {
    invalid_string: "Please enter a valid phone number",
    too_small: "Phone number must be at least 10 digits",
    too_big: "Phone number is too long",
    invalid: "Please enter a valid phone number (e.g., (555) 123-4567)",
  },
  password: {
    too_small: "Password must be at least 8 characters long",
    too_big: "Password is too long",
    invalid:
      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  },
  date: {
    invalid_string: "Please enter a valid date",
    invalid: "Please enter a valid date in YYYY-MM-DD format",
    custom: "Date must be in the future",
  },
  time: {
    invalid_string: "Please enter a valid time",
    invalid: "Please enter time in HH:MM format (e.g., 14:30)",
  },
  title: {
    too_small: "Title is required",
    too_big: "Title is too long",
    invalid: "Please enter a valid title",
  },
  firstName: {
    too_small: "First name is required",
    too_big: "First name is too long",
    invalid:
      "First name can only contain letters, spaces, hyphens, and apostrophes",
  },
  lastName: {
    too_small: "Last name is required",
    too_big: "Last name is too long",
    invalid:
      "Last name can only contain letters, spaces, hyphens, and apostrophes",
  },
  capacity: {
    too_small: "Capacity must be greater than 0",
    too_big: "Capacity cannot exceed 10,000",
    invalid: "Capacity must be a positive number",
  },
  venue: {
    too_small: "Venue is required",
    too_big: "Venue name is too long",
    invalid: "Please enter a valid venue name",
  },
  areaOfInterest: {
    too_small: "Area of interest is required",
    too_big: "Area of interest description is too long",
    invalid: "Please specify your area of interest",
  },
  course: {
    too_small: "Course name is required for students",
    too_big: "Course name is too long",
    invalid: "Please enter a valid course name",
  },
};

// Suggestions for common validation errors
const FIELD_SUGGESTIONS: Record<string, string> = {
  email: "Try using a format like: yourname@example.com",
  phone: "Try using a format like: (555) 123-4567 or +1-555-123-4567",
  date: "Use YYYY-MM-DD format and ensure the date is in the future",
  time: "Use 24-hour format like 14:30 or 09:15",
  password:
    "Include at least 8 characters with uppercase, lowercase, and numbers",
  capacity: "Enter a number between 1 and 10,000",
  title: "Keep it between 1 and 200 characters",
  firstName: "Use only letters, spaces, hyphens, and apostrophes",
  lastName: "Use only letters, spaces, hyphens, and apostrophes",
  venue: "Enter the full venue name or address",
  areaOfInterest: "Describe what topics or skills interest you most",
  course: "Enter your current course or program name",
};

/**
 * Transform Zod validation errors into user-friendly error messages
 */
export function transformZodError(error: ZodError): ValidationErrorDetail[] {
  return error.issues.map((issue: ZodIssue) => {
    const field = issue.path.join(".");
    const fieldName = issue.path[issue.path.length - 1] as string;

    // Get custom error message or use default
    let message = issue.message;

    // Check for field-specific error messages
    if (FIELD_ERROR_MESSAGES[fieldName]) {
      const fieldMessages = FIELD_ERROR_MESSAGES[fieldName];
      const errorType = issue.code;

      if (fieldMessages[errorType]) {
        message = fieldMessages[errorType];
      } else if (fieldMessages.invalid) {
        message = fieldMessages.invalid;
      }
    }

    // Get suggestion for the field
    const suggestion = FIELD_SUGGESTIONS[fieldName];

    return {
      field,
      message,
      code: issue.code,
      value:
        issue.code !== "invalid_type" ? (issue as any).received : undefined,
      suggestion,
    };
  });
}

/**
 * Create a comprehensive validation error response
 */
export function createValidationErrorResponse(
  errors: Record<string, string[]> | string | ZodError
): NextResponse<ValidationErrorResponse> {
  let validationErrors: ValidationErrorDetail[] = [];

  if (errors instanceof ZodError) {
    // Handle Zod errors with enhanced messaging
    validationErrors = transformZodError(errors);
  } else if (typeof errors === "string") {
    // Handle simple string errors
    validationErrors = [
      {
        field: "general",
        message: errors,
        code: "invalid",
        suggestion: "Please check your input and try again",
      },
    ];
  } else {
    // Handle field-specific errors object
    validationErrors = Object.entries(errors).flatMap(([field, messages]) =>
      messages.map((message) => ({
        field,
        message,
        code: "invalid",
        suggestion: FIELD_SUGGESTIONS[field],
      }))
    );
  }

  // Create summary message
  const totalErrors = validationErrors.length;
  const fieldCount = new Set(validationErrors.map((e) => e.field)).size;

  let summary: string;
  if (totalErrors === 1) {
    summary = `There is 1 validation error that needs to be fixed.`;
  } else if (fieldCount === 1) {
    summary = `There are ${totalErrors} validation errors in the ${validationErrors[0].field} field.`;
  } else {
    summary = `There are ${totalErrors} validation errors across ${fieldCount} fields that need to be fixed.`;
  }

  const response: ValidationErrorResponse = {
    success: false,
    error: {
      code: ErrorCode.VALIDATION_ERROR,
      message: "Validation failed",
      details: {
        fields: validationErrors,
        summary,
        totalErrors,
      },
    },
    timestamp: new Date().toISOString(),
  };

  return NextResponse.json(response, { status: HttpStatus.BAD_REQUEST });
}

/**
 * Validate request body with enhanced error handling
 */
export function validateRequestBody<T>(
  schema: any,
  data: unknown
): { success: true; data: T } | { success: false; error: ZodError } {
  const result = schema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, error: result.error };
}

/**
 * Validate query parameters with enhanced error handling
 */
export function validateQueryParams<T>(
  schema: any,
  params: Record<string, string | undefined>
): { success: true; data: T } | { success: false; error: ZodError } {
  const result = schema.safeParse(params);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, error: result.error };
}

/**
 * Validate route parameters with enhanced error handling
 */
export function validateRouteParams<T>(
  schema: any,
  params: Record<string, string>
): { success: true; data: T } | { success: false; error: ZodError } {
  const result = schema.safeParse(params);

  if (result.success) {
    return { success: true, data: result.data };
  }

  return { success: false, error: result.error };
}

/**
 * Create field-specific error messages for forms
 */
export function createFieldErrors(
  validationErrors: ValidationErrorDetail[]
): Record<string, { message: string; suggestion?: string }> {
  const fieldErrors: Record<string, { message: string; suggestion?: string }> =
    {};

  validationErrors.forEach((error) => {
    if (!fieldErrors[error.field]) {
      fieldErrors[error.field] = {
        message: error.message,
        suggestion: error.suggestion,
      };
    }
  });

  return fieldErrors;
}

/**
 * Check if validation error is related to a specific field
 */
export function hasFieldError(
  validationErrors: ValidationErrorDetail[],
  fieldName: string
): boolean {
  return validationErrors.some((error) => error.field === fieldName);
}

/**
 * Get all error messages for a specific field
 */
export function getFieldErrors(
  validationErrors: ValidationErrorDetail[],
  fieldName: string
): string[] {
  return validationErrors
    .filter((error) => error.field === fieldName)
    .map((error) => error.message);
}

/**
 * Create a user-friendly error summary for display
 */
export function createErrorSummary(
  validationErrors: ValidationErrorDetail[]
): string {
  const errorCount = validationErrors.length;
  const fieldCount = new Set(validationErrors.map((e) => e.field)).size;

  if (errorCount === 0) {
    return "No validation errors found.";
  }

  if (errorCount === 1) {
    return `Please fix the error in the ${validationErrors[0].field} field.`;
  }

  if (fieldCount === 1) {
    return `Please fix the ${errorCount} errors in the ${validationErrors[0].field} field.`;
  }

  return `Please fix the ${errorCount} errors across ${fieldCount} fields.`;
}
