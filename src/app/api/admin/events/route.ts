import { NextRequest } from "next/server";
import { EventService } from "@/lib/services/event.service";
import {
  CreateEventSchema,
  CreateEventWithFileSchema,
  EventQuerySchema,
} from "@/lib/validations/event.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  handleRouteError,
  createUnauthorizedResponse,
} from "@/lib/utils/response";
import { requireAdmin } from "@/lib/utils/auth";

/**
 * GET /api/admin/events - Get all events with admin details
 */
export async function GET(request: NextRequest) {
  try {
    console.log("Admin events API called");

    // Require admin authentication
    console.log("Checking admin authentication...");
    await requireAdmin();
    console.log("Admin authentication passed");

    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Add defaults for missing parameters
    const queryWithDefaults = {
      page: queryParams.page || "1",
      limit: queryParams.limit || "10",
      ...queryParams,
    };

    // Validate query parameters
    const validatedQuery = EventQuerySchema.parse(queryWithDefaults);

    // Get events using service
    console.log("Calling EventService.getEvents with query:", validatedQuery);
    const result = await EventService.getEvents(validatedQuery);
    console.log("EventService returned:", result);

    return createSuccessResponse(result.events, 200, result.pagination);
  } catch (error) {
    console.error("API Error:", error);
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
 * POST /api/admin/events - Create new event
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const contentType = request.headers.get("content-type");

    // Handle multipart form data (with file upload)
    if (contentType?.includes("multipart/form-data")) {
      const formData = await request.formData();

      // Extract form fields
      const title = formData.get("title") as string;
      const description = formData.get("description") as string | null;
      const date = formData.get("date") as string;
      const time = formData.get("time") as string;
      const venue = formData.get("venue") as string;
      const capacity = formData.get("capacity") as string;
      const status = formData.get("status") as string;
      const flyerFile = formData.get("flyerFile") as File | null;

      // Prepare data for validation
      const eventData: any = {
        title,
        description: description || undefined,
        date,
        time,
        venue,
        capacity: parseInt(capacity),
        status: status || "ACTIVE",
      };

      // Add file data if provided
      if (flyerFile && flyerFile.size > 0) {
        const buffer = Buffer.from(await flyerFile.arrayBuffer());
        eventData.flyerFile = {
          name: flyerFile.name,
          type: flyerFile.type,
          size: flyerFile.size,
          buffer,
        };
      }

      // Validate request data
      const validatedData = CreateEventWithFileSchema.parse(eventData);

      // Create event using service with file support
      const event = await EventService.createEventWithFile(validatedData);

      return createSuccessResponse(event, 201);
    }
    // Handle JSON data (legacy support)
    else {
      const body = await request.json();

      // Validate request body
      const validatedData = CreateEventSchema.parse(body);

      // Create event using service
      const event = await EventService.createEvent(validatedData);

      return createSuccessResponse(event, 201);
    }
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
