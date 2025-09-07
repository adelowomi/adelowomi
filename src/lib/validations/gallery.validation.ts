import { z } from "zod";

// Supported image file types
export const SUPPORTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
] as const;

// File size limits (in bytes)
export const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
export const MAX_THUMBNAIL_SIZE = 2 * 1024 * 1024; // 2MB

// Image file validation schema
export const ImageFileSchema = z.object({
  name: z
    .string()
    .min(1, "File name is required")
    .max(255, "File name must be less than 255 characters")
    .refine((name) => {
      const extension = name.split(".").pop()?.toLowerCase();
      return ["jpg", "jpeg", "png", "webp", "gif"].includes(extension || "");
    }, "Invalid file extension. Supported formats: jpg, jpeg, png, webp, gif"),
  type: z.enum(SUPPORTED_IMAGE_TYPES, {
    errorMap: () => ({
      message: "Unsupported file type. Supported formats: JPEG, PNG, WebP, GIF",
    }),
  }),
  size: z
    .number()
    .positive("File size must be greater than 0")
    .max(
      MAX_IMAGE_SIZE,
      `File size must be less than ${MAX_IMAGE_SIZE / (1024 * 1024)}MB`
    ),
  buffer: z.instanceof(Buffer, { message: "Invalid file buffer" }),
});

// Gallery image creation schema
export const CreateGalleryImageSchema = z.object({
  eventId: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid event ID format")
    .optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  file: ImageFileSchema,
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .trim()
    .optional(),
});

// Gallery image update schema
export const UpdateGalleryImageSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim()
    .optional(),
  eventId: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid event ID format")
    .optional()
    .nullable(),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .trim()
    .optional(),
});

// Gallery query parameters schema
export const GalleryQuerySchema = z.object({
  page: z
    .union([
      z
        .string()
        .regex(/^\d+$/, "Page must be a positive number")
        .transform(Number),
      z.number(),
    ])
    .refine((val) => val > 0, "Page must be greater than 0")
    .default(1),
  limit: z
    .union([
      z
        .string()
        .regex(/^\d+$/, "Limit must be a positive number")
        .transform(Number),
      z.number(),
    ])
    .refine((val) => val > 0 && val <= 50, "Limit must be between 1 and 50")
    .default(12),
  eventId: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid event ID format")
    .optional(),
  search: z
    .string()
    .max(100, "Search term must be less than 100 characters")
    .trim()
    .optional(),
  sortBy: z.enum(["createdAt", "title"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Gallery image ID parameter schema
export const GalleryImageIdSchema = z.object({
  id: z
    .string()
    .min(1, "Image ID is required")
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid image ID format"),
});

// Alias for backward compatibility
export const GalleryIdSchema = GalleryImageIdSchema;

// File type validation helper
export const validateImageType = (mimeType: string): boolean => {
  return SUPPORTED_IMAGE_TYPES.includes(mimeType as any);
};

// File size validation helper
export const validateImageSize = (size: number): boolean => {
  return size > 0 && size <= MAX_IMAGE_SIZE;
};

// Helper function to validate image dimensions (if needed)
export const validateImageDimensions = (
  width: number,
  height: number,
  maxWidth = 4000,
  maxHeight = 4000
): boolean => {
  return width > 0 && height > 0 && width <= maxWidth && height <= maxHeight;
};

// Helper function to generate safe filename
export const generateSafeFilename = (
  originalName: string,
  eventId?: string
): string => {
  const timestamp = Date.now();
  const extension = originalName.split(".").pop()?.toLowerCase() || "jpg";
  const baseName = originalName
    .replace(/\.[^/.]+$/, "") // Remove extension
    .replace(/[^a-zA-Z0-9-_]/g, "_") // Replace special chars with underscore
    .substring(0, 50); // Limit length

  const prefix = eventId ? `event_${eventId}_` : "";
  return `${prefix}${baseName}_${timestamp}.${extension}`;
};

// Helper function to validate file buffer
export const validateFileBuffer = (buffer: Buffer): boolean => {
  if (!buffer || buffer.length === 0) return false;

  // Check for common image file signatures
  const signatures = {
    jpeg: [0xff, 0xd8, 0xff],
    png: [0x89, 0x50, 0x4e, 0x47],
    gif: [0x47, 0x49, 0x46],
    webp: [0x52, 0x49, 0x46, 0x46], // RIFF header for WebP
  };

  for (const [format, signature] of Object.entries(signatures)) {
    if (signature.every((byte, index) => buffer[index] === byte)) {
      return true;
    }
  }

  return false;
};

// Type exports for use in other files
export type CreateGalleryImageInput = z.infer<typeof CreateGalleryImageSchema>;
export type UpdateGalleryImageInput = z.infer<typeof UpdateGalleryImageSchema>;
export type GalleryQueryInput = z.infer<typeof GalleryQuerySchema>;
export type GalleryImageIdInput = z.infer<typeof GalleryImageIdSchema>;
export type ImageFileInput = z.infer<typeof ImageFileSchema>;
export type SupportedImageType = (typeof SUPPORTED_IMAGE_TYPES)[number];
