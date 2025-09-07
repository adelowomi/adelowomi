# Admin Authentication Setup

This document outlines the admin authentication flow that has been integrated into the application.

## Overview

The admin authentication system uses NextAuth.js with credentials provider, Prisma for user management, and JWT for session handling.

## Key Components

### 1. Authentication Flow

- **Login Page**: `/admin/auth` - Handles admin login
- **Dashboard**: `/admin/dashboard` - Protected admin area
- **Middleware**: Protects admin routes and API endpoints

### 2. Core Files

- `src/lib/utils/auth.ts` - NextAuth configuration and utilities
- `src/hooks/useAuth.ts` - Client-side authentication hook
- `src/components/Auth/Login.tsx` - Login form component
- `src/components/layouts/AdminLayout.tsx` - Protected layout wrapper
- `src/middleware.ts` - Route protection middleware

### 3. Database

- User model in Prisma schema with ADMIN role
- Seeded admin user for development

## Default Admin Credentials

For development and testing:

- **Email**: `admin@example.com`
- **Password**: `admin123`

## Usage

### 1. Setup Database

```bash
npm run db:migrate
npm run db:seed
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access Admin Panel

1. Navigate to `http://localhost:3000/admin/auth`
2. Use the default credentials above
3. You'll be redirected to `/admin/dashboard` on successful login

## Security Features

### Route Protection

- All `/admin/*` routes require authentication
- All `/api/admin/*` endpoints require admin role
- Automatic redirects for unauthorized access

### Session Management

- JWT-based sessions with 24-hour expiry
- Automatic session validation
- Secure logout functionality

### Middleware Protection

- Server-side route protection
- API endpoint protection
- Role-based access control

## Components

### AdminLayout

Wrap any admin page with `AdminLayout` to ensure authentication:

```tsx
import AdminLayout from "@/components/layouts/AdminLayout";

export default function AdminPage() {
  return <AdminLayout>{/* Your admin content */}</AdminLayout>;
}
```

### useAuth Hook

Client-side authentication utilities:

```tsx
import { useAuth } from "@/hooks/useAuth";

export default function Component() {
  const { session, isAuthenticated, isAdmin, login, logout } = useAuth();

  // Use authentication state and methods
}
```

## API Endpoints

### Authentication

- `POST /api/auth/login` - Login endpoint
- `POST /api/auth/logout` - Logout endpoint
- `GET /api/auth/session` - Get current session

### Protected Admin APIs

All admin APIs are protected and require authentication:

- `/api/admin/events/*`
- `/api/admin/gallery/*`
- `/api/admin/videos/*`
- `/api/admin/registrations/*`

## Environment Variables

Required environment variables in `.env`:

```env
NEXTAUTH_SECRET="your_nextauth_secret_key_here"
NEXTAUTH_URL="http://localhost:3000"
DATABASE_URL="your_database_connection_string"
```

## Production Considerations

1. **Change Default Credentials**: Update the seeded admin user credentials
2. **Secure Environment Variables**: Use strong, unique values for production
3. **HTTPS**: Ensure NEXTAUTH_URL uses HTTPS in production
4. **Session Security**: Consider shorter session expiry for production

## Troubleshooting

### Common Issues

1. **"Authentication required" error**

   - Ensure you're logged in
   - Check if session has expired

2. **Redirect loops**

   - Clear browser cookies
   - Check middleware configuration

3. **Database connection issues**
   - Verify DATABASE_URL is correct
   - Run `npm run db:migrate`

### Debug Mode

Set `NODE_ENV=development` to see authentication debug logs in the console.
