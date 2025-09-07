import { z } from "zod";

// Event status enum validation
export const EventStatusSchema = z.enum(["ACTIVE", "INACTIVE", "COMPLETED"]);

// File validation schema for flyer uploads
export const FlyerFileSchema = z.object({
  name: z.string().min(1, "File name is required"),
  type: z
    .string()
    .refine(
      (type) =>
        ["image/jpeg", "image/png", "image/webp", "image/gif"].includes(type),
      "Only JPEG, PNG, WebP, and GIF images are allowed"
    ),
  size: z
    .number()
    .max(10 * 1024 * 1024, "File size must be less than 10MB")
    .positive("File size must be positive"),
  buffer: z.instanceof(Buffer),
});

// Event creation schema (for JSON API)
export const CreateEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  description: z
    .string()
    .max(2000, "Description must be less than 2000 characters")
    .trim()
    .optional(),
  date: z
    .string()
    .datetime("Invalid date format. Use ISO 8601 format")
    .refine((date) => new Date(date) > new Date(), {
      message: "Event date must be in the future",
    }),
  time: z
    .string()
    .min(1, "Time is required")
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format")
    .trim(),
  venue: z
    .string()
    .min(1, "Venue is required")
    .max(200, "Venue must be less than 200 characters")
    .trim(),
  capacity: z
    .number()
    .int("Capacity must be a whole number")
    .positive("Capacity must be greater than 0")
    .max(10000, "Capacity cannot exceed 10,000"),
  flyerUrl: z
    .string()
    .url("Invalid flyer URL format")
    .optional()
    .or(z.literal("")),
  status: EventStatusSchema.default("ACTIVE"),
});

// Event creation schema with file upload support
export const CreateEventWithFileSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim(),
  description: z
    .string()
    .max(2000, "Description must be less than 2000 characters")
    .trim()
    .optional(),
  date: z
    .string()
    .datetime("Invalid date format. Use ISO 8601 format")
    .refine((date) => new Date(date) > new Date(), {
      message: "Event date must be in the future",
    }),
  time: z
    .string()
    .min(1, "Time is required")
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format")
    .trim(),
  venue: z
    .string()
    .min(1, "Venue is required")
    .max(200, "Venue must be less than 200 characters")
    .trim(),
  capacity: z
    .number()
    .int("Capacity must be a whole number")
    .positive("Capacity must be greater than 0")
    .max(10000, "Capacity cannot exceed 10,000"),
  flyerFile: FlyerFileSchema.optional(),
  status: EventStatusSchema.default("ACTIVE"),
});

// Event update schema (all fields optional except id)
export const UpdateEventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be less than 200 characters")
    .trim()
    .optional(),
  description: z
    .string()
    .max(2000, "Description must be less than 2000 characters")
    .trim()
    .optional(),
  date: z
    .string()
    .datetime("Invalid date format. Use ISO 8601 format")
    .optional(),
  time: z
    .string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format")
    .trim()
    .optional(),
  venue: z
    .string()
    .min(1, "Venue is required")
    .max(200, "Venue must be less than 200 characters")
    .trim()
    .optional(),
  capacity: z
    .number()
    .int("Capacity must be a whole number")
    .positive("Capacity must be greater than 0")
    .max(10000, "Capacity cannot exceed 10,000")
    .optional(),
  flyerUrl: z
    .string()
    .url("Invalid flyer URL format")
    .optional()
    .or(z.literal("")),
  status: EventStatusSchema.optional(),
});

// Event query parameters schema
export const EventQuerySchema = z.object({
  page: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine((val) => !isNaN(val) && val > 0, "Page must be a positive number")
    .default(1),
  limit: z
    .union([z.string(), z.number()])
    .transform((val) => (typeof val === "string" ? parseInt(val, 10) : val))
    .refine(
      (val) => !isNaN(val) && val > 0 && val <= 100,
      "Limit must be between 1 and 100"
    )
    .default(10),
  status: EventStatusSchema.optional(),
  search: z
    .string()
    .max(100, "Search term must be less than 100 characters")
    .trim()
    .optional(),
  sortBy: z.enum(["date", "title", "createdAt", "capacity"]).default("date"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

// Event ID parameter schema
export const EventIdSchema = z.object({
  id: z
    .string()
    .min(1, "Event ID is required")
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid event ID format"),
});

// Event status validation helper
export const validateEventStatus = (status: string): boolean => {
  return EventStatusSchema.safeParse(status).success;
};

// Event date validation helper
export const validateEventDate = (date: string): boolean => {
  try {
    const eventDate = new Date(date);
    const now = new Date();
    return eventDate > now;
  } catch {
    return false;
  }
};

// Event capacity validation helper
export const validateEventCapacity = (
  capacity: number,
  currentRegistrations: number = 0
): boolean => {
  return capacity > 0 && capacity >= currentRegistrations;
};

// Type exports
export type CreateEventInput = z.infer<typeof CreateEventSchema>;
export type CreateEventWithFileInput = z.infer<
  typeof CreateEventWithFileSchema
>;
export type UpdateEventInput = z.infer<typeof UpdateEventSchema>;
export type EventQueryInput = z.infer<typeof EventQuerySchema>;
export type EventIdInput = z.infer<typeof EventIdSchema>;
export type EventStatus = z.infer<typeof EventStatusSchema>;
export type FlyerFileInput = z.infer<typeof FlyerFileSchema>;
