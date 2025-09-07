import { NextRequest } from "next/server";
import { GalleryService } from "@/lib/services/gallery.service";
import { EventService } from "@/lib/services/event.service";
import { GalleryQuerySchema } from "@/lib/validations/gallery.validation";
import { EventIdSchema } from "@/lib/validations/event.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  createNotFoundResponse,
  handleRouteError,
} from "@/lib/utils/response";

/**
 * GET /api/gallery/event/[eventId]
 * Get gallery images for a specific event
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { eventId: string } }
) {
  try {
    // Validate event ID parameter
    const paramResult = EventIdSchema.safeParse({ id: params.eventId });

    if (!paramResult.success) {
      return createValidationErrorResponse(
        paramResult.error.flatten().fieldErrors
      );
    }

    const { id: eventId } = paramResult.data;

    // Check if event exists
    const event = await EventService.getEventById(eventId);

    if (!event) {
      return createNotFoundResponse("Event");
    }

    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const queryResult = GalleryQuerySchema.safeParse({
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "12",
      eventId: eventId,
      search: searchParams.get("search") || undefined,
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: searchParams.get("sortOrder") || "desc",
    });

    if (!queryResult.success) {
      return createValidationErrorResponse(
        queryResult.error.flatten().fieldErrors
      );
    }

    const query = queryResult.data;
    const result = await GalleryService.getGalleryImages(query);

    // Transform the response to include proper image URLs
    const transformedImages = result.images.map((image) => ({
      id: image.id,
      title: image.title,
      driveUrl: image.driveUrl,
      thumbnailUrl: image.thumbnailUrl,
      createdAt: image.createdAt,
      event: {
        id: event.id,
        title: event.title,
        date: event.date,
      },
    }));

    return createSuccessResponse(
      {
        event: {
          id: event.id,
          title: event.title,
          date: event.date,
        },
        images: transformedImages,
      },
      200,
      result.pagination
    );
  } catch (error) {
    return handleRouteError(error);
  }
}
