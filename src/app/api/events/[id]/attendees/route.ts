import { NextRequest } from "next/server";
import { RegistrationService } from "@/lib/services/registration.service";
import { EventService } from "@/lib/services/event.service";
import {
  createSuccessResponse,
  createNotFoundResponse,
  handleRouteError,
} from "@/lib/utils/response";

/**
 * GET /api/events/[id]/attendees
 * Get all attendees (registrations) for a specific event
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id;

    // Check if event exists
    const event = await EventService.getEventById(eventId);

    if (!event) {
      return createNotFoundResponse("Event");
    }

    // Get all registrations for the event
    const attendees = await RegistrationService.getEventAttendees(eventId);

    return createSuccessResponse(attendees, 200);
  } catch (error) {
    return handleRouteError(error);
  }
}
