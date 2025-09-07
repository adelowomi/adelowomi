# Enhanced Error Handling System

This guide explains how to use the comprehensive error handling system implemented for the API layer.

## Overview

The enhanced error handling system provides:

- Global error handling with detailed logging
- Client-friendly validation error messages
- Consistent error response formats
- Request context tracking
- Enhanced debugging capabilities

## Components

### 1. Global Error Handler (`src/lib/middleware/error-handler.ts`)

Provides global error handling middleware for all API routes.

```typescript
import { withGlobalErrorHandling } from "@/lib/middleware/error-handler";

export const GET = withGlobalErrorHandling(async (request) => {
  // Your route logic here
}, "route-name");
```

### 2. Enhanced Response Utilities (`src/lib/utils/response.ts`)

Updated response utilities with enhanced logging and error context.

```typescript
import { handleRouteError, extractRequestContext } from "@/lib/utils/response";

// In your route handler
try {
  // Route logic
} catch (error) {
  const context = extractRequestContext(request);
  return handleRouteError(error, context);
}
```

### 3. Validation Error Handling (`src/lib/utils/validation-errors.ts`)

Provides user-friendly validation error messages and detailed error information.

```typescript
import {
  createValidationErrorResponse,
  validateRequestBody,
} from "@/lib/utils/validation-errors";

// Validate request body
const validation = validateRequestBody(schema, requestBody);
if (!validation.success) {
  return createValidationErrorResponse(validation.error);
}
```

### 4. API Helpers (`src/lib/utils/api-helpers.ts`)

Simplified API route creation with built-in validation and error handling.

```typescript
import { createApiHandler } from "@/lib/utils/api-helpers";

export const POST = createApiHandler(
  {
    bodySchema: MySchema,
    paramsSchema: ParamsSchema,
  },
  async ({ body, params, context }) => {
    // Your validated route logic here
    // body and params are already validated
  }
);
```

## Usage Examples

### Basic Route with Enhanced Error Handling

```typescript
import { NextRequest } from "next/server";
import { withGlobalErrorHandling } from "@/lib/middleware/error-handler";
import { createApiSuccessResponse } from "@/lib/utils/api-helpers";

export const GET = withGlobalErrorHandling(async (request: NextRequest) => {
  const data = await someService.getData();
  return createApiSuccessResponse(data);
}, "get-data");
```

### Route with Validation

```typescript
import { createApiHandler } from "@/lib/utils/api-helpers";
import { MySchema } from "@/lib/validations/my-schema";

export const POST = createApiHandler(
  {
    bodySchema: MySchema,
    paramsSchema: z.object({ id: z.string() }),
  },
  async ({ body, params }) => {
    // body and params are automatically validated
    const result = await someService.create(body, params.id);
    return createApiSuccessResponse(result, 201);
  }
);
```

### Manual Validation with Enhanced Errors

```typescript
import {
  validateRequestBody,
  createValidationErrorResponse,
} from "@/lib/utils/validation-errors";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = validateRequestBody(MySchema, body);

  if (!validation.success) {
    // Returns user-friendly error messages with suggestions
    return createValidationErrorResponse(validation.error);
  }

  // Use validation.data (fully typed and validated)
}
```

## Error Response Formats

### Validation Errors

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "fields": [
        {
          "field": "email",
          "message": "Please enter a valid email address",
          "code": "invalid_string",
          "suggestion": "Try using a format like: yourname@example.com"
        }
      ],
      "summary": "There is 1 validation error that needs to be fixed.",
      "totalErrors": 1
    }
  },
  "timestamp": "2024-02-09T10:30:00.000Z"
}
```

### Business Logic Errors

```json
{
  "success": false,
  "error": {
    "code": "CAPACITY_EXCEEDED",
    "message": "Event has reached maximum capacity",
    "details": {
      "capacity": 100,
      "currentRegistrations": 100,
      "suggestion": "Consider joining the waitlist or check for other available events."
    }
  },
  "timestamp": "2024-02-09T10:30:00.000Z"
}
```

### Success Responses

```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Example"
  },
  "timestamp": "2024-02-09T10:30:00.000Z",
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "totalPages": 3
  }
}
```

## Error Logging

The system automatically logs errors with context:

```typescript
// Development logging
console.error("API Error:", {
  route: "/api/events/123/register",
  method: "POST",
  message: "Validation failed",
  stack: "...",
});

// Production logging (structured JSON)
console.error(
  "API Error:",
  JSON.stringify(
    {
      timestamp: "2024-02-09T10:30:00.000Z",
      level: "error",
      context: {
        route: "/api/events/123/register",
        method: "POST",
        requestId: "uuid-here",
        userAgent: "Mozilla/5.0...",
        ip: "192.168.1.1",
      },
      error: {
        message: "Validation failed",
        stack: "...",
        name: "ValidationError",
      },
    },
    null,
    2
  )
);
```

## Best Practices

### 1. Use Global Error Handling

Always wrap your route handlers with `withGlobalErrorHandling`:

```typescript
export const GET = withGlobalErrorHandling(yourHandler, "route-name");
```

### 2. Use Enhanced Validation

Prefer the enhanced validation utilities over manual validation:

```typescript
// Good
const validation = validateRequestBody(schema, body);
if (!validation.success) {
  return createValidationErrorResponse(validation.error);
}

// Better
export const POST = createApiHandler(
  {
    bodySchema: schema,
  },
  async ({ body }) => {
    // body is already validated
  }
);
```

### 3. Provide Helpful Error Messages

Include suggestions and context in error responses:

```typescript
return createApiErrorResponse(
  "Event has reached maximum capacity",
  ErrorCode.CAPACITY_EXCEEDED,
  HttpStatus.CONFLICT,
  {
    capacity: event.capacity,
    currentRegistrations: count,
    suggestion:
      "Consider joining the waitlist or check for other available events.",
  }
);
```

### 4. Handle Specific Error Types

Handle known error patterns in your business logic:

```typescript
try {
  await someOperation();
} catch (error) {
  if (error.code === "P2002") {
    // Prisma unique constraint
    return createConflictResponse("Record already exists");
  }
  throw error; // Let global handler deal with it
}
```

## Migration Guide

To migrate existing routes to use the enhanced error handling:

1. **Wrap with global error handler:**

   ```typescript
   // Before
   export async function GET(request: NextRequest) { ... }

   // After
   export const GET = withGlobalErrorHandling(async (request: NextRequest) => {
     // Same logic
   }, 'route-name');
   ```

2. **Replace validation:**

   ```typescript
   // Before
   const result = schema.safeParse(body);
   if (!result.success) {
     return createValidationErrorResponse(result.error.flatten().fieldErrors);
   }

   // After
   const validation = validateRequestBody(schema, body);
   if (!validation.success) {
     return createValidationErrorResponse(validation.error);
   }
   ```

3. **Use enhanced API helpers:**

   ```typescript
   // Before
   export async function POST(request: NextRequest, { params }) {
     const body = await request.json();
     // validation logic
     // business logic
   }

   // After
   export const POST = createApiHandler(
     {
       bodySchema: MySchema,
       paramsSchema: ParamsSchema,
     },
     async ({ body, params }) => {
       // business logic only
     }
   );
   ```

This enhanced error handling system provides better developer experience, improved debugging capabilities, and more user-friendly error messages for client applications.
