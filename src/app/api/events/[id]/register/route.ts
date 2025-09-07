import { NextRequest } from "next/server";
import { RegistrationService } from "@/lib/services/registration.service";
import { EventService } from "@/lib/services/event.service";
import { CreateRegistrationSchema } from "@/lib/validations/registration.validation";
import { EventIdSchema } from "@/lib/validations/event.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createNotFoundResponse,
  createConflictResponse,
  handleRouteError,
} from "@/lib/utils/response";
import { ErrorCode, HttpStatus } from "@/types/api.types";

/**
 * POST /api/events/[id]/register
 * Register a user for a specific event
 */
export async function POST(
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

    const { id: eventId } = paramResult.data;

    // Check if event exists and is active
    const event = await EventService.getEventById(eventId);

    if (!event) {
      return createNotFoundResponse("Event");
    }

    if (event.status !== "ACTIVE") {
      return createConflictResponse(
        "Registration is not available for this event",
        ErrorCode.VALIDATION_ERROR
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const registrationData = { ...body, eventId };

    const validationResult =
      CreateRegistrationSchema.safeParse(registrationData);

    if (!validationResult.success) {
      return createValidationErrorResponse(
        validationResult.error.flatten().fieldErrors
      );
    }

    const validatedData = validationResult.data;

    // Check event capacity
    const capacityCheck = await EventService.checkEventCapacity(eventId);

    if (!capacityCheck.hasCapacity) {
      return createConflictResponse(
        "Event has reached maximum capacity",
        ErrorCode.CAPACITY_EXCEEDED
      );
    }

    // Check for duplicate registration
    const isDuplicate = await EventService.isUserRegistered(
      eventId,
      validatedData.email
    );

    if (isDuplicate) {
      return createConflictResponse(
        "You are already registered for this event",
        ErrorCode.DUPLICATE_REGISTRATION
      );
    }

    // Create the registration
    const registration = await RegistrationService.createRegistration(
      validatedData
    );

    return createSuccessResponse(
      {
        id: registration.id,
        eventId: registration.eventId,
        firstName: registration.firstName,
        lastName: registration.lastName,
        email: registration.email,
        registeredAt: registration.registeredAt,
        message:
          "Registration successful! You will receive a confirmation email shortly.",
      },
      HttpStatus.CREATED
    );
  } catch (error) {
    return handleRouteError(error);
  }
}
