import { NextRequest } from "next/server";
import { EventService } from "@/lib/services/event.service";
import { EventQuerySchema } from "@/lib/validations/event.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  handleRouteError,
} from "@/lib/utils/response";

/**
 * GET /api/events
 * Get all active events for public display
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const queryResult = EventQuerySchema.safeParse({
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "10",
      search: searchParams.get("search") || undefined,
      sortBy: searchParams.get("sortBy") || "date",
      sortOrder: searchParams.get("sortOrder") || "asc",
      status: "ACTIVE", // Only show active events for public
    });

    if (!queryResult.success) {
      return createValidationErrorResponse(
        queryResult.error.flatten().fieldErrors
      );
    }

    const query = queryResult.data;
    const result = await EventService.getEvents(query);

    return createSuccessResponse(result, 200);
  } catch (error) {
    return handleRouteError(error);
  }
}
