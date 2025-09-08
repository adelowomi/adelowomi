"use client";

import React from "react";
import DashboardCard from "../ui/DashboardCard";
import { EventCalendarIcon, ImagesIcon, VideosIcon } from "@/icons";
import { useDashboardStats } from "@/hooks/useAdmin";
import LoadingSpinner from "../ui/LoadingSpinner";

const DashboardView = () => {
  const { stats, loading, error } = useDashboardStats();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-500 text-center">
          <p>Error loading dashboard data</p>
          <p className="text-sm mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 lg:gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
        <DashboardCard
          availableNumber={stats?.events?.total || 0}
          type="Events"
          svg={<EventCalendarIcon />}
        />

        <DashboardCard
          availableNumber={stats?.media?.totalImages || 0}
          type="Images"
          svg={<ImagesIcon />}
        />

        <DashboardCard
          availableNumber={stats?.media?.totalVideos || 0}
          type="Videos"
          svg={<VideosIcon />}
        />
      </div>
      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Registrations */}
        <div className="lg:col-span-2 border-[0.5px] border-solid border-[#FCFCFC1A] rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-primary">
              Recent Registrations
            </h3>
            <span className="text-xs sm:text-sm text-gray-400">
              Latest activity
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-[#FCFCFC1A]">
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-400">
                    Name
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-400">
                    Email
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-400">
                    Event
                  </th>
                  <th className="text-left py-2 sm:py-3 px-2 sm:px-4 text-xs sm:text-sm font-medium text-gray-400">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentActivity?.recentRegistrations?.length ? (
                  stats.recentActivity.recentRegistrations.map(
                    (registration) => (
                      <tr
                        key={registration.id}
                        className="border-b border-[#FCFCFC0A]"
                      >
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-primary text-xs sm:text-sm">
                          {registration.firstName} {registration.lastName}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 truncate max-w-[150px] sm:max-w-[200px] text-xs sm:text-sm">
                          {registration.email}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-primary truncate max-w-[150px] sm:max-w-[200px] text-xs sm:text-sm">
                          {registration.eventTitle}
                        </td>
                        <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-400 text-xs sm:text-sm">
                          {new Date(
                            registration.registeredAt
                          ).toLocaleDateString()}
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan={4}
                      className="text-center py-6 sm:py-8 text-gray-400 text-sm"
                    >
                      No recent registrations
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <div className="border-[0.5px] border-solid border-[#FCFCFC1A] rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-primary">
              Recent Events
            </h3>
            <span className="text-xs sm:text-sm text-gray-400">
              {stats?.events?.active || 0} Active
            </span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {stats?.recentActivity?.recentEvents?.length ? (
              stats.recentActivity.recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 sm:p-4 bg-[#FCFCFC0A] rounded-lg gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-primary truncate text-sm sm:text-base">
                      {event.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs sm:text-sm font-medium text-secondary">
                      {event.registrationCount} registered
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-6 sm:py-8 text-gray-400">
                <p className="text-sm">No recent events</p>
              </div>
            )}
          </div>
        </div>

        {/* Registration Statistics */}
        <div className="border-[0.5px] border-solid border-[#FCFCFC1A] rounded-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
            <h3 className="text-lg sm:text-xl font-semibold text-primary">
              Registrations
            </h3>
            <span className="text-xs sm:text-sm text-gray-400">
              {stats?.registrations?.total || 0} Total
            </span>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <div className="flex justify-between items-center p-3 sm:p-4 bg-[#FCFCFC0A] rounded-lg">
              <div>
                <h4 className="font-medium text-primary text-sm sm:text-base">
                  This Month
                </h4>
                <p className="text-xs sm:text-sm text-gray-400">
                  New registrations
                </p>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-secondary">
                {stats?.registrations?.thisMonth || 0}
              </div>
            </div>
            <div className="flex justify-between items-center p-3 sm:p-4 bg-[#FCFCFC0A] rounded-lg">
              <div>
                <h4 className="font-medium text-primary text-sm sm:text-base">
                  This Week
                </h4>
                <p className="text-xs sm:text-sm text-gray-400">
                  Recent activity
                </p>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-secondary">
                {stats?.registrations?.thisWeek || 0}
              </div>
            </div>
            <div className="flex justify-between items-center p-3 sm:p-4 bg-[#FCFCFC0A] rounded-lg">
              <div>
                <h4 className="font-medium text-primary text-sm sm:text-base">
                  Media Uploads
                </h4>
                <p className="text-xs sm:text-sm text-gray-400">This week</p>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-secondary">
                {stats?.media?.recentUploads || 0}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;
