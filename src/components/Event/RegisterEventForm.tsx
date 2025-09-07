"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import CheckBox from "../ui/CheckBox";
import { SendIcon } from "@/icons";
import { useEvent } from "@/hooks/useEvents";
import { useRegistration, RegistrationData } from "@/hooks/useRegistration";
import { useRouter } from "next/navigation";

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

  const [formData, setFormData] = useState<RegistrationData>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isStudent: false,
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

  const handleStudentStatusChange = (isStudent: boolean) => {
    setFormData((prev) => ({
      ...prev,
      isStudent,
    }));
  };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";
    if (!formData.phoneNumber.trim())
      errors.phoneNumber = "Phone number is required";
    if (!formData.areaOfInterest)
      errors.areaOfInterest = "Area of interest is required";
    if (!formData.expectations.trim())
      errors.expectations = "Expectations are required";

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await registerForEvent(eventId, formData);
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
    <div className="flex justify-center items-center">
      <div className="bg-[bg-surface] rounded-lg py-16 px-24 border-[0.5px] border-solid border-[#8F630233]">
        <div className="flex flex-col gap-16">
          <div className="flex flex-col gap-10 items-center">
            <div className="flex flex-col gap-2">
              <h2 className="text-primary text-[40px] font-semibold font-besley">
                {event.title.toUpperCase()}
              </h2>
              <hr className="horizontal-line" />
            </div>
            <div className="flex flex-row gap-8 justify-center">
              <span className="text-primary font-archivo text-2xl font-normal">
                Date: {formatDate(event.date)}
              </span>
              <span className="text-primary font-archivo text-2xl font-normal">
                Time: {event.time}
              </span>
              <span className="text-primary font-archivo text-2xl font-normal">
                Venue: {event.venue}
              </span>
            </div>
            <div className="text-center">
              <p className="text-secondary font-archivo text-lg">
                {event.availableSpots} spots remaining
              </p>
            </div>
          </div>

          {registrationError && (
            <div className="bg-red-500/10 border border-red-500 rounded-lg p-4">
              <p className="text-red-500 text-center">{registrationError}</p>
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 items-center w-[872px]"
          >
            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-[16px] font-medium font-archivo text-primary">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="First name"
                  className={`rounded-lg bg-[bg-surface] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid ${
                    validationErrors.firstName
                      ? "border-red-500"
                      : "border-[#FCFCFC33]"
                  } font-archivo text-primary text-[16px]`}
                />
                {validationErrors.firstName && (
                  <span className="text-red-500 text-sm">
                    {validationErrors.firstName}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-medium font-archivo text-primary">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Last name"
                  className={`rounded-lg bg-[bg-surface] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid ${
                    validationErrors.lastName
                      ? "border-red-500"
                      : "border-[#FCFCFC33]"
                  } font-archivo text-primary text-[16px]`}
                />
                {validationErrors.lastName && (
                  <span className="text-red-500 text-sm">
                    {validationErrors.lastName}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-lg font-medium font-archivo text-primary">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address"
                  className={`rounded-lg bg-[bg-surface] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid ${
                    validationErrors.email
                      ? "border-red-500"
                      : "border-[#FCFCFC33]"
                  } font-archivo text-primary text-[16px]`}
                />
                {validationErrors.email && (
                  <span className="text-red-500 text-sm">
                    {validationErrors.email}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-lg font-medium font-archivo text-primary">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Phone number"
                  className={`rounded-lg bg-[bg-surface] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid ${
                    validationErrors.phoneNumber
                      ? "border-red-500"
                      : "border-[#FCFCFC33]"
                  } font-archivo text-primary text-[16px]`}
                />
                {validationErrors.phoneNumber && (
                  <span className="text-red-500 text-sm">
                    {validationErrors.phoneNumber}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-1 self-start">
              <label className="text-lg font-medium font-archivo text-primary">
                Are you a student or a graduate?
              </label>
              <div className="flex flex-row gap-10">
                <span className="flex flex-row gap-2 items-center">
                  <CheckBox
                    checked={formData.isStudent}
                    onChange={() => handleStudentStatusChange(true)}
                  />
                  <span className="text-primary font-archivo">Student</span>
                </span>

                <span className="flex flex-row gap-2 items-center">
                  <CheckBox
                    checked={!formData.isStudent}
                    onChange={() => handleStudentStatusChange(false)}
                  />
                  <span className="text-primary font-archivo">Graduate</span>
                </span>
              </div>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-1">
                <label className="text-lg font-medium font-archivo text-primary">
                  Area of Interest
                </label>
                <select
                  name="areaOfInterest"
                  value={formData.areaOfInterest}
                  onChange={handleInputChange}
                  className={`rounded-lg bg-[bg-surface] mt-1 py-5 px-4 flex items-center w-[426px] border-[0.5px] border-solid ${
                    validationErrors.areaOfInterest
                      ? "border-red-500"
                      : "border-[#FCFCFC33]"
                  } font-archivo text-primary text-[16px]`}
                >
                  <option value="" disabled>
                    Select area of interest
                  </option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="DevOps">DevOps</option>
                  <option value="Product Management">Product Management</option>
                  <option value="Software Testing">Software Testing</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                </select>
                {validationErrors.areaOfInterest && (
                  <span className="text-red-500 text-sm">
                    {validationErrors.areaOfInterest}
                  </span>
                )}
              </div>
              <div className="w-[426px]"></div>
            </div>

            <div className="flex flex-col w-[876px]">
              <label className="text-lg font-medium font-archivo text-primary">
                Expectation from Event
              </label>
              <textarea
                name="expectations"
                value={formData.expectations}
                onChange={handleInputChange}
                placeholder="Type your expectations here"
                className={`rounded-lg h-[100px] bg-[bg-surface] mt-1 py-2 px-2 flex items-start w-full border-[0.5px] border-solid ${
                  validationErrors.expectations
                    ? "border-red-500"
                    : "border-[#FCFCFC33]"
                } font-archivo text-primary text-[16px] resize-none`}
              />
              {validationErrors.expectations && (
                <span className="text-red-500 text-sm">
                  {validationErrors.expectations}
                </span>
              )}
            </div>

            <div className="my-4 self-start">
              <Button
                text={registrationLoading ? "Registering..." : "Register Now"}
                svg={<SendIcon />}
                width="w-[250px]"
                disabled={registrationLoading}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterEventForm;
