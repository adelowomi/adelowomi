import { NextRequest } from "next/server";
import { VideoService } from "@/lib/services/video.service";
import {
  VideoQuerySchema,
  VideoCategoryParamSchema,
} from "@/lib/validations/video.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  handleRouteError,
} from "@/lib/utils/response";

/**
 * GET /api/videos/category/[category]
 * Get videos by category for public display
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { category: string } }
) {
  try {
    // Validate category parameter
    const paramResult = VideoCategoryParamSchema.safeParse({
      category: params.category.toUpperCase(),
    });

    if (!paramResult.success) {
      return createValidationErrorResponse(
        paramResult.error.flatten().fieldErrors
      );
    }

    const { category } = paramResult.data;

    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const queryResult = VideoQuerySchema.safeParse({
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "10",
      category: category,
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
    const result = await VideoService.getVideos(query);

    // Transform the response to include proper video URLs and streaming info
    const transformedVideos = result.videos.map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description,
      category: video.category,
      eventId: video.eventId,
      driveUrl: video.driveUrl,
      thumbnailUrl: video.thumbnailUrl,
      createdAt: video.createdAt,
      event: video.event
        ? {
            id: video.event.id,
            title: video.event.title,
            date: video.event.date,
          }
        : null,
    }));

    return createSuccessResponse(
      {
        category: category,
        videos: transformedVideos,
      },
      200,
      result.pagination
    );
  } catch (error) {
    return handleRouteError(error);
  }
}
