import { NextRequest } from "next/server";
import { EventService } from "@/lib/services/event.service";
import { EventIdSchema } from "@/lib/validations/event.validation";
import {
  createSuccessResponse,
  createNotFoundResponse,
  createValidationErrorResponse,
  handleRouteError,
} from "@/lib/utils/response";

/**
 * GET /api/events/[id]
 * Get specific event details for public display
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate event ID parameter
    const paramResult = EventIdSchema.safeParse({ id: params.id });

    if (!paramResult.success) {
      return createValidationErrorResponse(
        paramResult.error.flatten().fieldErrors
      );
    }

    const { id } = paramResult.data;
    const event = await EventService.getEventById(id);

    if (!event) {
      return createNotFoundResponse("Event");
    }

    // Only return active events for public API
    if (event.status !== "ACTIVE") {
      return createNotFoundResponse("Event");
    }

    return createSuccessResponse(event);
  } catch (error) {
    return handleRouteError(error);
  }
}
