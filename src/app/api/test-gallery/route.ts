import { NextRequest } from "next/server";
import { prisma } from "@/lib/utils/db";

/**
 * GET /api/test-gallery
 * Test endpoint to check gallery data
 */
export async function GET(request: NextRequest) {
  try {
    console.log("Testing gallery data...");

    // Test basic gallery count
    const totalGallery = await prisma.gallery.count();
    console.log("Total gallery items:", totalGallery);

    // Test basic video count
    const totalVideos = await prisma.video.count();
    console.log("Total videos:", totalVideos);

    // Get a few gallery items
    const sampleGallery = await prisma.gallery.findMany({
      take: 5,
      include: {
        event: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    console.log("Sample gallery items:", sampleGallery);

    // Get a few videos
    const sampleVideos = await prisma.video.findMany({
      take: 5,
      include: {
        event: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });
    console.log("Sample videos:", sampleVideos);

    return Response.json({
      success: true,
      data: {
        counts: {
          gallery: totalGallery,
          videos: totalVideos,
        },
        samples: {
          gallery: sampleGallery,
          videos: sampleVideos,
        },
      },
    });
  } catch (error) {
    console.error("Test gallery error:", error);
    return Response.json(
      {
        success: false,
        error: {
          message: error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
        },
      },
      { status: 500 }
    );
  }
}
