"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import CheckBox from "../ui/CheckBox";
import { SendIcon } from "@/icons";
import { useEvent } from "@/hooks/useEvents";
import { useRegistration, RegistrationData } from "@/hooks/useRegistration";
import { useRouter } from "next/navigation";
import { getGoogleDriveImageUrl } from "@/lib/utils/file-helpers";
import Image from "next/image";

interface RegisterEventFormProps {
  eventId: string;
}

const RegisterEventForm = ({ eventId }: RegisterEventFormProps) => {
  const router = useRouter();
  const { event, loading: eventLoading, error: eventError } = useEvent(eventId);
  const {
    registerForEvent,
    loading: registrationLoading,
    error: registrationError,
    success,
  } = useRegistration();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    status: "STUDENT" as "STUDENT" | "GRADUATE",
    course: "",
    areaOfInterest: "",
    expectations: "",
  });

  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({});

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleStudentStatusChange = (status: "STUDENT" | "GRADUATE") => {
    setFormData((prev) => ({
      ...prev,
      status,
      // Clear course if switching to graduate
      course: status === "GRADUATE" ? "" : prev.course,
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    if (formData.status === "STUDENT" && !formData.course.trim())
      errors.course = "Course is required for students";
    if (!formData.areaOfInterest)
      errors.areaOfInterest = "Area of interest is required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Transform form data to match API expectations
      const registrationData: RegistrationData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        status: formData.status,
        areaOfInterest: formData.areaOfInterest,
        ...(formData.status === "STUDENT" && { course: formData.course }),
        ...(formData.expectations.trim() && {
          expectations: formData.expectations,
        }),
      };

      await registerForEvent(eventId, registrationData);
      // Registration successful - you might want to show a success message or redirect
      setTimeout(() => {
        router.push("/event?registered=true");
      }, 2000);
    } catch (error) {
      // Error is handled by the hook
      console.error("Registration failed:", error);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });
  };

  if (eventLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-primary text-xl">Loading event details...</p>
      </div>
    );
  }

  if (eventError || !event) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-500 text-xl mb-4">
            {eventError || "Event not found"}
          </p>
          <Button text="Back to Events" onClick={() => router.push("/event")} />
        </div>
      </div>
    );
  }

  if (event.availableSpots <= 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <p className="text-primary text-xl mb-4">
            Sorry, this event is fully booked!
          </p>
          <Button
            text="View Other Events"
            onClick={() => router.push("/event")}
          />
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-primary text-2xl font-semibold mb-4">
            Registration Successful!
          </h2>
          <p className="text-primary text-lg mb-6">
            You have successfully registered for {event.title}. You will receive
            a confirmation email shortly.
          </p>
          <Button text="Back to Events" onClick={() => router.push("/event")} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0A0A] via-[#1A1A1A] to-[#0A0A0A] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Event Flyer Section */}
          <div className="space-y-8 order-2 lg:order-1">
            {event.flyerUrl ? (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#8F6302] to-[#D4AF37] rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative bg-[#1A1A1A] rounded-xl overflow-hidden border border-[#8F630233]">
                  <Image
                    src={getGoogleDriveImageUrl(event.flyerUrl)}
                    alt={event.title}
                    width={500}
                    height={400}
                    className="object-cover w-full h-full rounded-xl"
                  />
                </div>
              </div>
            ) : (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-[#8F6302] to-[#D4AF37] rounded-2xl blur opacity-25"></div>
                <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-xl p-12 border border-[#8F630233] text-center">
                  <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#8F6302] to-[#D4AF37] rounded-full flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-besley text-primary mb-2">
                    Event Flyer
                  </h3>
                  <p className="text-secondary">Coming Soon</p>
                </div>
              </div>
            )}

            {/* Event Details Card */}
            <div className="bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-xl p-8 border border-[#8F630233] space-y-6">
              <div className="text-center">
                <h1 className="text-4xl lg:text-5xl font-besley font-bold text-primary mb-4 leading-tight">
                  {event.title}
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-[#8F6302] to-[#D4AF37] mx-auto rounded-full"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#8F630220]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#8F6302] to-[#D4AF37] rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-secondary uppercase tracking-wide">
                        Date
                      </p>
                      <p className="text-primary font-semibold">
                        {formatDate(event.date)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#8F630220]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#8F6302] to-[#D4AF37] rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-secondary uppercase tracking-wide">
                        Time
                      </p>
                      <p className="text-primary font-semibold">{event.time}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[#0A0A0A] rounded-lg p-4 border border-[#8F630220]">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#8F6302] to-[#D4AF37] rounded-lg flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-secondary uppercase tracking-wide">
                        Venue
                      </p>
                      <p className="text-primary font-semibold">
                        {event.venue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-[#8F630210] to-[#D4AF3710] rounded-lg p-4 border border-[#8F630230]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-secondary text-sm">Available Spots</p>
                    <p className="text-2xl font-bold text-primary">
                      {event.availableSpots}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-secondary text-sm">Total Capacity</p>
                    <p className="text-lg text-primary">{event.capacity}</p>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="w-full bg-[#0A0A0A] rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#8F6302] to-[#D4AF37] h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${
                          ((event.capacity - event.availableSpots) /
                            event.capacity) *
                          100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {event.description && (
                <div className="bg-[#0A0A0A] rounded-lg p-6 border border-[#8F630220]">
                  <h3 className="text-lg font-semibold text-primary mb-3">
                    About This Event
                  </h3>
                  <p className="text-secondary leading-relaxed">
                    {event.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Registration Form Section */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#8F6302] to-[#D4AF37] rounded-2xl blur opacity-20"></div>
              <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#2A2A2A] rounded-xl p-8 border border-[#8F630233]">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-besley font-bold text-primary mb-2">
                    Register Now
                  </h2>
                  <p className="text-secondary">
                    Secure your spot at this amazing event
                  </p>
                  <div className="w-16 h-1 bg-gradient-to-r from-[#8F6302] to-[#D4AF37] mx-auto mt-4 rounded-full"></div>
                </div>

                {registrationError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <svg
                        className="w-5 h-5 text-red-400 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p className="text-red-400">{registrationError}</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary uppercase tracking-wide">
                        First Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Enter your first name"
                          className={`w-full px-4 py-4 bg-[#0A0A0A] border rounded-lg font-archivo text-primary placeholder-secondary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8F6302]/50 ${
                            validationErrors.firstName
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-[#8F630230] focus:border-[#8F6302] hover:border-[#8F630250]"
                          }`}
                        />
                        {validationErrors.firstName && (
                          <div className="absolute -bottom-6 left-0 flex items-center space-x-1">
                            <svg
                              className="w-4 h-4 text-red-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-red-400 text-sm">
                              {validationErrors.firstName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary uppercase tracking-wide">
                        Last Name *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          placeholder="Enter your last name"
                          className={`w-full px-4 py-4 bg-[#0A0A0A] border rounded-lg font-archivo text-primary placeholder-secondary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8F6302]/50 ${
                            validationErrors.lastName
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-[#8F630230] focus:border-[#8F6302] hover:border-[#8F630250]"
                          }`}
                        />
                        {validationErrors.lastName && (
                          <div className="absolute -bottom-6 left-0 flex items-center space-x-1">
                            <svg
                              className="w-4 h-4 text-red-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-red-400 text-sm">
                              {validationErrors.lastName}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary uppercase tracking-wide">
                        Email Address *
                      </label>
                      <div className="relative">
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your.email@example.com"
                          className={`w-full px-4 py-4 bg-[#0A0A0A] border rounded-lg font-archivo text-primary placeholder-secondary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8F6302]/50 ${
                            validationErrors.email
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-[#8F630230] focus:border-[#8F6302] hover:border-[#8F630250]"
                          }`}
                        />
                        {validationErrors.email && (
                          <div className="absolute -bottom-6 left-0 flex items-center space-x-1">
                            <svg
                              className="w-4 h-4 text-red-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-red-400 text-sm">
                              {validationErrors.email}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary uppercase tracking-wide">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+1 (555) 123-4567"
                          className={`w-full px-4 py-4 bg-[#0A0A0A] border rounded-lg font-archivo text-primary placeholder-secondary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8F6302]/50 ${
                            validationErrors.phone
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-[#8F630230] focus:border-[#8F6302] hover:border-[#8F630250]"
                          }`}
                        />
                        {validationErrors.phone && (
                          <div className="absolute -bottom-6 left-0 flex items-center space-x-1">
                            <svg
                              className="w-4 h-4 text-red-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-red-400 text-sm">
                              {validationErrors.phone}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-sm font-medium text-primary uppercase tracking-wide">
                      Current Status *
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <div
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                          formData.status === "STUDENT"
                            ? "border-[#8F6302] bg-[#8F630210]"
                            : "border-[#8F630230] bg-[#0A0A0A] hover:border-[#8F630250]"
                        }`}
                        onClick={() => handleStudentStatusChange("STUDENT")}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.status === "STUDENT"
                                ? "border-[#8F6302] bg-[#8F6302]"
                                : "border-[#8F630250]"
                            }`}
                          >
                            {formData.status === "STUDENT" && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-primary">Student</p>
                            <p className="text-sm text-secondary">
                              Currently enrolled
                            </p>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`relative cursor-pointer rounded-lg border-2 p-4 transition-all duration-200 ${
                          formData.status === "GRADUATE"
                            ? "border-[#8F6302] bg-[#8F630210]"
                            : "border-[#8F630230] bg-[#0A0A0A] hover:border-[#8F630250]"
                        }`}
                        onClick={() => handleStudentStatusChange("GRADUATE")}
                      >
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              formData.status === "GRADUATE"
                                ? "border-[#8F6302] bg-[#8F6302]"
                                : "border-[#8F630250]"
                            }`}
                          >
                            {formData.status === "GRADUATE" && (
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-primary">Graduate</p>
                            <p className="text-sm text-secondary">
                              Already graduated
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {formData.status === "STUDENT" && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-primary uppercase tracking-wide">
                        Course of Study *
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="course"
                          value={formData.course}
                          onChange={handleInputChange}
                          placeholder="e.g., Computer Science, Engineering, Business"
                          className={`w-full px-4 py-4 bg-[#0A0A0A] border rounded-lg font-archivo text-primary placeholder-secondary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8F6302]/50 ${
                            validationErrors.course
                              ? "border-red-500/50 focus:border-red-500"
                              : "border-[#8F630230] focus:border-[#8F6302] hover:border-[#8F630250]"
                          }`}
                        />
                        {validationErrors.course && (
                          <div className="absolute -bottom-6 left-0 flex items-center space-x-1">
                            <svg
                              className="w-4 h-4 text-red-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-red-400 text-sm">
                              {validationErrors.course}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary uppercase tracking-wide">
                      Area of Interest *
                    </label>
                    <div className="relative">
                      <select
                        name="areaOfInterest"
                        value={formData.areaOfInterest}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-4 bg-[#0A0A0A] border rounded-lg font-archivo text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8F6302]/50 appearance-none cursor-pointer ${
                          validationErrors.areaOfInterest
                            ? "border-red-500/50 focus:border-red-500"
                            : "border-[#8F630230] focus:border-[#8F6302] hover:border-[#8F630250]"
                        }`}
                      >
                        <option value="" disabled className="text-secondary">
                          Select your area of interest
                        </option>
                        <option value="Software Engineering">
                          Software Engineering
                        </option>
                        <option value="DevOps">DevOps</option>
                        <option value="Product Management">
                          Product Management
                        </option>
                        <option value="Software Testing">
                          Software Testing
                        </option>
                        <option value="UI/UX Design">UI/UX Design</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-secondary"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      {validationErrors.areaOfInterest && (
                        <div className="absolute -bottom-6 left-0 flex items-center space-x-1">
                          <svg
                            className="w-4 h-4 text-red-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-red-400 text-sm">
                            {validationErrors.areaOfInterest}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-primary uppercase tracking-wide">
                      Expectations from Event
                      <span className="text-secondary text-xs ml-2">
                        (Optional)
                      </span>
                    </label>
                    <textarea
                      name="expectations"
                      value={formData.expectations}
                      onChange={handleInputChange}
                      placeholder="Tell us what you hope to gain from this event..."
                      rows={4}
                      className="w-full px-4 py-4 bg-[#0A0A0A] border border-[#8F630230] rounded-lg font-archivo text-primary placeholder-secondary/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#8F6302]/50 focus:border-[#8F6302] hover:border-[#8F630250] resize-none"
                    />
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={registrationLoading}
                      className="w-full relative group bg-gradient-to-r from-[#8F6302] to-[#D4AF37] text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:from-[#A67503] hover:to-[#E5C048] disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8F6302] to-[#D4AF37] rounded-lg blur opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-center space-x-3">
                        {registrationLoading ? (
                          <>
                            <svg
                              className="animate-spin w-5 h-5"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            <span>Registering...</span>
                          </>
                        ) : (
                          <>
                            <span>Register for Event</span>
                            <svg
                              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterEventForm;
