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

interface AttendeeListProps {
  attendees: Attendee[];
  loading: boolean;
  onMarkAttendance: (registrationId: string, attended: boolean) => void;
}

export function AttendeeList({ attendees, loading, onMarkAttendance }: AttendeeListProps) {
  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-8 text-center">
          <div className="w-8 h-8 mx-auto border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Loading attendees...</p>
        </div>
      </div>
    );
  }

  if (attendees.length === 0) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-4 text-gray-400">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">No attendees found</h3>
          <p className="text-gray-500">No registered attendees match your search criteria.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">
          Attendees ({attendees.length})
        </h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Contact
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Area of Interest
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Registered
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Attendance
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {attendees.map((attendee) => (
              <tr key={attendee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {attendee.firstName} {attendee.lastName}
                    </div>
                    {attendee.course && (
                      <div className="text-sm text-gray-500">{attendee.course}</div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{attendee.email}</div>
                  <div className="text-sm text-gray-500">{attendee.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    attendee.status === 'STUDENT'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-green-100 text-green-800'
                  }`}>
                    {attendee.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                  {attendee.areaOfInterest}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {new Date(attendee.registeredAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => onMarkAttendance(attendee.id, !attendee.attended)}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        attendee.attended
                          ? 'bg-green-100 text-green-800 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <div className={`w-2 h-2 rounded-full mr-2 ${
                        attendee.attended ? 'bg-green-500' : 'bg-gray-400'
                      }`}></div>
                      {attendee.attended ? 'Present' : 'Mark Present'}
                    </button>
                    {attendee.attended && attendee.attendedAt && (
                      <div className="text-xs text-gray-500">
                        {new Date(attendee.attendedAt).toLocaleString()}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
