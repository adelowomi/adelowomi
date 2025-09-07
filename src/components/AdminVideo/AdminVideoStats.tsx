"use client";

import React from "react";

interface VideoStats {
  totalVideos: number;
  eventVideos: number;
  contentVideos: number;
  promotionalVideos: number;
}

interface AdminVideoStatsProps {
  stats: VideoStats;
}

const AdminVideoStats: React.FC<AdminVideoStatsProps> = ({ stats }) => {
  const statCards = [
    {
      title: "Total Videos",
      value: stats.totalVideos,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      title: "Event Videos",
      value: stats.eventVideos,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20",
    },
    {
      title: "Content Videos",
      value: stats.contentVideos,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
    },
    {
      title: "Promotional Videos",
      value: stats.promotionalVideos,
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((stat, index) => (
        <div
          key={index}
          className={`${stat.bgColor} ${stat.borderColor} border rounded-lg p-4`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
              <p className={`${stat.color} text-2xl font-bold mt-1`}>
                {stat.value}
              </p>
            </div>
            <div className={`${stat.color} text-2xl opacity-60`}>🎥</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminVideoStats;
