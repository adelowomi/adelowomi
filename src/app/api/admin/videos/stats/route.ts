import { NextRequest } from "next/server";
import { VideoService } from "@/lib/services/video.service";
import {
  createSuccessResponse,
  handleRouteError,
  createUnauthorizedResponse,
} from "@/lib/utils/response";
import { requireAdmin } from "@/lib/utils/auth";

/**
 * GET /api/admin/videos/stats - Get video statistics
 */
export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Get video statistics using service
    const stats = await VideoService.getVideoStats();

    return createSuccessResponse(stats);
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
