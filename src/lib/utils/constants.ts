// Database configuration constants
export const DB_CONFIG = {
  CONNECTION_TIMEOUT: 60000, // 60 seconds
  POOL_TIMEOUT: 60000, // 60 seconds
  MAX_CONNECTIONS: 10,
  MIN_CONNECTIONS: 2,
} as const;

// API Response constants
export const API_RESPONSES = {
  SUCCESS: "success",
  ERROR: "error",
  VALIDATION_ERROR: "validation_error",
  NOT_FOUND: "not_found",
  UNAUTHORIZED: "unauthorized",
  FORBIDDEN: "forbidden",
} as const;

// Event constants
export const EVENT_CONFIG = {
  DEFAULT_CAPACITY: 100,
  MAX_CAPACITY: 1000,
  MIN_CAPACITY: 1,
} as const;

// File upload constants
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
  ALLOWED_VIDEO_TYPES: ["video/mp4", "video/webm", "video/quicktime"],
} as const;

// Google Drive folder structure
export const DRIVE_FOLDERS = {
  EVENTS: "Events",
  GENERAL_IMAGES: "General-Content/Images",
  GENERAL_VIDEOS: "General-Content/Videos",
  THUMBNAILS: "Thumbnails",
} as const;
