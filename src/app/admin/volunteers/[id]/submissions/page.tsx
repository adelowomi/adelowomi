"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/layouts/AdminLayout";
import Sidebar from "@/components/shared/Sidebar";
import AdminNavbar from "@/components/shared/AdminNavbar";
import Link from "next/link";

interface VolunteerAnswer {
  id: string;
  answer: string;
  question: {
    id: string;
    question: string;
    type: string;
  };
}

interface VolunteerSubmission {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  submittedAt: string;
  answers: VolunteerAnswer[];
}

interface VolunteerForm {
  id: string;
  title: string;
  event: {
    title: string;
  };
}

const VolunteerSubmissionsPage = () => {
  const params = useParams();
  const formId = params.id as string;

  const [submissions, setSubmissions] = useState<VolunteerSubmission[]>([]);
  const [volunteerForm, setVolunteerForm] = useState<VolunteerForm | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/admin/volunteer-forms/${formId}/submissions`
      );
      if (response.ok) {
        const data = await response.json();
        setSubmissions(data);
      }
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  }, [formId]);

  const fetchVolunteerForm = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/volunteer-forms/${formId}`);
      if (response.ok) {
        const data = await response.json();
        setVolunteerForm(data);
      }
    } catch (error) {
      console.error("Error fetching volunteer form:", error);
    } finally {
      setLoading(false);
    }
  }, [formId]);

  useEffect(() => {
    if (formId) {
      fetchSubmissions();
      fetchVolunteerForm();
    }
  }, [formId, fetchSubmissions, fetchVolunteerForm]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-row min-h-screen">
          <div className="w-[280px] lg:w-[18%] border-r border-[#FCFCFC33] min-h-screen">
            <Sidebar />
          </div>
          <div className="flex-1 m-6 lg:m-10 flex flex-col gap-8">
            <AdminNavbar />
            <div className="flex justify-center items-center h-64">
              <div className="text-white">Loading submissions...</div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex flex-row min-h-screen">
        <div className="w-[280px] lg:w-[18%] border-r border-[#FCFCFC33] min-h-screen">
          <Sidebar />
        </div>
        <div className="flex-1 m-6 lg:m-10 flex flex-col gap-8">
          <AdminNavbar />
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <Link
                href="/admin/volunteers"
                className="text-secondary hover:text-secondary/80 transition-colors"
              >
                ← Back to Volunteer Forms
              </Link>
            </div>

            {volunteerForm && (
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <h1 className="text-2xl font-bold text-white mb-2">
                  {volunteerForm.title}
                </h1>
                <p className="text-gray-300">
                  Event: {volunteerForm.event.title}
                </p>
                <p className="text-gray-400 mt-2">
                  Total Submissions: {submissions.length}
                </p>
              </div>
            )}

            {submissions.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-4">
                  No submissions yet
                </div>
                <div className="text-gray-500">
                  Submissions will appear here once volunteers start applying
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {submissions.map((submission) => (
                  <div
                    key={submission.id}
                    className="bg-white/5 border border-white/10 rounded-lg p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-white">
                          {submission.firstName} {submission.lastName}
                        </h3>
                        <p className="text-gray-300">{submission.email}</p>
                        {submission.phone && (
                          <p className="text-gray-300">{submission.phone}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <p>Submitted:</p>
                        <p>
                          {new Date(submission.submittedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-lg font-medium text-white mb-3">
                        Responses
                      </h4>
                      <div className="space-y-3">
                        {submission.answers.map((answer) => (
                          <div
                            key={answer.id}
                            className="bg-gray-800/50 p-3 rounded"
                          >
                            <p className="text-gray-300 font-medium mb-1">
                              {answer.question.question}
                            </p>
                            <p className="text-white">{answer.answer}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default VolunteerSubmissionsPage;
