import { NextRequest } from "next/server";
import { GalleryService } from "@/lib/services/gallery.service";
import {
  GalleryIdSchema,
  UpdateGalleryImageSchema,
} from "@/lib/validations/gallery.validation";
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
 * GET /api/admin/gallery/[id] - Get specific gallery image
 */
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate gallery ID
    const { id: galleryId } = GalleryIdSchema.parse({ id: params.id });

    // Get gallery image using service
    const galleryImage = await GalleryService.getGalleryImageById(galleryId);

    if (!galleryImage) {
      return createNotFoundResponse("Gallery image");
    }

    return createSuccessResponse(galleryImage);
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
 * PUT /api/admin/gallery/[id] - Update specific gallery image
 */
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate gallery ID
    const { id: galleryId } = GalleryIdSchema.parse({ id: params.id });

    const body = await request.json();

    // Validate request body
    const validatedData = UpdateGalleryImageSchema.parse(body);

    // Update gallery image using service
    const galleryImage = await GalleryService.updateGalleryImage(
      galleryId,
      validatedData
    );

    return createSuccessResponse(galleryImage);
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
 * DELETE /api/admin/gallery/[id] - Delete specific gallery image
 */
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Validate gallery ID
    const { id: galleryId } = GalleryIdSchema.parse({ id: params.id });

    // Delete gallery image using service
    await GalleryService.deleteGalleryImage(galleryId);

    return createSuccessResponse({
      message: "Gallery image deleted successfully",
    });
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
