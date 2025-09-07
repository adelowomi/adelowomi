import { NextRequest } from "next/server";
import { VideoService } from "@/lib/services/video.service";
import {
  VideoIdSchema,
  UpdateVideoSchema,
} from "@/lib/validations/video.validation";
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
    id: string;
  };
}

/**
 * GET /api/admin/videos/[id] - Get specific video
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate video ID
    const { id: videoId } = VideoIdSchema.parse({ id: params.id });

    // Get video using service
    const video = await VideoService.getVideoById(videoId);

    if (!video) {
      return createNotFoundResponse("Video");
    }

    return createSuccessResponse(video);
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

/**
 * PUT /api/admin/videos/[id] - Update specific video
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate video ID
    const { id: videoId } = VideoIdSchema.parse({ id: params.id });

    const body = await request.json();

    // Validate request body
    const validatedData = UpdateVideoSchema.parse(body);

    // Update video using service
    const video = await VideoService.updateVideo(videoId, validatedData);

    return createSuccessResponse(video);
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

/**
 * DELETE /api/admin/videos/[id] - Delete specific video
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate video ID
    const { id: videoId } = VideoIdSchema.parse({ id: params.id });

    // Delete video using service
    await VideoService.deleteVideo(videoId);

    return createSuccessResponse({ message: "Video deleted successfully" });
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
