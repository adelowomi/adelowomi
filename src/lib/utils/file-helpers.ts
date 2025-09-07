/**
 * Utility functions for file handling and processing
 */

/**
 * Generate a safe filename for file uploads
 */
export const generateSafeFilename = (
  originalName: string,
  prefix?: string
): string => {
  const timestamp = Date.now();
  const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";
  const baseName = originalName
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/[^a-zA-Z0-9-_]/g, "_") // Replace special chars with underscore
    .substring(0, 50); // Limit length

  const prefixStr = prefix ? `${prefix}_` : "";
  return `${prefixStr}${baseName}_${timestamp}.${extension}`;
};

/**
 * Generate a safe filename specifically for video files
 */
export const generateSafeVideoFilename = (
  originalName: string,
  eventId?: string
): string => {
  const timestamp = Date.now();
  const extension = originalName.split(".").pop()?.toLowerCase() || "mp4";
  const baseName = originalName
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/[^a-zA-Z0-9-_]/g, "_") // Replace special chars with underscore
    .substring(0, 50); // Limit length

  const prefix = eventId ? `event_${eventId}_` : "";
  return `${prefix}${baseName}_${timestamp}.${extension}`;
};

/**
 * Validate file type against allowed types
 */
export const validateFileType = (
  fileType: string,
  allowedTypes: string[]
): boolean => {
  return allowedTypes.includes(fileType);
};

/**
 * Format file size for display
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

/**
 * Get file extension from filename
 */
export const getFileExtension = (filename: string): string => {
  return filename.split(".").pop()?.toLowerCase() || "";
};

/**
 * Check if file is an image
 */
export const isImageFile = (fileType: string): boolean => {
  const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  return imageTypes.includes(fileType);
};

/**
 * Check if file is a video
 */
export const isVideoFile = (fileType: string): boolean => {
  const videoTypes = [
    "video/mp4",
    "video/webm",
    "video/ogg",
    "video/avi",
    "video/mov",
  ];
  return videoTypes.includes(fileType);
};

/**
 * Convert Google Drive URL to direct image URL
 * Handles both webViewLink and file ID formats
 */
export const getGoogleDriveImageUrl = (url: string): string => {
  if (!url) return "";

  // If it's already a direct image URL, return as is
  if (url.includes("drive.google.com/uc?export=view&id=")) {
    return url;
  }

  // Extract file ID from various Google Drive URL formats
  let fileId = "";

  // Format: https://drive.google.com/file/d/FILE_ID/view
  const viewMatch = url.match(/\/file\/d\/([a-zA-Z0-9-_]+)/);
  if (viewMatch) {
    fileId = viewMatch[1];
  }

  // Format: https://drive.google.com/open?id=FILE_ID
  const openMatch = url.match(/[?&]id=([a-zA-Z0-9-_]+)/);
  if (openMatch) {
    fileId = openMatch[1];
  }

  // If we couldn't extract file ID, assume the URL itself is the file ID
  if (!fileId && url.match(/^[a-zA-Z0-9-_]+$/)) {
    fileId = url;
  }

  // Return direct image URL if we have a file ID
  if (fileId) {
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  }

  // Fallback: return original URL
  return url;
};
