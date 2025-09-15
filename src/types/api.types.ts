// Standard API Response Structure
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

// Pagination Response
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Error Response
export interface ApiError {
  success: false;
  error: string;
  message?: string;
  statusCode?: number;
  errors?: Record<string, string[]>;
}

// Success Response
export interface ApiSuccess<T = any> {
  success: true;
  data: T;
  message?: string;
}

// Query Parameters for Lists
export interface ListQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// File Upload Response
export interface FileUploadResponse {
  fileId: string;
  fileName: string;
  fileUrl: string;
  thumbnailUrl?: string;
  mimeType: string;
  size: number;
}

// Error Codes
export enum ErrorCode {
  VALIDATION_ERROR = "VALIDATION_ERROR",
  NOT_FOUND = "NOT_FOUND",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",
  CAPACITY_EXCEEDED = "CAPACITY_EXCEEDED",
  DUPLICATE_REGISTRATION = "DUPLICATE_REGISTRATION",
  DRIVE_ERROR = "DRIVE_ERROR",
  DATABASE_ERROR = "DATABASE_ERROR",
  INTERNAL_ERROR = "INTERNAL_ERROR",
}

// HTTP Status Codes
export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

// Pagination Meta
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
