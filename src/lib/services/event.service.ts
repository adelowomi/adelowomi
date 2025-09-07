import { prisma } from "@/lib/utils/db";
import { Event, EventStatus } from "@/types/event.types";
import { EventStatus as PrismaEventStatus } from "@prisma/client";
import {
  CreateEventInput,
  CreateEventWithFileInput,
  UpdateEventInput,
  EventQueryInput,
} from "@/lib/validations/event.validation";
import { googleDriveService } from "@/lib/services/drive.service";
import { generateSafeFilename } from "@/lib/utils/file-helpers";

export interface EventWithStats extends Event {
  registrationCount: number;
  availableSpots: number;
}

export interface EventListResponse {
  events: EventWithStats[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export class EventService {
  /**
   * Create a new event (legacy method for JSON API)
   */
  static async createEvent(data: CreateEventInput): Promise<Event> {
    try {
      const event = await prisma.event.create({
        data: {
          title: data.title,
          description: data.description,
          date: new Date(data.date),
          time: data.time,
          venue: data.venue,
          capacity: data.capacity,
          flyerUrl: data.flyerUrl || null,
          status: (data.status || EventStatus.ACTIVE) as PrismaEventStatus,
        },
      });

      return {
        ...event,
        status: event.status as EventStatus,
      } as Event;
    } catch (error) {
      console.error("Error creating event:", error);
      throw new Error("Failed to create event");
    }
  }

  /**
   * Create a new event with file upload support
   */
  static async createEventWithFile(
    data: CreateEventWithFileInput
  ): Promise<Event> {
    try {
      let flyerUrl: string | null = null;
      let flyerFileId: string | null = null;
      let flyerFileName: string | null = null;

      // Handle flyer file upload if provided and Google Drive is configured
      if (data.flyerFile) {
        try {
          // Check if Google Drive is properly configured
          const refreshToken =
            process.env.NEXT_PUBLIC_GOOGLE_DRIVE_REFRESH_TOKEN;
          const folderId = process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID;

          if (
            !refreshToken ||
            refreshToken === "your_google_drive_refresh_token" ||
            !folderId ||
            folderId === "your_google_drive_root_folder_id"
          ) {
            console.warn(
              "Google Drive not configured properly. Skipping file upload."
            );
            console.warn("Event will be created without flyer image.");
          } else {
            const { flyerFile } = data;
            const safeFileName = generateSafeFilename(
              flyerFile.name,
              `event-${Date.now()}`
            );

            // Get or create events folder in Google Drive
            const eventsFolderId = await googleDriveService.getOrCreateFolder(
              "Events"
            );

            // Upload file to Google Drive
            const driveFile = await googleDriveService.uploadFile(
              flyerFile.buffer,
              {
                fileName: safeFileName,
                mimeType: flyerFile.type,
                folderId: eventsFolderId,
              }
            );

            // Use direct image URL instead of webViewLink
            flyerUrl = `https://drive.google.com/uc?export=view&id=${driveFile.id}`;
            flyerFileId = driveFile.id;
            flyerFileName = flyerFile.name;
          }
        } catch (uploadError) {
          console.error("Error uploading file to Google Drive:", uploadError);
          console.warn("Continuing with event creation without file upload.");
          // Don't throw error, just continue without file upload
        }
      }

      const event = await prisma.event.create({
        data: {
          title: data.title,
          description: data.description,
          date: new Date(data.date),
          time: data.time,
          venue: data.venue,
          capacity: data.capacity,
          flyerUrl,
          flyerFileId,
          flyerFileName,
          status: (data.status || EventStatus.ACTIVE) as PrismaEventStatus,
        },
      });

      return {
        ...event,
        status: event.status as EventStatus,
      } as Event;
    } catch (error) {
      console.error("Error creating event with file:", error);
      throw new Error("Failed to create event");
    }
  }

  /**
   * Get event by ID with registration count
   */
  static async getEventById(id: string): Promise<EventWithStats | null> {
    try {
      const event = await prisma.event.findUnique({
        where: { id },
        include: {
          _count: {
            select: { registrations: true },
          },
        },
      });

      if (!event) {
        return null;
      }

      return {
        ...event,
        status: event.status as EventStatus,
        registrationCount: event._count.registrations,
        availableSpots: event.capacity - event._count.registrations,
      };
    } catch (error) {
      console.error("Error fetching event:", error);
      throw new Error("Failed to fetch event");
    }
  }

  /**
   * Get all events with pagination and filtering
   */
  static async getEvents(query: EventQueryInput): Promise<EventListResponse> {
    try {
      const { page, limit, status, search, sortBy, sortOrder } = query;
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      if (status) {
        where.status = status as PrismaEventStatus;
      }

      if (search) {
        where.OR = [
          { title: { contains: search } },
          { description: { contains: search } },
          { venue: { contains: search } },
        ];
      }

      // Build order by clause
      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      const [events, total] = await Promise.all([
        prisma.event.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          include: {
            _count: {
              select: { registrations: true },
            },
          },
        }),
        prisma.event.count({ where }),
      ]);

      const eventsWithStats: EventWithStats[] = events.map((event) => ({
        ...event,
        status: event.status as EventStatus,
        registrationCount: event._count.registrations,
        availableSpots: event.capacity - event._count.registrations,
      }));

      return {
        events: eventsWithStats,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Failed to fetch events");
    }
  } /**

   * Get active events only (for public display)
   */
  static async getActiveEvents(
    page: number = 1,
    limit: number = 10
  ): Promise<EventListResponse> {
    return this.getEvents({
      page,
      limit,
      status: EventStatus.ACTIVE,
      sortBy: "date",
      sortOrder: "asc",
    });
  }

  /**
   * Update an existing event
   */
  static async updateEvent(id: string, data: UpdateEventInput): Promise<Event> {
    try {
      // Check if event exists
      const existingEvent = await prisma.event.findUnique({
        where: { id },
        include: {
          _count: {
            select: { registrations: true },
          },
        },
      });

      if (!existingEvent) {
        throw new Error("Event not found");
      }

      // If capacity is being reduced, check if it's still valid
      if (data.capacity && data.capacity < existingEvent._count.registrations) {
        throw new Error(
          `Cannot reduce capacity below current registration count (${existingEvent._count.registrations})`
        );
      }

      const updateData: any = {};

      if (data.title !== undefined) updateData.title = data.title;
      if (data.description !== undefined)
        updateData.description = data.description;
      if (data.date !== undefined) updateData.date = new Date(data.date);
      if (data.time !== undefined) updateData.time = data.time;
      if (data.venue !== undefined) updateData.venue = data.venue;
      if (data.capacity !== undefined) updateData.capacity = data.capacity;
      if (data.flyerUrl !== undefined)
        updateData.flyerUrl = data.flyerUrl || null;
      if (data.status !== undefined) updateData.status = data.status;

      const updatedEvent = await prisma.event.update({
        where: { id },
        data: updateData,
      });

      return {
        ...updatedEvent,
        status: updatedEvent.status as EventStatus,
      } as Event;
    } catch (error) {
      console.error("Error updating event:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update event");
    }
  }

  /**
   * Delete an event (also deletes associated registrations due to cascade)
   */
  static async deleteEvent(id: string): Promise<void> {
    try {
      const event = await prisma.event.findUnique({
        where: { id },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      await prisma.event.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to delete event");
    }
  }

  /**
   * Check if event has available capacity
   */
  static async checkEventCapacity(eventId: string): Promise<{
    hasCapacity: boolean;
    availableSpots: number;
    totalCapacity: number;
    currentRegistrations: number;
  }> {
    try {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        include: {
          _count: {
            select: { registrations: true },
          },
        },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      const currentRegistrations = event._count.registrations;
      const availableSpots = event.capacity - currentRegistrations;
      const hasCapacity = availableSpots > 0;

      return {
        hasCapacity,
        availableSpots,
        totalCapacity: event.capacity,
        currentRegistrations,
      };
    } catch (error) {
      console.error("Error checking event capacity:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to check event capacity");
    }
  }

  /**
   * Update event status
   */
  static async updateEventStatus(
    id: string,
    status: EventStatus
  ): Promise<Event> {
    try {
      const event = await prisma.event.findUnique({
        where: { id },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      const updatedEvent = await prisma.event.update({
        where: { id },
        data: { status: status as PrismaEventStatus },
      });

      return {
        ...updatedEvent,
        status: updatedEvent.status as EventStatus,
      } as Event;
    } catch (error) {
      console.error("Error updating event status:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update event status");
    }
  }

  /**
   * Get upcoming events (active events with future dates)
   */
  static async getUpcomingEvents(limit: number = 5): Promise<EventWithStats[]> {
    try {
      const events = await prisma.event.findMany({
        where: {
          status: EventStatus.ACTIVE as PrismaEventStatus,
          date: {
            gte: new Date(),
          },
        },
        orderBy: {
          date: "asc",
        },
        take: limit,
        include: {
          _count: {
            select: { registrations: true },
          },
        },
      });

      return events.map((event) => ({
        ...event,
        status: event.status as EventStatus,
        registrationCount: event._count.registrations,
        availableSpots: event.capacity - event._count.registrations,
      }));
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw new Error("Failed to fetch upcoming events");
    }
  }

  /**
   * Get event statistics
   */
  static async getEventStats(): Promise<{
    totalEvents: number;
    activeEvents: number;
    completedEvents: number;
    totalRegistrations: number;
  }> {
    try {
      const [totalEvents, activeEvents, completedEvents, totalRegistrations] =
        await Promise.all([
          prisma.event.count(),
          prisma.event.count({ where: { status: EventStatus.ACTIVE } }),
          prisma.event.count({ where: { status: EventStatus.COMPLETED } }),
          prisma.registration.count(),
        ]);

      return {
        totalEvents,
        activeEvents,
        completedEvents,
        totalRegistrations,
      };
    } catch (error) {
      console.error("Error fetching event statistics:", error);
      throw new Error("Failed to fetch event statistics");
    }
  }

  /**
   * Check if user is already registered for an event
   */
  static async isUserRegistered(
    eventId: string,
    email: string
  ): Promise<boolean> {
    try {
      const registration = await prisma.registration.findUnique({
        where: {
          eventId_email: {
            eventId,
            email,
          },
        },
      });

      return !!registration;
    } catch (error) {
      console.error("Error checking user registration:", error);
      throw new Error("Failed to check user registration");
    }
  }
}
