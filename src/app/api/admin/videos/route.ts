import { NextRequest } from "next/server";
import { VideoService } from "@/lib/services/video.service";
import {
  CreateVideoSchema,
  VideoQuerySchema,
} from "@/lib/validations/video.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  handleRouteError,
  createUnauthorizedResponse,
} from "@/lib/utils/response";
import { requireAdmin } from "@/lib/utils/auth";

/**
 * GET /api/admin/videos - Get all videos with admin details
 */
export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const validatedQuery = VideoQuerySchema.parse(queryParams);

    // Get videos using service
    const result = await VideoService.getVideos(validatedQuery);

    return createSuccessResponse(result.videos, 200, result.pagination);
  } catch (error) {
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
 * POST /api/admin/videos - Upload new video
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const formData = await request.formData();

    // Extract form fields
    const title = formData.get("title") as string;
    const description = formData.get("description") as string | null;
    const eventId = formData.get("eventId") as string | null;
    const category = formData.get("category") as string;
    const file = formData.get("file") as File;

    if (!file) {
      return createValidationErrorResponse("File is required");
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Prepare data for validation
    const videoData = {
      title,
      description: description || undefined,
      eventId: eventId || undefined,
      category: category || "EVENT",
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
        buffer,
      },
    };

    // Validate request data
    const validatedData = CreateVideoSchema.parse(videoData);

    // Create video using service
    const video = await VideoService.createVideo(validatedData);

    return createSuccessResponse(video, 201);
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
