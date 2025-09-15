import { NextRequest } from "next/server";
import { RegistrationService } from "@/lib/services/registration.service";
import { RegistrationIdSchema } from "@/lib/validations/registration.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createNotFoundResponse,
  handleRouteError,
  createUnauthorizedResponse,
} from "@/lib/utils/response";
import { requireAdmin } from "@/lib/utils/auth";

interface RouteParams {
  params: { id: string };
}

/**
 * GET /api/admin/registrations/[id] - Get a specific registration
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate registration ID parameter
    const paramResult = RegistrationIdSchema.safeParse({ id: params.id });

    if (!paramResult.success) {
      return createValidationErrorResponse(
        paramResult.error.flatten().fieldErrors
      );
    }

    const { id } = paramResult.data;

    // Get registration by ID
    const registration = await RegistrationService.getRegistrationById(id);

    if (!registration) {
      return createNotFoundResponse("Registration");
    }

    return createSuccessResponse(registration);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Admin access required")
    ) {
      return createUnauthorizedResponse("Admin access required");
    }

    return handleRouteError(error);
  }
}

/**
 * DELETE /api/admin/registrations/[id] - Delete a specific registration
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate registration ID parameter
    const paramResult = RegistrationIdSchema.safeParse({ id: params.id });

    if (!paramResult.success) {
      return createValidationErrorResponse(
        paramResult.error.flatten().fieldErrors
      );
    }

    const { id } = paramResult.data;

    // Check if registration exists before deletion
    const registration = await RegistrationService.getRegistrationById(id);

    if (!registration) {
      return createNotFoundResponse("Registration");
    }

    // Delete the registration
    await RegistrationService.deleteRegistration(id);

    return createSuccessResponse(
      {
        message: "Registration deleted successfully",
        deletedRegistration: {
          id: registration.id,
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          eventTitle: registration.event.title,
        },
      },
      200
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Admin access required")
    ) {
      return createUnauthorizedResponse("Admin access required");
    }

    return handleRouteError(error);
  }
}
