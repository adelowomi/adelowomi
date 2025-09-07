// User Role Enum
export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
}

// User Interface
export interface User {
  id: string;
  email: string;
  name?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Login Input
export interface LoginInput {
  email: string;
  password: string;
}

// User Session
export interface UserSession {
  user: User;
  token: string;
  expiresAt: Date;
}

// Auth Response
export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
  error?: string;
}
