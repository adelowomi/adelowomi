import { prisma } from "@/lib/utils/db";
import { Video, VideoCategory } from "@/types/event.types";
import {
  CreateVideoInput,
  UpdateVideoInput,
  VideoQueryInput,
  generateSafeVideoFilename,
} from "@/lib/validations/video.validation";
import { googleDriveService } from "./drive.service";

export interface VideoWithEvent extends Video {
  event?: {
    id: string;
    title: string;
    date: Date;
  };
}

export interface VideoListResponse {
  videos: VideoWithEvent[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class VideoService {
  /**
   * Upload and create a new video
   */
  static async createVideo(data: CreateVideoInput): Promise<Video> {
    try {
      const { eventId, title, description, category, file } = data;

      // Generate safe filename
      const safeFileName = generateSafeVideoFilename(file.name, eventId);

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
        folderId = folders.videoFolder.id;
      } else {
        // Use general content folder
        const folders = await googleDriveService.getOrCreateGeneralFolders();
        folderId = folders.videoFolder.id;
      }

      // Upload file to Google Drive
      const driveFile = await googleDriveService.uploadFile(file.buffer, {
        fileName: safeFileName,
        mimeType: file.type,
        folderId,
        description: description || `Video: ${title}`,
      });

      // Generate thumbnail (Google Drive may auto-generate for videos)
      const thumbnailUrl = await googleDriveService.generateThumbnail(
        driveFile.id,
        400
      );

      // Generate shareable link
      const driveUrl = await googleDriveService.generateShareableLink(
        driveFile.id
      );

      // Save to database
      const video = await prisma.video.create({
        data: {
          eventId: eventId || null,
          title,
          description: description || null,
          driveFileId: driveFile.id,
          driveUrl,
          thumbnailUrl,
          category: category || VideoCategory.EVENT,
        },
      });

      return video;
    } catch (error) {
      console.error("Error creating video:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to create video");
    }
  }

  /**
   * Get video by ID
   */
  static async getVideoById(id: string): Promise<VideoWithEvent | null> {
    try {
      const video = await prisma.video.findUnique({
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

      return video;
    } catch (error) {
      console.error("Error fetching video:", error);
      throw new Error("Failed to fetch video");
    }
  }

  /**
   * Get videos with pagination and filtering
   */
  static async getVideos(query: VideoQueryInput): Promise<VideoListResponse> {
    try {
      const { page, limit, category, eventId, search, sortBy, sortOrder } =
        query;
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      if (category) {
        where.category = category;
      }

      if (eventId) {
        where.eventId = eventId;
      }

      if (search) {
        where.OR = [
          { title: { contains: search } },
          { description: { contains: search } },
          { event: { title: { contains: search } } },
        ];
      }

      // Build order by clause
      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      const [videos, total] = await Promise.all([
        prisma.video.findMany({
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
        prisma.video.count({ where }),
      ]);

      return {
        videos,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching videos:", error);
      throw new Error("Failed to fetch videos");
    }
  } /**
 
  * Get videos by category
   */
  static async getVideosByCategory(
    category: VideoCategory,
    page: number = 1,
    limit: number = 10
  ): Promise<VideoListResponse> {
    return this.getVideos({
      page,
      limit,
      category,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }

  /**
   * Get videos for a specific event
   */
  static async getEventVideos(
    eventId: string,
    page: number = 1,
    limit: number = 10
  ): Promise<VideoListResponse> {
    return this.getVideos({
      page,
      limit,
      eventId,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }

  /**
   * Get all videos (for public display)
   */
  static async getAllVideos(
    page: number = 1,
    limit: number = 10
  ): Promise<VideoListResponse> {
    return this.getVideos({
      page,
      limit,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }

  /**
   * Update video metadata
   */
  static async updateVideo(id: string, data: UpdateVideoInput): Promise<Video> {
    try {
      const existingVideo = await prisma.video.findUnique({
        where: { id },
      });

      if (!existingVideo) {
        throw new Error("Video not found");
      }

      // If eventId is being changed, we might need to move the file
      if (
        data.eventId !== undefined &&
        data.eventId !== existingVideo.eventId
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
            existingVideo.driveFileId,
            folders.videoFolder.id
          );
        } else {
          // Moving to general folder
          const folders = await googleDriveService.getOrCreateGeneralFolders();

          // Move file to general folder
          await googleDriveService.moveFile(
            existingVideo.driveFileId,
            folders.videoFolder.id
          );
        }
      }

      const updateData: any = {};

      if (data.title !== undefined) updateData.title = data.title;
      if (data.description !== undefined)
        updateData.description = data.description || null;
      if (data.eventId !== undefined) updateData.eventId = data.eventId;
      if (data.category !== undefined) updateData.category = data.category;

      const updatedVideo = await prisma.video.update({
        where: { id },
        data: updateData,
      });

      return updatedVideo;
    } catch (error) {
      console.error("Error updating video:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update video");
    }
  }

  /**
   * Delete video
   */
  static async deleteVideo(id: string): Promise<void> {
    try {
      const video = await prisma.video.findUnique({
        where: { id },
      });

      if (!video) {
        throw new Error("Video not found");
      }

      // Delete from Google Drive
      await googleDriveService.deleteFile(video.driveFileId);

      // Delete from database
      await prisma.video.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting video:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to delete video");
    }
  }

  /**
   * Associate video with an event
   */
  static async associateVideoWithEvent(
    videoId: string,
    eventId: string
  ): Promise<Video> {
    try {
      // Verify event exists
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: { title: true },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      // Get the video
      const video = await prisma.video.findUnique({
        where: { id: videoId },
      });

      if (!video) {
        throw new Error("Video not found");
      }

      // Move file to event folder if it's not already there
      if (!video.eventId) {
        const folders = await googleDriveService.getOrCreateEventFolders(
          event.title
        );

        await googleDriveService.moveFile(
          video.driveFileId,
          folders.videoFolder.id
        );
      }

      // Update database
      const updatedVideo = await prisma.video.update({
        where: { id: videoId },
        data: { eventId },
      });

      return updatedVideo;
    } catch (error) {
      console.error("Error associating video with event:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to associate video with event");
    }
  }

  /**
   * Remove video association with event (move to general)
   */
  static async removeVideoFromEvent(videoId: string): Promise<Video> {
    try {
      const video = await prisma.video.findUnique({
        where: { id: videoId },
      });

      if (!video) {
        throw new Error("Video not found");
      }

      // Move file to general folder
      const folders = await googleDriveService.getOrCreateGeneralFolders();

      await googleDriveService.moveFile(
        video.driveFileId,
        folders.videoFolder.id
      );

      // Update database
      const updatedVideo = await prisma.video.update({
        where: { id: videoId },
        data: { eventId: null },
      });

      return updatedVideo;
    } catch (error) {
      console.error("Error removing video from event:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to remove video from event");
    }
  }

  /**
   * Categorize video
   */
  static async categorizeVideo(
    videoId: string,
    category: VideoCategory
  ): Promise<Video> {
    try {
      const video = await prisma.video.findUnique({
        where: { id: videoId },
      });

      if (!video) {
        throw new Error("Video not found");
      }

      const updatedVideo = await prisma.video.update({
        where: { id: videoId },
        data: { category },
      });

      return updatedVideo;
    } catch (error) {
      console.error("Error categorizing video:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to categorize video");
    }
  }

  /**
   * Get video statistics
   */
  static async getVideoStats(): Promise<{
    totalVideos: number;
    eventVideos: number;
    contentVideos: number;
    promotionalVideos: number;
    generalVideos: number;
    recentVideos: VideoWithEvent[];
  }> {
    try {
      const [
        totalVideos,
        eventVideos,
        contentVideos,
        promotionalVideos,
        generalVideos,
        recentVideos,
      ] = await Promise.all([
        prisma.video.count(),
        prisma.video.count({ where: { category: VideoCategory.EVENT } }),
        prisma.video.count({ where: { category: VideoCategory.CONTENT } }),
        prisma.video.count({ where: { category: VideoCategory.PROMOTIONAL } }),
        prisma.video.count({ where: { eventId: null } }),
        prisma.video.findMany({
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
        totalVideos,
        eventVideos,
        contentVideos,
        promotionalVideos,
        generalVideos,
        recentVideos,
      };
    } catch (error) {
      console.error("Error fetching video statistics:", error);
      throw new Error("Failed to fetch video statistics");
    }
  }

  /**
   * Bulk upload videos
   */
  static async bulkUploadVideos(videos: CreateVideoInput[]): Promise<Video[]> {
    try {
      const uploadedVideos: Video[] = [];

      for (const videoData of videos) {
        try {
          const uploadedVideo = await this.createVideo(videoData);
          uploadedVideos.push(uploadedVideo);
        } catch (error) {
          console.error(`Error uploading video ${videoData.title}:`, error);
          // Continue with other videos even if one fails
        }
      }

      return uploadedVideos;
    } catch (error) {
      console.error("Error in bulk upload:", error);
      throw new Error("Failed to complete bulk upload");
    }
  }

  /**
   * Get videos by event with filtering
   */
  static async getVideosByEvent(
    eventId: string,
    options: {
      page?: number;
      limit?: number;
      search?: string;
      category?: VideoCategory;
    } = {}
  ): Promise<VideoListResponse> {
    const { page = 1, limit = 10, search, category } = options;

    return this.getVideos({
      page: page.toString(),
      limit: limit.toString(),
      eventId,
      search,
      category,
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  }

  /**
   * Refresh video URLs (in case Drive links expire)
   */
  static async refreshVideoUrls(videoId: string): Promise<Video> {
    try {
      const video = await prisma.video.findUnique({
        where: { id: videoId },
      });

      if (!video) {
        throw new Error("Video not found");
      }

      // Generate new shareable link
      const newDriveUrl = await googleDriveService.generateShareableLink(
        video.driveFileId
      );

      // Generate new thumbnail
      const newThumbnailUrl = await googleDriveService.generateThumbnail(
        video.driveFileId,
        400
      );

      // Update database
      const updatedVideo = await prisma.video.update({
        where: { id: videoId },
        data: {
          driveUrl: newDriveUrl,
          thumbnailUrl: newThumbnailUrl,
        },
      });

      return updatedVideo;
    } catch (error) {
      console.error("Error refreshing video URLs:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to refresh video URLs");
    }
  }
}
