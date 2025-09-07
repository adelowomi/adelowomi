import { NextRequest } from "next/server";
import { GalleryService } from "@/lib/services/gallery.service";
import { GalleryQuerySchema } from "@/lib/validations/gallery.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  handleRouteError,
} from "@/lib/utils/response";

/**
 * GET /api/gallery
 * Get all gallery images for public display
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const queryResult = GalleryQuerySchema.safeParse({
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "12",
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
      event: image.event
        ? {
            id: image.event.id,
            title: image.event.title,
            date: image.event.date,
          }
        : null,
    }));

    return createSuccessResponse(transformedImages, 200, result.pagination);
  } catch (error) {
    return handleRouteError(error);
  }
}
