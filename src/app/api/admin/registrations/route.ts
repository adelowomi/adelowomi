import { NextRequest } from "next/server";
import { RegistrationService } from "@/lib/services/registration.service";
import { RegistrationQuerySchema } from "@/lib/validations/registration.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  handleRouteError,
  createUnauthorizedResponse,
} from "@/lib/utils/response";
import { requireAdmin } from "@/lib/utils/auth";

/**
 * GET /api/admin/registrations - Get all registrations with admin details
 */
export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Add defaults for missing parameters
    const queryWithDefaults = {
      page: queryParams.page || "1",
      limit: queryParams.limit || "10",
      ...queryParams,
    };

    // Validate query parameters
    const validatedQuery = RegistrationQuerySchema.parse(queryWithDefaults);

    // Get registrations using service
    const result = await RegistrationService.getAllRegistrations(
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
