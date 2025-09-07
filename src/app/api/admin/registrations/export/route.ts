import { NextRequest } from "next/server";
import { RegistrationService } from "@/lib/services/registration.service";
import { RegistrationExportSchema } from "@/lib/validations/registration.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  handleRouteError,
  createUnauthorizedResponse,
} from "@/lib/utils/response";
import { requireAdmin } from "@/lib/utils/auth";

/**
 * POST /api/admin/registrations/export - Export registrations for an event
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const body = await request.json();

    // Validate request body
    const validatedData = RegistrationExportSchema.parse(body);

    // Export registrations using service
    const exportData = await RegistrationService.exportEventRegistrations(
      validatedData.eventId,
      validatedData
    );

    // Return the export data
    return createSuccessResponse(exportData);
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
