"use client";

interface Attendee {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: string;
  course?: string;
  areaOfInterest: string;
  registeredAt: string;
  attended: boolean;
  attendedAt?: string;
}

interface AttendanceStatsProps {
  attendees: Attendee[];
  loading: boolean;
}

export function AttendanceStats({ attendees, loading }: AttendanceStatsProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="animate-pulse">
              <div className="w-3/4 h-4 mb-2 bg-gray-200 rounded"></div>
              <div className="w-1/2 h-8 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const totalAttendees = attendees.length;
  const presentCount = attendees.filter(attendee => attendee.attended).length;
  const absentCount = totalAttendees - presentCount;
  const attendanceRate = totalAttendees > 0 ? Math.round((presentCount / totalAttendees) * 100) : 0;

  const stats = [
    {
      title: "Total Registered",
      value: totalAttendees,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Present",
      value: presentCount,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Absent",
      value: absentCount,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Attendance Rate",
      value: `${attendanceRate}%`,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
      color: attendanceRate >= 80 ? "text-green-600" : attendanceRate >= 60 ? "text-yellow-600" : "text-red-600",
      bgColor: attendanceRate >= 80 ? "bg-green-50" : attendanceRate >= 60 ? "bg-yellow-50" : "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <div key={index} className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="flex items-center">
            <div className={`flex-shrink-0 ${stat.bgColor} rounded-md p-3`}>
              <div className={stat.color}>{stat.icon}</div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">{stat.title}</p>
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
