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
