// Re-export Prisma types for client-side use
// This prevents direct Prisma Client imports in browser code

export enum QuestionType {
  TEXT = "TEXT",
  TEXTAREA = "TEXTAREA",
  EMAIL = "EMAIL",
  PHONE = "PHONE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CHECKBOX = "CHECKBOX",
  DATE = "DATE",
  TIME = "TIME",
}

export enum VideoCategory {
  EVENT = "EVENT",
  CONTENT = "CONTENT",
  PROMOTIONAL = "PROMOTIONAL",
}

export enum EventStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  COMPLETED = "COMPLETED",
}

export enum StudentStatus {
  STUDENT = "STUDENT",
  GRADUATE = "GRADUATE",
}

export enum Role {
  ADMIN = "ADMIN",
}
