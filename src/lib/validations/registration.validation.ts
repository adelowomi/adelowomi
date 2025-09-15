import { z } from "zod";

// Student status enum validation
export const StudentStatusSchema = z.enum(["STUDENT", "GRADUATE"]);

// Phone number validation regex (supports various formats)
const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,20}$/;

// Email validation with additional checks
const emailSchema = z
  .string()
  .email("Invalid email format")
  .min(5, "Email must be at least 5 characters")
  .max(100, "Email must be less than 100 characters")
  .toLowerCase()
  .refine((email) => {
    // Additional validation for common email patterns
    const validDomains = /\.(com|org|net|edu|gov|mil|int|co|io|me|info|biz)$/i;
    return validDomains.test(email);
  }, "Email must have a valid domain");

// Phone number validation with formatting
const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .regex(phoneRegex, "Invalid phone number format")
  .transform((phone) => {
    // Remove all non-digit characters for storage
    return phone.replace(/\D/g, "");
  })
  .refine(
    (phone) => phone.length >= 10 && phone.length <= 15,
    "Phone number must be between 10 and 15 digits"
  );

// Registration creation schema
export const CreateRegistrationSchema = z
  .object({
    eventId: z
      .string()
      .min(1, "Event ID is required")
      .regex(/^[a-zA-Z0-9_-]+$/, "Invalid event ID format"),
    firstName: z
      .string()
      .min(1, "First name is required")
      .max(50, "First name must be less than 50 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "First name can only contain letters, spaces, hyphens, and apostrophes"
      )
      .trim(),
    lastName: z
      .string()
      .min(1, "Last name is required")
      .max(50, "Last name must be less than 50 characters")
      .regex(
        /^[a-zA-Z\s'-]+$/,
        "Last name can only contain letters, spaces, hyphens, and apostrophes"
      )
      .trim(),
    email: emailSchema,
    phone: phoneSchema,
    status: StudentStatusSchema,
    course: z
      .string()
      .max(100, "Course name must be less than 100 characters")
      .trim()
      .optional(),
    areaOfInterest: z
      .string()
      .min(1, "Area of interest is required")
      .max(200, "Area of interest must be less than 200 characters")
      .trim(),
    expectations: z
      .string()
      .max(1000, "Expectations must be less than 1000 characters")
      .trim()
      .optional(),
  })
  .superRefine((data, ctx) => {
    // Validate course requirement based on student status
    if (
      data.status === "STUDENT" &&
      (!data.course || data.course.length === 0)
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Course is required for students",
        path: ["course"],
      });
    }
  });

// Registration query parameters schema
export const RegistrationQuerySchema = z.object({
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
    .refine((val) => val > 0 && val <= 100, "Limit must be between 1 and 100")
    .default("20"),
  search: z
    .string()
    .max(100, "Search term must be less than 100 characters")
    .trim()
    .optional(),
  status: StudentStatusSchema.optional(),
  sortBy: z
    .enum(["registeredAt", "firstName", "lastName", "email"])
    .default("registeredAt"),
  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

// Registration export schema
export const RegistrationExportSchema = z.object({
  eventId: z
    .string()
    .min(1, "Event ID is required")
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid event ID format"),
  format: z.enum(["csv", "xlsx", "json"]).default("csv"),
  fields: z
    .array(
      z.enum([
        "firstName",
        "lastName",
        "email",
        "phone",
        "status",
        "course",
        "areaOfInterest",
        "expectations",
        "registeredAt",
      ])
    )
    .min(1, "At least one field must be selected")
    .default([
      "firstName",
      "lastName",
      "email",
      "phone",
      "status",
      "registeredAt",
    ]),
});

// Registration ID parameter schema
export const RegistrationIdSchema = z.object({
  id: z
    .string()
    .min(1, "Registration ID is required")
    .regex(/^[a-zA-Z0-9_-]+$/, "Invalid registration ID format"),
});

// Student status validation helper
export const validateStudentStatus = (status: string): boolean => {
  return StudentStatusSchema.safeParse(status).success;
};

// Email validation helper
export const validateEmail = (email: string): boolean => {
  return emailSchema.safeParse(email).success;
};

// Phone number validation helper
export const validatePhoneNumber = (phone: string): boolean => {
  return phoneSchema.safeParse(phone).success;
};

// Helper function to format phone number for display
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6
    )}`;
  } else if (cleaned.length === 11 && cleaned.startsWith("1")) {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(
      7
    )}`;
  }
  return phone; // Return original if format is unclear
};

// Helper function to check if registration is duplicate
export const isDuplicateRegistration = (
  existingRegistrations: Array<{ email: string; eventId: string }>,
  newRegistration: { email: string; eventId: string }
): boolean => {
  return existingRegistrations.some(
    (reg) =>
      reg.email.toLowerCase() === newRegistration.email.toLowerCase() &&
      reg.eventId === newRegistration.eventId
  );
};

// Helper function to validate course requirement based on student status
export const validateCourseRequirement = (
  status: string,
  course?: string
): boolean => {
  if (status === "STUDENT") {
    return !!(course && course.trim().length > 0);
  }
  return true; // Course not required for graduates
};

// Type exports for use in other files
export type CreateRegistrationInput = z.infer<typeof CreateRegistrationSchema>;
export type RegistrationQueryInput = z.infer<typeof RegistrationQuerySchema>;
export type RegistrationExportInput = z.infer<typeof RegistrationExportSchema>;
export type RegistrationIdInput = z.infer<typeof RegistrationIdSchema>;
export type StudentStatus = z.infer<typeof StudentStatusSchema>;
