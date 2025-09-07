import { NextRequest } from "next/server";
import { RegistrationService } from "@/lib/services/registration.service";
import {
  RegistrationQuerySchema,
  EventIdSchema,
} from "@/lib/validations/registration.validation";
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
 * GET /api/admin/events/[id]/registrations - Get registrations for a specific event
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate event ID
    const { id: eventId } = EventIdSchema.parse({ id: params.id });

    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const validatedQuery = RegistrationQuerySchema.parse(queryParams);

    // Get registrations using service
    const result = await RegistrationService.getEventRegistrations(
      eventId,
      validatedQuery
    );

    return createSuccessResponse(result.registrations, 200, result.pagination);
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
