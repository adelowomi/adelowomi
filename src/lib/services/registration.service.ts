import { prisma } from "@/lib/utils/db";
import { Registration, StudentStatus } from "@/types/event.types";
import {
  CreateRegistrationInput,
  RegistrationQueryInput,
  RegistrationExportInput,
  formatPhoneNumber,
} from "@/lib/validations/registration.validation";
import { EventService } from "./event.service";

export interface RegistrationWithEvent extends Registration {
  event: {
    id: string;
    title: string;
    date: Date;
    time: string;
    venue: string;
  };
}

export interface RegistrationListResponse {
  registrations: RegistrationWithEvent[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface RegistrationExportData {
  eventTitle: string;
  eventDate: string;
  registrations: Registration[];
  totalCount: number;
  exportedAt: Date;
}

export class RegistrationService {
  /**
   * Create a new registration with duplicate prevention
   */
  static async createRegistration(
    data: CreateRegistrationInput
  ): Promise<Registration> {
    try {
      // Check if event exists and has capacity
      const capacityCheck = await EventService.checkEventCapacity(data.eventId);

      if (!capacityCheck.hasCapacity) {
        throw new Error("Event has reached maximum capacity");
      }

      // Check for duplicate registration
      const existingRegistration = await prisma.registration.findUnique({
        where: {
          eventId_email: {
            eventId: data.eventId,
            email: data.email.toLowerCase(),
          },
        },
      });

      if (existingRegistration) {
        throw new Error("User is already registered for this event");
      }

      // Create the registration
      const registration = await prisma.registration.create({
        data: {
          eventId: data.eventId,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email.toLowerCase(),
          phone: data.phone,
          status: data.status,
          course: data.course || null,
          areaOfInterest: data.areaOfInterest,
          expectations: data.expectations || null,
        },
      });

      return registration;
    } catch (error) {
      console.error("Error creating registration:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to create registration");
    }
  }

  /**
   * Get registration by ID
   */
  static async getRegistrationById(
    id: string
  ): Promise<RegistrationWithEvent | null> {
    try {
      const registration = await prisma.registration.findUnique({
        where: { id },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              date: true,
              time: true,
              venue: true,
            },
          },
        },
      });

      return registration;
    } catch (error) {
      console.error("Error fetching registration:", error);
      throw new Error("Failed to fetch registration");
    }
  }

  /**
   * Get registrations for a specific event with pagination
   */
  static async getEventRegistrations(
    eventId: string,
    query: RegistrationQueryInput
  ): Promise<RegistrationListResponse> {
    try {
      const { page, limit, search, status, sortBy, sortOrder } = query;
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = { eventId };

      if (status) {
        where.status = status;
      }

      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { course: { contains: search, mode: "insensitive" } },
          { areaOfInterest: { contains: search, mode: "insensitive" } },
        ];
      }

      // Build order by clause
      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      const [registrations, total] = await Promise.all([
        prisma.registration.findMany({
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
                time: true,
                venue: true,
              },
            },
          },
        }),
        prisma.registration.count({ where }),
      ]);

      return {
        registrations,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching event registrations:", error);
      throw new Error("Failed to fetch event registrations");
    }
  } /**

   * Get all registrations with pagination and filtering
   */
  static async getAllRegistrations(
    query: RegistrationQueryInput
  ): Promise<RegistrationListResponse> {
    try {
      const { page, limit, search, status, sortBy, sortOrder } = query;
      const skip = (page - 1) * limit;

      // Build where clause
      const where: any = {};

      if (status) {
        where.status = status;
      }

      if (search) {
        where.OR = [
          { firstName: { contains: search, mode: "insensitive" } },
          { lastName: { contains: search, mode: "insensitive" } },
          { email: { contains: search, mode: "insensitive" } },
          { course: { contains: search, mode: "insensitive" } },
          { areaOfInterest: { contains: search, mode: "insensitive" } },
          { event: { title: { contains: search, mode: "insensitive" } } },
        ];
      }

      // Build order by clause
      const orderBy: any = {};
      orderBy[sortBy] = sortOrder;

      const [registrations, total] = await Promise.all([
        prisma.registration.findMany({
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
                time: true,
                venue: true,
              },
            },
          },
        }),
        prisma.registration.count({ where }),
      ]);

      return {
        registrations,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      };
    } catch (error) {
      console.error("Error fetching all registrations:", error);
      throw new Error("Failed to fetch registrations");
    }
  }

  /**
   * Delete a registration
   */
  static async deleteRegistration(id: string): Promise<void> {
    try {
      const registration = await prisma.registration.findUnique({
        where: { id },
      });

      if (!registration) {
        throw new Error("Registration not found");
      }

      await prisma.registration.delete({
        where: { id },
      });
    } catch (error) {
      console.error("Error deleting registration:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to delete registration");
    }
  }

  /**
   * Check if user is already registered for an event
   */
  static async checkDuplicateRegistration(
    eventId: string,
    email: string
  ): Promise<boolean> {
    try {
      const registration = await prisma.registration.findUnique({
        where: {
          eventId_email: {
            eventId,
            email: email.toLowerCase(),
          },
        },
      });

      return !!registration;
    } catch (error) {
      console.error("Error checking duplicate registration:", error);
      throw new Error("Failed to check duplicate registration");
    }
  }

  /**
   * Get registration statistics
   */
  static async getRegistrationStats(): Promise<{
    totalRegistrations: number;
    studentRegistrations: number;
    graduateRegistrations: number;
    recentRegistrations: RegistrationWithEvent[];
  }> {
    try {
      const [
        totalRegistrations,
        studentRegistrations,
        graduateRegistrations,
        recentRegistrations,
      ] = await Promise.all([
        prisma.registration.count(),
        prisma.registration.count({ where: { status: StudentStatus.STUDENT } }),
        prisma.registration.count({
          where: { status: StudentStatus.GRADUATE },
        }),
        prisma.registration.findMany({
          orderBy: { registeredAt: "desc" },
          take: 10,
          include: {
            event: {
              select: {
                id: true,
                title: true,
                date: true,
                time: true,
                venue: true,
              },
            },
          },
        }),
      ]);

      return {
        totalRegistrations,
        studentRegistrations,
        graduateRegistrations,
        recentRegistrations,
      };
    } catch (error) {
      console.error("Error fetching registration statistics:", error);
      throw new Error("Failed to fetch registration statistics");
    }
  }

  /**
   * Export registrations for an event
   */
  static async exportEventRegistrations(
    eventId: string,
    options: RegistrationExportInput
  ): Promise<RegistrationExportData> {
    try {
      // Get event details
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: {
          title: true,
          date: true,
        },
      });

      if (!event) {
        throw new Error("Event not found");
      }

      // Get all registrations for the event
      const registrations = await prisma.registration.findMany({
        where: { eventId },
        orderBy: { registeredAt: "asc" },
      });

      // Format the export data
      const exportData: RegistrationExportData = {
        eventTitle: event.title,
        eventDate: event.date.toISOString(),
        registrations: registrations.map((reg) => ({
          ...reg,
          phone: formatPhoneNumber(reg.phone), // Format phone for display
        })),
        totalCount: registrations.length,
        exportedAt: new Date(),
      };

      return exportData;
    } catch (error) {
      console.error("Error exporting registrations:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to export registrations");
    }
  }

  /**
   * Get registrations by email (across all events)
   */
  static async getRegistrationsByEmail(
    email: string
  ): Promise<RegistrationWithEvent[]> {
    try {
      const registrations = await prisma.registration.findMany({
        where: { email: email.toLowerCase() },
        include: {
          event: {
            select: {
              id: true,
              title: true,
              date: true,
              time: true,
              venue: true,
            },
          },
        },
        orderBy: { registeredAt: "desc" },
      });

      return registrations;
    } catch (error) {
      console.error("Error fetching registrations by email:", error);
      throw new Error("Failed to fetch registrations by email");
    }
  }

  /**
   * Get registration count for a specific event
   */
  static async getEventRegistrationCount(eventId: string): Promise<number> {
    try {
      const count = await prisma.registration.count({
        where: { eventId },
      });

      return count;
    } catch (error) {
      console.error("Error getting registration count:", error);
      throw new Error("Failed to get registration count");
    }
  }

  /**
   * Update registration details (limited fields)
   */
  static async updateRegistration(
    id: string,
    data: {
      phone?: string;
      course?: string;
      areaOfInterest?: string;
      expectations?: string;
    }
  ): Promise<Registration> {
    try {
      const registration = await prisma.registration.findUnique({
        where: { id },
      });

      if (!registration) {
        throw new Error("Registration not found");
      }

      const updateData: any = {};

      if (data.phone !== undefined) updateData.phone = data.phone;
      if (data.course !== undefined) updateData.course = data.course || null;
      if (data.areaOfInterest !== undefined)
        updateData.areaOfInterest = data.areaOfInterest;
      if (data.expectations !== undefined)
        updateData.expectations = data.expectations || null;

      const updatedRegistration = await prisma.registration.update({
        where: { id },
        data: updateData,
      });

      return updatedRegistration;
    } catch (error) {
      console.error("Error updating registration:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Failed to update registration");
    }
  }
}
