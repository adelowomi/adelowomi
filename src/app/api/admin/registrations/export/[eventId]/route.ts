import { NextRequest } from "next/server";
import { RegistrationService } from "@/lib/services/registration.service";
import {
  RegistrationExportSchema,
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
    eventId: string;
  };
}

/**
 * GET /api/admin/registrations/export/[eventId] - Export registrations for an event
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate event ID
    const { id: eventId } = EventIdSchema.parse({ id: params.eventId });

    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Set default export options
    const exportOptions = {
      eventId,
      format: queryParams.format || "csv",
      fields: queryParams.fields ? queryParams.fields.split(",") : undefined,
    };

    // Validate export parameters
    const validatedOptions = RegistrationExportSchema.parse(exportOptions);

    // Get export data using service
    const exportData = await RegistrationService.exportEventRegistrations(
      eventId,
      validatedOptions
    );

    // Format response based on requested format
    if (validatedOptions.format === "json") {
      return createSuccessResponse(exportData);
    }

    // For CSV/XLSX, we'll return the data and let the frontend handle formatting
    // This allows for better client-side control over file generation
    const response = createSuccessResponse({
      ...exportData,
      format: validatedOptions.format,
      fields: validatedOptions.fields,
    });

    // Add headers to indicate this is export data
    response.headers.set("Content-Type", "application/json");
    response.headers.set("X-Export-Format", validatedOptions.format);
    response.headers.set(
      "X-Export-Filename",
      `${exportData.eventTitle.replace(/[^a-zA-Z0-9]/g, "_")}_registrations.${
        validatedOptions.format
      }`
    );

    return response;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Admin access required")
    ) {
      return createUnauthorizedResponse("Admin access required");
    }

    if (error instanceof Error && error.message.includes("not found")) {
      return createNotFoundResponse("Event");
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
 * POST /api/admin/registrations/export/[eventId] - Export registrations with custom options
 */
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate event ID
    const { id: eventId } = EventIdSchema.parse({ id: params.eventId });

    const body = await request.json();

    // Merge eventId with body data
    const exportOptions = {
      eventId,
      ...body,
    };

    // Validate export parameters
    const validatedOptions = RegistrationExportSchema.parse(exportOptions);

    // Get export data using service
    const exportData = await RegistrationService.exportEventRegistrations(
      eventId,
      validatedOptions
    );

    // Format response based on requested format
    if (validatedOptions.format === "json") {
      return createSuccessResponse(exportData);
    }

    // For CSV/XLSX, return structured data for client-side processing
    const response = createSuccessResponse({
      ...exportData,
      format: validatedOptions.format,
      fields: validatedOptions.fields,
    });

    // Add headers to indicate this is export data
    response.headers.set("Content-Type", "application/json");
    response.headers.set("X-Export-Format", validatedOptions.format);
    response.headers.set(
      "X-Export-Filename",
      `${exportData.eventTitle.replace(/[^a-zA-Z0-9]/g, "_")}_registrations.${
        validatedOptions.format
      }`
    );

    return response;
  } catch (error) {
    if (
      error instanceof Error &&
      error.message.includes("Admin access required")
    ) {
      return createUnauthorizedResponse("Admin access required");
    }

    if (error instanceof Error && error.message.includes("not found")) {
      return createNotFoundResponse("Event");
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
