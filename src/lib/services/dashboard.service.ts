import { prisma } from "@/lib/utils/db";
import { EventStatus } from "@/types/event.types";

export interface DashboardStats {
  events: {
    total: number;
    active: number;
    completed: number;
    inactive: number;
  };
  registrations: {
    total: number;
    thisMonth: number;
    thisWeek: number;
  };
  media: {
    totalImages: number;
    totalVideos: number;
    recentUploads: number;
  };
  recentActivity: {
    recentEvents: Array<{
      id: string;
      title: string;
      date: Date;
      registrationCount: number;
    }>;
    recentRegistrations: Array<{
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      eventTitle: string;
      registeredAt: Date;
    }>;
  };
}

export class DashboardService {
  async getDashboardStats(): Promise<DashboardStats> {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));

    // Get event statistics
    const [totalEvents, activeEvents, completedEvents, inactiveEvents] =
      await Promise.all([
        prisma.event.count(),
        prisma.event.count({ where: { status: EventStatus.ACTIVE } }),
        prisma.event.count({ where: { status: EventStatus.COMPLETED } }),
        prisma.event.count({ where: { status: EventStatus.INACTIVE } }),
      ]);

    // Get registration statistics
    const [totalRegistrations, monthlyRegistrations, weeklyRegistrations] =
      await Promise.all([
        prisma.registration.count(),
        prisma.registration.count({
          where: { registeredAt: { gte: startOfMonth } },
        }),
        prisma.registration.count({
          where: { registeredAt: { gte: startOfWeek } },
        }),
      ]);

    // Get media statistics
    const [totalImages, totalVideos] = await Promise.all([
      prisma.gallery.count(),
      prisma.video.count(),
    ]);

    const recentUploads =
      (await prisma.gallery.count({
        where: { createdAt: { gte: startOfWeek } },
      })) +
      (await prisma.video.count({
        where: { createdAt: { gte: startOfWeek } },
      }));

    // Get recent activity
    const recentEvents = await prisma.event.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        date: true,
        _count: {
          select: { registrations: true },
        },
      },
    });

    const recentRegistrations = await prisma.registration.findMany({
      take: 10,
      orderBy: { registeredAt: "desc" },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        registeredAt: true,
        event: {
          select: { title: true },
        },
      },
    });

    return {
      events: {
        total: totalEvents,
        active: activeEvents,
        completed: completedEvents,
        inactive: inactiveEvents,
      },
      registrations: {
        total: totalRegistrations,
        thisMonth: monthlyRegistrations,
        thisWeek: weeklyRegistrations,
      },
      media: {
        totalImages,
        totalVideos,
        recentUploads,
      },
      recentActivity: {
        recentEvents: recentEvents.map((event) => ({
          id: event.id,
          title: event.title,
          date: event.date,
          registrationCount: event._count.registrations,
        })),
        recentRegistrations: recentRegistrations.map((reg) => ({
          id: reg.id,
          firstName: reg.firstName,
          lastName: reg.lastName,
          email: reg.email,
          eventTitle: reg.event.title,
          registeredAt: reg.registeredAt,
        })),
      },
    };
  }
}
