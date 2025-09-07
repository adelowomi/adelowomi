import { prisma } from "@/lib/utils/db";
import { GalleryImage } from "@/types/event.types";
import {
  CreateGalleryImageInput,
  UpdateGalleryImageInput,
  GalleryQueryInput,
  generateSafeFilename,
} from "@/lib/validations/gallery.validation";
import { googleDriveService } from "./drive.service";

export interface GalleryImageWithEvent extends GalleryImage {
  event?: {
    id: string;
    title: string;
    date: Date;
  };
}

export interface GalleryListResponse {
  images: GalleryImageWithEvent[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class GalleryService {
  /**
   * Upload and create a new gallery image
   */
  static async createGalleryImage(
    data: CreateGalleryImageInput
  ): Promise<GalleryImage> {
    try {
      const { eventId, title, file, description } = data;

      // Generate safe filename
      const safeFileName = generateSafeFilename(file.name, eventId);

      // Determine the appropriate folder for upload
      let folderId: string;

      if (eventId) {
        // Get event details for folder creation
        const event = await prisma.event.findUnique({
          where: { id: eventId },
          select: { title: true },
        });

        if (!event) {
          throw new Error("Event not found");
        }

        // Get or create event-specific folders
        const folders = await googleDriveService.getOrCreateEventFolders(
          event.title
        );
        folderId = folders.imageFolder.id;
      } else {
        // Use general content folder
        const folders = await googleDriveService.getOrCreateGeneralFolders();
        folderId = folders.imageFolder.id;
      }

      // Upload file to Google Drive
      const driveFile = await googleDriveService.uploadFile(file.buffer, {
        fileName: safeFileName,
        mimeType: file.type,
        folderId,
        description: description || `Gallery image: ${title}`,
      });

      // Generate thumbnail
      const thumbnailUrl = await googleDriveService.generateThumbnail(
        driveFile.id,
        400
      );

      // Generate shareable link
      const driveUrl = await googleDriveService.generateShareableLink(
        driveFile.id
      );

      // Save to database
      const galleryImage = await prisma.gallery.create({
        data: {
          eventId: eventId || null,
          title,
          driveFileId: driveFile.id,
          driveUrl,
          thumbnailUrl,
        },
      });

      return galleryImage;
    } catch (error) {
      console.error("Error creating gallery image:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to create gallery image");
    }
  }

  /**
   * Get gallery image by ID
   */
  static async getGalleryImageById(
    id: string
  ): Promise<GalleryImageWithEvent | null> {
    try {
      const image = await prisma.gallery.findUnique({
        where: { id },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              date: true,
            },
          },
        },
      });

      return image;
    } catch (error) {
      console.error("Error fetching gallery image:", error);
      throw new Error("Failed to fetch gallery image");
    }
  }

  /**
   * Get gallery images with pagination and filtering
   */
  static async getGalleryImages(
    query: GalleryQueryInput
  ): Promise<GalleryListResponse> {
    try {
      const { page, limit, eventId, search, sortBy, sortOrder } = query;
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      if (eventId) {
        where.eventId = eventId;
      }

      if (search) {
        where.OR = [
          { title: { contains: search } },
          { event: { title: { contains: search } } },
        ];
      }

      // Build order by clause
      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      const [images, total] = await Promise.all([
        prisma.gallery.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          include: {
            event: {
              select: {
                id: true,
                title: true,
                date: true,
              },
            },
          },
        }),
        prisma.gallery.count({ where }),
      ]);

      return {
        images,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching gallery images:", error);
      throw new Error("Failed to fetch gallery images");
    }
  } /**
  
 * Get images for a specific event
   */
  static async getEventImages(
    eventId: string,
    page: number = 1,
    limit: number = 12
  ): Promise<GalleryListResponse> {
    return this.getGalleryImages({
      page,
      limit,
      eventId,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }

  /**
   * Get all images (for public gallery)
   */
  static async getAllImages(
    page: number = 1,
    limit: number = 12
  ): Promise<GalleryListResponse> {
    return this.getGalleryImages({
      page,
      limit,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }

  /**
   * Update gallery image metadata
   */
  static async updateGalleryImage(
    id: string,
    data: UpdateGalleryImageInput
  ): Promise<GalleryImage> {
    try {
      const existingImage = await prisma.gallery.findUnique({
        where: { id },
      });

      if (!existingImage) {
        throw new Error("Gallery image not found");
      }

      // If eventId is being changed, we might need to move the file
      if (
        data.eventId !== undefined &&
        data.eventId !== existingImage.eventId
      ) {
        // Handle file movement if needed
        if (data.eventId) {
          // Moving to an event folder
          const event = await prisma.event.findUnique({
            where: { id: data.eventId },
            select: { title: true },
          });

          if (!event) {
            throw new Error("Event not found");
          }

          const folders = await googleDriveService.getOrCreateEventFolders(
            event.title
          );

          // Move file to event folder
          await googleDriveService.moveFile(
            existingImage.driveFileId,
            folders.imageFolder.id
          );
        } else {
          // Moving to general folder
          const folders = await googleDriveService.getOrCreateGeneralFolders();

          // Move file to general folder
          await googleDriveService.moveFile(
            existingImage.driveFileId,
            folders.imageFolder.id
          );
        }
      }

      const updateData: any = {};

      if (data.title !== undefined) updateData.title = data.title;
      if (data.eventId !== undefined) updateData.eventId = data.eventId;

      const updatedImage = await prisma.gallery.update({
        where: { id },
        data: updateData,
      });

      return updatedImage;
    } catch (error) {
      console.error("Error updating gallery image:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update gallery image");
    }
  }

  /**
   * Delete gallery image
   */
  static async deleteGalleryImage(id: string): Promise<void> {
    try {
      const image = await prisma.gallery.findUnique({
        where: { id },
      });

      if (!image) {
        throw new Error("Gallery image not found");
      }

      // Delete from Google Drive
      await googleDriveService.deleteFile(image.driveFileId);

      // Delete from database
      await prisma.gallery.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting gallery image:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to delete gallery image");
    }
  }

  /**
   * Associate image with an event
   */
  static async associateImageWithEvent(
    imageId: string,
    eventId: string
  ): Promise<GalleryImage> {
    try {
      // Verify event exists
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: { title: true },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      // Get the image
      const image = await prisma.gallery.findUnique({
        where: { id: imageId },
      });

      if (!image) {
        throw new Error("Gallery image not found");
      }

      // Move file to event folder if it's not already there
      if (!image.eventId) {
        const folders = await googleDriveService.getOrCreateEventFolders(
          event.title
        );

        await googleDriveService.moveFile(
          image.driveFileId,
          folders.imageFolder.id
        );
      }

      // Update database
      const updatedImage = await prisma.gallery.update({
        where: { id: imageId },
        data: { eventId },
      });

      return updatedImage;
    } catch (error) {
      console.error("Error associating image with event:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to associate image with event");
    }
  }

  /**
   * Remove image association with event (move to general)
   */
  static async removeImageFromEvent(imageId: string): Promise<GalleryImage> {
    try {
      const image = await prisma.gallery.findUnique({
        where: { id: imageId },
      });

      if (!image) {
        throw new Error("Gallery image not found");
      }

      // Move file to general folder
      const folders = await googleDriveService.getOrCreateGeneralFolders();

      await googleDriveService.moveFile(
        image.driveFileId,
        folders.imageFolder.id
      );

      // Update database
      const updatedImage = await prisma.gallery.update({
        where: { id: imageId },
        data: { eventId: null },
      });

      return updatedImage;
    } catch (error) {
      console.error("Error removing image from event:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to remove image from event");
    }
  }

  /**
   * Get gallery statistics
   */
  static async getGalleryStats(): Promise<{
    totalImages: number;
    eventImages: number;
    generalImages: number;
    recentImages: GalleryImageWithEvent[];
  }> {
    try {
      const [totalImages, eventImages, generalImages, recentImages] =
        await Promise.all([
          prisma.gallery.count(),
          prisma.gallery.count({ where: { eventId: { not: null } } }),
          prisma.gallery.count({ where: { eventId: null } }),
          prisma.gallery.findMany({
            orderBy: { createdAt: "desc" },
            take: 10,
            include: {
              event: {
                select: {
                  id: true,
                  title: true,
                  date: true,
                },
              },
            },
          }),
        ]);

      return {
        totalImages,
        eventImages,
        generalImages,
        recentImages,
      };
    } catch (error) {
      console.error("Error fetching gallery statistics:", error);
      throw new Error("Failed to fetch gallery statistics");
    }
  }

  /**
   * Bulk upload images
   */
  static async bulkUploadImages(
    images: CreateGalleryImageInput[]
  ): Promise<GalleryImage[]> {
    try {
      const uploadedImages: GalleryImage[] = [];

      for (const imageData of images) {
        try {
          const uploadedImage = await this.createGalleryImage(imageData);
          uploadedImages.push(uploadedImage);
        } catch (error) {
          console.error(`Error uploading image ${imageData.title}:`, error);
          // Continue with other images even if one fails
        }
      }

      return uploadedImages;
    } catch (error) {
      console.error("Error in bulk upload:", error);
      throw new Error("Failed to complete bulk upload");
    }
  }

  /**
   * Get images by event with filtering
   */
  static async getImagesByEvent(
    eventId: string,
    options: {
      page?: number;
      limit?: number;
      search?: string;
    } = {}
  ): Promise<GalleryListResponse> {
    const { page = 1, limit = 12, search } = options;

    return this.getGalleryImages({
      page: page.toString(),
      limit: limit.toString(),
      eventId,
      search,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }

  /**
   * Refresh image URLs (in case Drive links expire)
   */
  static async refreshImageUrls(imageId: string): Promise<GalleryImage> {
    try {
      const image = await prisma.gallery.findUnique({
        where: { id: imageId },
      });

      if (!image) {
        throw new Error("Gallery image not found");
      }

      // Generate new shareable link
      const newDriveUrl = await googleDriveService.generateShareableLink(
        image.driveFileId
      );

      // Generate new thumbnail
      const newThumbnailUrl = await googleDriveService.generateThumbnail(
        image.driveFileId,
        400
      );

      // Update database
      const updatedImage = await prisma.gallery.update({
        where: { id: imageId },
        data: {
          driveUrl: newDriveUrl,
          thumbnailUrl: newThumbnailUrl,
        },
      });

      return updatedImage;
    } catch (error) {
      console.error("Error refreshing image URLs:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to refresh image URLs");
    }
  }
}
