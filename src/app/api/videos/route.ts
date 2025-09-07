import { NextRequest } from "next/server";
import { VideoService } from "@/lib/services/video.service";
import { VideoQuerySchema } from "@/lib/validations/video.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  handleRouteError,
} from "@/lib/utils/response";

/**
 * GET /api/videos
 * Get all videos for public display
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Parse and validate query parameters
    const queryResult = VideoQuerySchema.safeParse({
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "10",
      category: searchParams.get("category") || undefined,
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
        videos: transformedVideos,
        category: query.category,
      },
      200,
      result.pagination
    );
  } catch (error) {
    return handleRouteError(error);
  }
}
