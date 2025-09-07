import { NextRequest, NextResponse } from "next/server";
import {
  handleRouteError,
  extractRequestContext,
  setupGlobalErrorHandlers,
} from "@/lib/utils/response";

// Initialize global error handlers
setupGlobalErrorHandlers();

/**
 * Global error handling middleware for API routes
 * This middleware wraps API route handlers to provide consistent error handling
 */
export function withGlobalErrorHandling<T extends any[]>(
  handler: (request: NextRequest, ...args: T) => Promise<NextResponse>,
  routeName?: string
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      // Add request ID for tracking
      const requestId = crypto.randomUUID();

      // Extract request context
      const context = {
        ...extractRequestContext(request),
        requestId,
        route: routeName || request.url,
      };

      // Log request start in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[${requestId}] ${request.method} ${request.url}`);
      }

      const response = await handler(request, ...args);

      // Log successful response in development
      if (process.env.NODE_ENV === "development") {
        console.log(`[${requestId}] Response: ${response.status}`);
      }

      return response;
    } catch (error) {
      const context = {
        ...extractRequestContext(request),
        requestId: crypto.randomUUID(),
        route: routeName || request.url,
      };

      return handleRouteError(error, context);
    }
  };
}

/**
 * Middleware to add security headers and request tracking
 */
export function withSecurityHeaders(response: NextResponse): NextResponse {
  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Add CORS headers for API routes
  response.headers.set(
    "Access-Control-Allow-Origin",
    process.env.ALLOWED_ORIGINS || "*"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  return response;
}

/**
 * Rate limiting middleware (basic implementation)
 */
const requestCounts = new Map<string, { count: number; resetTime: number }>();

export function withRateLimit(
  request: NextRequest,
  maxRequests: number = 100,
  windowMs: number = 15 * 60 * 1000 // 15 minutes
): boolean {
  const ip =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "unknown";

  const now = Date.now();
  const windowStart = now - windowMs;

  // Clean up old entries
  for (const [key, value] of requestCounts.entries()) {
    if (value.resetTime < windowStart) {
      requestCounts.delete(key);
    }
  }

  const current = requestCounts.get(ip) || {
    count: 0,
    resetTime: now + windowMs,
  };

  if (current.resetTime < now) {
    // Reset window
    current.count = 1;
    current.resetTime = now + windowMs;
  } else {
    current.count++;
  }

  requestCounts.set(ip, current);

  return current.count <= maxRequests;
}

/**
 * Health check endpoint handler
 */
export function createHealthCheckHandler() {
  return withGlobalErrorHandling(async (request: NextRequest) => {
    const health = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.npm_package_version || "1.0.0",
    };

    return NextResponse.json(health, { status: 200 });
  }, "health-check");
}
