// User Role Enum
export enum Role {
  ADMIN = "ADMIN",
}

// User Interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

// User without sensitive data (for API responses)
export interface SafeUser {
  id: string;
  email: string;
  name: string;
  role: Role;
}

// Login Credentials
export interface LoginCredentials {
  email: string;
  password: string;
}

// Auth Session
export interface AuthSession {
  user: SafeUser;
  expires: string;
  accessToken?: string;
}

// JWT Payload
export interface JWTPayload {
  sub: string; // user id
  email: string;
  name: string;
  role: Role;
  iat?: number;
  exp?: number;
}

// Auth Response
export interface AuthResponse {
  user: SafeUser;
  token?: string;
  message: string;
}

// Password Reset (for future use)
export interface PasswordResetRequest {
  email: string;
}

export interface PasswordReset {
  token: string;
  newPassword: string;
}

// User Creation Input (for seeding/admin creation)
export interface UserInput {
  email: string;
  password: string;
  name: string;
  role?: Role;
}

// Session Validation Response
export interface SessionValidation {
  valid: boolean;
  user?: SafeUser;
  error?: string;
}
