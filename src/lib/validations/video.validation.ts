import { z } from "zod";

// Video category enum validation
export const VideoCategorySchema = z.enum(["EVENT", "CONTENT", "PROMOTIONAL"]);

// Supported video file types
export const SUPPORTED_VIDEO_TYPES = [
  "video/mp4",
  "video/mpeg",
  "video/quicktime",
  "video/x-msvideo", // AVI
  "video/webm",
] as const;

// File size limits (in bytes)
export const MAX_VIDEO_SIZE = 500 * 1024 * 1024; // 500MB
export const MAX_VIDEO_DURATION = 3600; // 1 hour in seconds

// Video file validation schema
export const VideoFileSchema = z.object({
  name: z
    .string()
    .min(1, "File name is required")
    .max(255, "File name must be less than 255 characters")
    .refine((name) => {
      const extension = name.split(".").pop()?.toLowerCase();
      return ["mp4", "mpeg", "mov", "avi", "webm"].includes(extension || "");
    }, "Invalid file extension. Supported formats: mp4, mpeg, mov, avi, webm"),
  type: z.enum(SUPPORTED_VIDEO_TYPES, {
    errorMap: () => ({
      message:
        "Unsupported file type. Supported formats: MP4, MPEG, MOV, AVI, WebM",
    }),
  }),
  size: z
    .number()
    .positive("File size must be greater than 0")
    .max(
      MAX_VIDEO_SIZE,
      `File size must be less than ${MAX_VIDEO_SIZE / (1024 * 1024)}MB`
    ),
  buffer: z.instanceof(Buffer, { message: "Invalid file buffer" }),
});

// Video metadata schema
export const VideoMetadataSchema = z.object({
  duration: z
    .number()
    .positive("Duration must be greater than 0")
    .max(
      MAX_VIDEO_DURATION,
      `Video duration cannot exceed ${MAX_VIDEO_DURATION / 60} minutes`
    )
    .optional(),
  width: z
    .number()
    .positive("Width must be greater than 0")
    .max(4000, "Width cannot exceed 4000 pixels")
    .optional(),
  height: z
    .number()
    .positive("Height must be greater than 0")
    .max(4000, "Height cannot exceed 4000 pixels")
    .optional(),
  bitrate: z.number().positive("Bitrate must be greater than 0").optional(),
  fps: z
    .number()
    .positive("FPS must be greater than 0")
    .max(120, "FPS cannot exceed 120")
    .optional(),
});

// Video creation schema
export const CreateVideoSchema = z.object({
  eventId: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid event ID format")
    .optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .trim()
    .optional(),
  category: VideoCategorySchema.default("EVENT"),
  file: VideoFileSchema,
  metadata: VideoMetadataSchema.optional(),
  tags: z
    .array(z.string().max(50, "Tag must be less than 50 characters"))
    .max(10, "Cannot have more than 10 tags")
    .optional(),
});

// Video update schema
export const UpdateVideoSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .trim()
    .optional(),
  eventId: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid event ID format")
    .optional()
    .nullable(),
  category: VideoCategorySchema.optional(),
  tags: z
    .array(z.string().max(50, "Tag must be less than 50 characters"))
    .max(10, "Cannot have more than 10 tags")
    .optional(),
});

// Video query parameters schema
export const VideoQuerySchema = z.object({
  page: z
    .string()
    .regex(/^\d+$/, "Page must be a positive number")
    .transform(Number)
    .refine((val) => val > 0, "Page must be greater than 0")
    .default("1"),
  limit: z
    .string()
    .regex(/^\d+$/, "Limit must be a positive number")
    .transform(Number)
    .refine((val) => val > 0 && val <= 20, "Limit must be between 1 and 20")
    .default("10"),
  category: VideoCategorySchema.optional(),
  eventId: z
    .string()
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid event ID format")
    .optional(),
  search: z
    .string()
    .max(100, "Search term must be less than 100 characters")
    .trim()
    .optional(),
  sortBy: z.enum(["createdAt", "title", "category"]).default("createdAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Video ID parameter schema
export const VideoIdSchema = z.object({
  id: z
    .string()
    .min(1, "Video ID is required")
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid video ID format"),
});

// Video category parameter schema
export const VideoCategoryParamSchema = z.object({
  category: VideoCategorySchema,
});

// Video category validation helper
export const validateVideoCategory = (category: string): boolean => {
  return VideoCategorySchema.safeParse(category).success;
};

// Video file type validation helper
export const validateVideoType = (mimeType: string): boolean => {
  return SUPPORTED_VIDEO_TYPES.includes(mimeType as any);
};

// Video file size validation helper
export const validateVideoSize = (size: number): boolean => {
  return size > 0 && size <= MAX_VIDEO_SIZE;
};

// Helper function to validate video duration
export const validateVideoDuration = (duration: number): boolean => {
  return duration > 0 && duration <= MAX_VIDEO_DURATION;
};

// Helper function to generate safe video filename
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

// Helper function to validate video file buffer
export const validateVideoFileBuffer = (buffer: Buffer): boolean => {
  if (!buffer || buffer.length === 0) return false;

  // Check for common video file signatures
  const signatures = {
    mp4: [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70], // ftyp box
    avi: [0x52, 0x49, 0x46, 0x46], // RIFF header
    mov: [0x00, 0x00, 0x00, 0x14, 0x66, 0x74, 0x79, 0x70], // QuickTime
    webm: [0x1a, 0x45, 0xdf, 0xa3], // WebM/Matroska
  };

  for (const [format, signature] of Object.entries(signatures)) {
    if (signature.every((byte, index) => buffer[index] === byte)) {
      return true;
    }
  }

  return false;
};

// Helper function to estimate video processing time
export const estimateProcessingTime = (fileSize: number): number => {
  // Rough estimate: 1MB = 10 seconds processing time
  const basetime = Math.ceil(fileSize / (1024 * 1024)) * 10;
  return Math.min(basetime, 1800); // Cap at 30 minutes
};

// Helper function to validate video aspect ratio
export const validateAspectRatio = (width: number, height: number): boolean => {
  if (width <= 0 || height <= 0) return false;

  const ratio = width / height;
  // Common aspect ratios: 16:9, 4:3, 1:1, 9:16 (vertical)
  const validRatios = [16 / 9, 4 / 3, 1, 9 / 16];
  const tolerance = 0.1;

  return validRatios.some(
    (validRatio) => Math.abs(ratio - validRatio) <= tolerance
  );
};

// Type exports for use in other files
export type CreateVideoInput = z.infer<typeof CreateVideoSchema>;
export type UpdateVideoInput = z.infer<typeof UpdateVideoSchema>;
export type VideoQueryInput = z.infer<typeof VideoQuerySchema>;
export type VideoIdInput = z.infer<typeof VideoIdSchema>;
export type VideoCategoryParamInput = z.infer<typeof VideoCategoryParamSchema>;
export type VideoFileInput = z.infer<typeof VideoFileSchema>;
export type VideoMetadataInput = z.infer<typeof VideoMetadataSchema>;
export type VideoCategory = z.infer<typeof VideoCategorySchema>;
export type SupportedVideoType = (typeof SUPPORTED_VIDEO_TYPES)[number];
