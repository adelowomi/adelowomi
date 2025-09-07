import { NextRequest } from "next/server";
import { GalleryService } from "@/lib/services/gallery.service";
import { VideoService } from "@/lib/services/video.service";
import { prisma } from "@/lib/utils/db";
import { createSuccessResponse, handleRouteError } from "@/lib/utils/response";

/**
 * GET /api/events/[id]/media
 * Get all media (images and videos) for a specific event
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const eventId = params.id;

    console.log("Fetching media for event ID:", eventId);
    console.log("Event ID type:", typeof eventId);
    console.log("Event ID length:", eventId?.length);

    if (!eventId) {
      return Response.json(
        { success: false, error: { message: "Event ID is required" } },
        { status: 400 }
      );
    }

    // Let's also check what events exist
    const allEvents = await prisma.event.findMany({
      select: { id: true, title: true },
    });
    console.log("All events in database:", allEvents);

    // Check if this specific event exists
    const eventExists = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, title: true },
    });
    console.log("Current event exists:", eventExists);

    // Get images and videos for the event
    console.log("Calling GalleryService.getEventImages...");
    const [imagesResult, videosResult] = await Promise.all([
      GalleryService.getEventImages(eventId, 1, 50).catch((error) => {
        console.error("Error fetching images:", error);
        return {
          images: [],
          pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
        };
      }),
      VideoService.getEventVideos(eventId, 1, 50).catch((error) => {
        console.error("Error fetching videos:", error);
        return {
          videos: [],
          pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
        };
      }),
    ]);

    console.log("Images result:", imagesResult);
    console.log("Videos result:", videosResult);

    // Transform the response to include proper URLs
    const transformedImages = imagesResult.images.map((image) => ({
      id: image.id,
      title: image.title,
      type: "image" as const,
      driveUrl: image.driveUrl,
      thumbnailUrl: image.thumbnailUrl,
      imageUrl: image.driveUrl, // For backward compatibility
      createdAt: image.createdAt,
    }));

    const transformedVideos = videosResult.videos.map((video) => ({
      id: video.id,
      title: video.title,
      description: video.description,
      type: "video" as const,
      driveUrl: video.driveUrl,
      thumbnailUrl: video.thumbnailUrl,
      createdAt: video.createdAt,
    }));

    const allMedia = [...transformedImages, ...transformedVideos].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return createSuccessResponse({
      media: allMedia,
      counts: {
        images: transformedImages.length,
        videos: transformedVideos.length,
        total: allMedia.length,
      },
    });
  } catch (error) {
    return handleRouteError(error);
  }
}
