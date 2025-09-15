"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "next/navigation";
import { QuestionType } from "@/types/prisma.types";
import Image from "next/image";
import { getGoogleDriveImageUrl } from "@/lib/utils/file-helpers";
import { HeroDecorativeIcon } from "@/icons";
import Navbar from "@/components/shared/Navbar";
import ErrorNotification from "@/components/ui/ErrorNotification";

interface VolunteerFormQuestion {
  id: string;
  question: string;
  type: QuestionType;
  required: boolean;
  options?: string;
  order: number;
}

interface VolunteerForm {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
  event: {
    id: string;
    title: string;
    date: string;
    time: string;
    venue: string;
    flyerUrl?: string;
    capacity: number;
  };
  questions: VolunteerFormQuestion[];
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const VolunteerFormPage = () => {
  const params = useParams();
  const formId = params.id as string;

  const [volunteerForm, setVolunteerForm] = useState<VolunteerForm | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const fetchVolunteerForm = useCallback(async () => {
    try {
      const response = await fetch(`/api/volunteer-forms/${formId}`);
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
    fetchVolunteerForm();
  }, [fetchVolunteerForm]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/volunteer-forms/${formId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          answers,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        const errorData = await response.json();

        if (errorData.error === "DUPLICATE_SUBMISSION") {
          setError(errorData.message);
        } else {
          setError("Failed to submit form. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Failed to submit form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderQuestion = (question: VolunteerFormQuestion) => {
    const options = question.options ? JSON.parse(question.options) : [];
    const baseInputClasses =
      "w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200 text-sm sm:text-base";

    switch (question.type) {
      case QuestionType.TEXT:
        return (
          <input
            type="text"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className={baseInputClasses}
            placeholder="Enter your answer..."
            required={question.required}
          />
        );

      case QuestionType.TEXTAREA:
        return (
          <textarea
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className={baseInputClasses}
            rows={4}
            placeholder="Please provide details..."
            required={question.required}
          />
        );

      case QuestionType.EMAIL:
        return (
          <input
            type="email"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className={baseInputClasses}
            placeholder="your.email@example.com"
            required={question.required}
          />
        );

      case QuestionType.PHONE:
        return (
          <input
            type="tel"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className={baseInputClasses}
            placeholder="+1 (555) 123-4567"
            required={question.required}
          />
        );

      case QuestionType.MULTIPLE_CHOICE:
        return (
          <div className="space-y-2 sm:space-y-3">
            {options.map((option: string, index: number) => (
              <label
                key={index}
                className="flex items-center p-2 sm:p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-secondary/50 cursor-pointer transition-all duration-200"
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) =>
                    handleAnswerChange(question.id, e.target.value)
                  }
                  className="mr-2 sm:mr-3 w-3 sm:w-4 h-3 sm:h-4 text-secondary focus:ring-secondary flex-shrink-0"
                  required={question.required}
                />
                <span className="text-gray-700 font-medium text-sm sm:text-base break-words">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case QuestionType.CHECKBOX:
        return (
          <div className="space-y-2 sm:space-y-3">
            {options.map((option: string, index: number) => (
              <label
                key={index}
                className="flex items-center p-2 sm:p-3 bg-white rounded-lg border-2 border-gray-200 hover:border-secondary/50 cursor-pointer transition-all duration-200"
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={(answers[question.id] || "").includes(option)}
                  onChange={(e) => {
                    const currentAnswers = answers[question.id]
                      ? answers[question.id].split(",")
                      : [];
                    if (e.target.checked) {
                      handleAnswerChange(
                        question.id,
                        [...currentAnswers, option].join(",")
                      );
                    } else {
                      handleAnswerChange(
                        question.id,
                        currentAnswers.filter((a) => a !== option).join(",")
                      );
                    }
                  }}
                  className="mr-2 sm:mr-3 w-3 sm:w-4 h-3 sm:h-4 text-secondary focus:ring-secondary flex-shrink-0"
                />
                <span className="text-gray-700 font-medium text-sm sm:text-base break-words">
                  {option}
                </span>
              </label>
            ))}
          </div>
        );

      case QuestionType.DATE:
        return (
          <input
            type="date"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className={baseInputClasses}
            required={question.required}
          />
        );

      case QuestionType.TIME:
        return (
          <input
            type="time"
            value={answers[question.id] || ""}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className={baseInputClasses}
            required={question.required}
          />
        );

      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="max-w-[1440px] my-0 mx-auto">
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 sm:h-12 w-8 sm:w-12 border-b-2 border-secondary mx-auto mb-3 sm:mb-4"></div>
            <div className="text-secondary text-sm sm:text-lg font-medium">
              Loading volunteer opportunity...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!volunteerForm) {
    return (
      <div className="max-w-[1440px] my-0 mx-auto">
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-4">
          <div className="text-center bg-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-xl max-w-md mx-auto">
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">🔍</div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary mb-3 sm:mb-4 font-besley">
              Form Not Found
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
              The volunteer opportunity you&apos;re looking for doesn&apos;t
              exist or may have been removed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!volunteerForm.isActive) {
    return (
      <div className="max-w-[1440px] my-0 mx-auto">
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center px-4">
          <div className="text-center bg-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-xl max-w-md mx-auto">
            <div className="text-4xl sm:text-6xl mb-4 sm:mb-6">⏸️</div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-secondary mb-3 sm:mb-4 font-besley">
              Applications Closed
            </h1>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">
              This volunteer opportunity is currently not accepting new
              applications.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-[1440px] my-0 mx-auto">
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
          <div className="max-w-lg mx-auto text-center bg-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-xl">
            <div className="text-green-500 text-5xl sm:text-6xl lg:text-8xl mb-4 sm:mb-6">
              ✓
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-4 sm:mb-6 font-besley">
              Thank You!
            </h1>
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg mb-3 sm:mb-4">
              Your volunteer application for{" "}
              <span className="font-semibold text-secondary break-words">
                {volunteerForm.event.title}
              </span>{" "}
              has been submitted successfully.
            </p>
            <p className="text-gray-500 text-sm sm:text-base">
              We&apos;ll review your application and get back to you soon with
              next steps.
            </p>
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-50 rounded-lg">
              <p className="text-green-700 font-medium text-sm sm:text-base">
                Keep an eye on your email for updates!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1440px] my-0 mx-auto">
      <Navbar />
      {error && (
        <ErrorNotification
          message={error}
          type="error"
          onClose={() => setError(null)}
        />
      )}
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/5">
        {/* Hero Section with Event Flyer */}
        <div className="relative overflow-hidden bg-white">
          <div className="flex flex-col lg:flex-row px-4 sm:px-6 lg:px-28 py-8 sm:py-12 lg:py-24 gap-8 lg:gap-12">
            {/* Decorative Icon */}
            <div className="absolute top-4 left-4 sm:top-8 sm:left-8 lg:top-24 lg:left-28">
              <HeroDecorativeIcon />
            </div>

            {/* Event Flyer Section */}
            <div className="w-full lg:w-[580px] lg:h-[554px] bg-secondary p-4 sm:p-6 lg:p-8 rounded-2xl shadow-2xl">
              <div className="w-full h-[250px] sm:h-[300px] lg:w-[516px] lg:h-[490px] rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-center overflow-hidden">
                {volunteerForm.event.flyerUrl ? (
                  <Image
                    src={getGoogleDriveImageUrl(volunteerForm.event.flyerUrl)}
                    alt={volunteerForm.event.title}
                    width={516}
                    height={490}
                    className="w-full h-full object-cover rounded-xl"
                  />
                ) : (
                  <div className="text-center text-gray-500">
                    <div className="text-4xl sm:text-6xl mb-4">🎉</div>
                    <p className="text-base sm:text-lg font-medium">
                      Event Flyer
                    </p>
                    <p className="text-xs sm:text-sm">Coming Soon</p>
                  </div>
                )}
              </div>
            </div>

            {/* Event Details Section */}
            <div className="flex-1 space-y-6 lg:space-y-8">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-secondary mb-3 sm:mb-4 font-besley leading-tight">
                  {volunteerForm.title}
                </h1>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-4 sm:mb-6 leading-tight">
                  {volunteerForm.event.title}
                </h2>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-start sm:items-center">
                  <span className="text-xl sm:text-2xl mr-3 flex-shrink-0">
                    📅
                  </span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                      Date
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {new Date(volunteerForm.event.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-start sm:items-center">
                  <span className="text-xl sm:text-2xl mr-3 flex-shrink-0">
                    ⏰
                  </span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                      Time
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base">
                      {volunteerForm.event.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-start sm:items-center">
                  <span className="text-xl sm:text-2xl mr-3 flex-shrink-0">
                    📍
                  </span>
                  <div>
                    <p className="font-medium text-gray-800 text-sm sm:text-base">
                      Venue
                    </p>
                    <p className="text-gray-600 text-sm sm:text-base break-words">
                      {volunteerForm.event.venue}
                    </p>
                  </div>
                </div>
              </div>

              {volunteerForm.description && (
                <div className="bg-secondary/10 p-4 sm:p-6 rounded-xl">
                  <p className="text-gray-700 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {volunteerForm.description}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Application Form Section */}
        <div className="px-4 sm:px-6 lg:px-28 py-8 sm:py-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 xl:p-12">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-secondary mb-3 sm:mb-4 font-besley">
                  Join Our Team
                </h2>
                <p className="text-gray-600 text-sm sm:text-base lg:text-lg px-2">
                  Fill out the form below to apply as a volunteer for this
                  amazing event
                </p>
                <div className="w-16 sm:w-24 h-1 bg-secondary mx-auto mt-3 sm:mt-4"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                {/* Personal Information Section */}
                <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                  <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-4 sm:mb-6 font-besley">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200 text-sm sm:text-base"
                        placeholder="Enter your first name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData({ ...formData, lastName: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200 text-sm sm:text-base"
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4 sm:mt-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200 text-sm sm:text-base"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-secondary focus:ring-2 focus:ring-secondary/20 transition-all duration-200 text-sm sm:text-base"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Questions Section */}
                {volunteerForm.questions.length > 0 && (
                  <div className="bg-primary/5 p-4 sm:p-6 rounded-xl">
                    <h3 className="text-lg sm:text-xl font-semibold text-secondary mb-4 sm:mb-6 font-besley">
                      Additional Information
                    </h3>
                    <div className="space-y-4 sm:space-y-6">
                      {volunteerForm.questions
                        .sort((a, b) => a.order - b.order)
                        .map((question) => (
                          <div key={question.id}>
                            <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                              {question.question}
                              {question.required && (
                                <span className="text-red-500 ml-1">*</span>
                              )}
                            </label>
                            {renderQuestion(question)}
                          </div>
                        ))}
                    </div>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-6 sm:pt-8">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-secondary to-secondary/90 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-xl font-semibold text-base sm:text-lg hover:from-secondary/90 hover:to-secondary transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                  >
                    {submitting ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 sm:h-5 w-4 sm:w-5 border-b-2 border-white mr-2 sm:mr-3"></div>
                        <span className="text-sm sm:text-base">
                          Submitting Application...
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <span className="text-sm sm:text-base">
                          Submit Volunteer Application
                        </span>
                        <span className="ml-2">🚀</span>
                      </div>
                    )}
                  </button>
                  <p className="text-center text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 px-2">
                    By submitting this form, you agree to volunteer for the
                    event and follow all guidelines.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerFormPage;
