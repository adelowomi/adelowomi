import { NextRequest } from "next/server";
import { EventService } from "@/lib/services/event.service";
import { prisma } from "@/lib/utils/db";
import {
  createSuccessResponse,
  handleRouteError,
  createUnauthorizedResponse,
} from "@/lib/utils/response";
import { requireAdmin } from "@/lib/utils/auth";

/**
 * GET /api/admin/dashboard/stats - Get dashboard statistics
 */
export async function GET(request: NextRequest) {
  try {
    // Require admin authentication
    await requireAdmin();

    // Get event statistics
    const eventStats = await EventService.getEventStats();

    // Get recent registrations (last 10)
    const recentRegistrations = await prisma.registration.findMany({
      take: 10,
      orderBy: {
        registeredAt: "desc",
      },
      include: {
        event: {
          select: {
            title: true,
          },
        },
      },
    });

    // Get upcoming events (next 5)
    const upcomingEvents = await EventService.getUpcomingEvents(5);

    // Get media counts
    const [totalImages, totalVideos] = await Promise.all([
      prisma.gallery.count(),
      prisma.video.count(),
    ]);

    // Calculate this month's registrations
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const thisMonthRegistrations = await prisma.registration.count({
      where: {
        registeredAt: {
          gte: startOfMonth,
        },
      },
    });

    // Calculate this week's registrations
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const thisWeekRegistrations = await prisma.registration.count({
      where: {
        registeredAt: {
          gte: startOfWeek,
        },
      },
    });

    // Calculate recent uploads (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [recentImages, recentVideos] = await Promise.all([
      prisma.gallery.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      }),
      prisma.video.count({
        where: {
          createdAt: {
            gte: sevenDaysAgo,
          },
        },
      }),
    ]);

    const dashboardStats = {
      events: {
        total: eventStats.totalEvents,
        active: eventStats.activeEvents,
        completed: eventStats.completedEvents,
        inactive:
          eventStats.totalEvents -
          eventStats.activeEvents -
          eventStats.completedEvents,
      },
      registrations: {
        total: eventStats.totalRegistrations,
        thisMonth: thisMonthRegistrations,
        thisWeek: thisWeekRegistrations,
      },
      media: {
        totalImages,
        totalVideos,
        recentUploads: recentImages + recentVideos,
      },
      recentActivity: {
        recentEvents: upcomingEvents.map((event) => ({
          id: event.id,
          title: event.title,
          date: event.date,
          registrationCount: event.registrationCount,
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

    return createSuccessResponse(dashboardStats);
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
