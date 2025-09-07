import { NextRequest } from "next/server";
import { RegistrationService } from "@/lib/services/registration.service";
import { EventService } from "@/lib/services/event.service";
import { CreateRegistrationSchema } from "@/lib/validations/registration.validation";
import { EventIdSchema } from "@/lib/validations/event.validation";
import { createApiHandler } from "@/lib/utils/api-helpers";
import {
  createApiSuccessResponse,
  createApiErrorResponse,
} from "@/lib/utils/api-helpers";
import { withGlobalErrorHandling } from "@/lib/middleware/error-handler";
import { ErrorCode, HttpStatus } from "@/types/api.types";

/**
 * Enhanced POST /api/events/[id]/register
 * Register a user for a specific event with improved validation and error handling
 */
export const POST = withGlobalErrorHandling(
  createApiHandler(
    {
      bodySchema: CreateRegistrationSchema.omit({ eventId: true }), // eventId comes from params
      paramsSchema: EventIdSchema,
    },
    async ({ body, params, context }) => {
      const { id: eventId } = params!;
      const registrationData = { ...body!, eventId };

      // Check if event exists and is active
      const event = await EventService.getEventById(eventId);

      if (!event) {
        return createApiErrorResponse(
          "Event not found",
          ErrorCode.NOT_FOUND,
          HttpStatus.NOT_FOUND
        );
      }

      if (event.status !== "ACTIVE") {
        return createApiErrorResponse(
          "Registration is not available for this event. The event may be inactive or completed.",
          ErrorCode.VALIDATION_ERROR,
          HttpStatus.CONFLICT,
          {
            eventStatus: event.status,
            suggestion:
              "Please check the event status or contact support for assistance.",
          }
        );
      }

      // Check event capacity
      const capacityCheck = await EventService.checkEventCapacity(eventId);

      if (!capacityCheck.hasCapacity) {
        return createApiErrorResponse(
          "Event has reached maximum capacity",
          ErrorCode.CAPACITY_EXCEEDED,
          HttpStatus.CONFLICT,
          {
            capacity: event.capacity,
            currentRegistrations: capacityCheck.currentCount,
            suggestion:
              "Consider joining the waitlist or check for other available events.",
          }
        );
      }

      // Check for duplicate registration
      const isDuplicate = await EventService.isUserRegistered(
        eventId,
        registrationData.email
      );

      if (isDuplicate) {
        return createApiErrorResponse(
          "You are already registered for this event",
          ErrorCode.DUPLICATE_REGISTRATION,
          HttpStatus.CONFLICT,
          {
            email: registrationData.email,
            eventTitle: event.title,
            suggestion:
              "Check your email for the original confirmation or contact support if you need to update your registration.",
          }
        );
      }

      // Create the registration
      const registration = await RegistrationService.createRegistration(
        registrationData
      );

      return createApiSuccessResponse(
        {
          id: registration.id,
          eventId: registration.eventId,
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          registeredAt: registration.registeredAt,
          event: {
            id: event.id,
            title: event.title,
            date: event.date,
            venue: event.venue,
          },
          message:
            "Registration successful! You will receive a confirmation email shortly.",
          nextSteps: [
            "Check your email for confirmation details",
            "Add the event to your calendar",
            "Prepare any required materials mentioned in the event description",
          ],
        },
        HttpStatus.CREATED
      );
    }
  ),
  "event-registration"
);

// Example of how the enhanced validation would work:
/*
Request with validation errors would return:
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
        },
        {
          "field": "phone",
          "message": "Phone number must be at least 10 digits",
          "code": "too_small",
          "suggestion": "Try using a format like: (555) 123-4567 or +1-555-123-4567"
        }
      ],
      "summary": "There are 2 validation errors across 2 fields that need to be fixed.",
      "totalErrors": 2
    }
  },
  "timestamp": "2024-02-09T10:30:00.000Z"
}
*/
