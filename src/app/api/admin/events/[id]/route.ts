import { NextRequest } from "next/server";
import { EventService } from "@/lib/services/event.service";
import {
  UpdateEventSchema,
  EventIdSchema,
} from "@/lib/validations/event.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createNotFoundResponse,
  handleRouteError,
  createUnauthorizedResponse,
} from "@/lib/utils/response";
import { requireAdmin } from "@/lib/utils/auth";

interface RouteParams {
  params: {
    id: string;
  };
}

/**
 * GET /api/admin/events/[id] - Get specific event with admin details
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate event ID
    const { id: eventId } = EventIdSchema.parse({ id: params.id });

    // Get event using service
    const event = await EventService.getEventById(eventId);

    if (!event) {
      return createNotFoundResponse("Event");
    }

    return createSuccessResponse(event);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Admin access required")
    ) {
      return createUnauthorizedResponse("Admin access required");
    }

    // Handle validation errors
    if (error && typeof error === "object" && "issues" in error) {
      const validationErrors: Record<string, string[]> = {};
      (error as any).issues.forEach((issue: any) => {
        const field = issue.path.join(".");
        if (!validationErrors[field]) {
          validationErrors[field] = [];
        }
        validationErrors[field].push(issue.message);
      });
      return createValidationErrorResponse(validationErrors);
    }

    return handleRouteError(error);
  }
}

/**
 * PUT /api/admin/events/[id] - Update specific event
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate event ID
    const { id: eventId } = EventIdSchema.parse({ id: params.id });

    const body = await request.json();

    // Validate request body
    const validatedData = UpdateEventSchema.parse(body);

    // Update event using service
    const event = await EventService.updateEvent(eventId, validatedData);

    return createSuccessResponse(event);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Admin access required")
    ) {
      return createUnauthorizedResponse("Admin access required");
    }

    // Handle validation errors
    if (error && typeof error === "object" && "issues" in error) {
      const validationErrors: Record<string, string[]> = {};
      (error as any).issues.forEach((issue: any) => {
        const field = issue.path.join(".");
        if (!validationErrors[field]) {
          validationErrors[field] = [];
        }
        validationErrors[field].push(issue.message);
      });
      return createValidationErrorResponse(validationErrors);
    }

    return handleRouteError(error);
  }
}

/**
 * DELETE /api/admin/events/[id] - Delete specific event
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate event ID
    const { id: eventId } = EventIdSchema.parse({ id: params.id });

    // Delete event using service
    await EventService.deleteEvent(eventId);

    return createSuccessResponse({ message: "Event deleted successfully" });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Admin access required")
    ) {
      return createUnauthorizedResponse("Admin access required");
    }

    // Handle validation errors
    if (error && typeof error === "object" && "issues" in error) {
      const validationErrors: Record<string, string[]> = {};
      (error as any).issues.forEach((issue: any) => {
        const field = issue.path.join(".");
        if (!validationErrors[field]) {
          validationErrors[field] = [];
        }
        validationErrors[field].push(issue.message);
      });
      return createValidationErrorResponse(validationErrors);
    }

    return handleRouteError(error);
  }
}
