import { NextRequest } from "next/server";
import { GalleryService } from "@/lib/services/gallery.service";
import {
  CreateGalleryImageSchema,
  GalleryQuerySchema,
} from "@/lib/validations/gallery.validation";
import {
  createSuccessResponse,
  createValidationErrorResponse,
  handleRouteError,
  createUnauthorizedResponse,
} from "@/lib/utils/response";
import { requireAdmin } from "@/lib/utils/auth";

/**
 * GET /api/admin/gallery - Get all gallery images with admin details
 */
export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());

    // Validate query parameters
    const validatedQuery = GalleryQuerySchema.parse(queryParams);

    // Get gallery images using service
    const result = await GalleryService.getGalleryImages(validatedQuery);

    return createSuccessResponse(result.images, 200, result.pagination);
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
 * POST /api/admin/gallery - Upload new gallery image
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    const formData = await request.formData();

    // Extract form fields
    const title = formData.get("title") as string;
    const eventId = formData.get("eventId") as string | null;
    const description = formData.get("description") as string | null;
    const file = formData.get("file") as File;

    if (!file) {
      return createValidationErrorResponse("File is required");
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Prepare data for validation
    const imageData = {
      title,
      eventId: eventId || undefined,
      description: description || undefined,
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
        buffer,
      },
    };

    // Validate request data
    const validatedData = CreateGalleryImageSchema.parse(imageData);

    // Create gallery image using service
    const galleryImage = await GalleryService.createGalleryImage(validatedData);

    return createSuccessResponse(galleryImage, 201);
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
