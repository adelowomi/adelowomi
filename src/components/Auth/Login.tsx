/* eslint-disable react/no-unknown-property */
"use client";

import React, { useState } from "react";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { ArrowIcon, PasswordViewIcon } from "@/icons";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { login } = useAuth();

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);

      if (result.success) {
        // Small delay to ensure session is updated, then redirect
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
        }, 500);
      } else {
        setError(result.error || "Login failed");
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[bg-surface] border-[#8F630233] border-[0.5px] border-solid rounded-lg flex flex-col gap-20 pt-20 px-32 pb-32 mx-auto my-0 w-[886px]">
      <div className="flex flex-col items-center">
        <h2 className="text-primary font-besley text-[40px] font-semibold text-center">
          LOG IN
        </h2>
        <hr className="horizontal-line" />
      </div>
      <div>
        <form onSubmit={loginUser}>
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex flex-col mb-4">
            <label className="text-[16px] font-medium font-archivo text-primary">
              Email
            </label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              className="rounded-lg bg-[bg-surface] mt-2 py-5 px-4 flex items-center w-full border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-gray-900 placeholder:text-[#FCFCFC80] text-[16px] font-normal disabled:opacity-50"
              required
            />
          </div>

          <div className="flex flex-col mb-8 relative">
            <label className="text-[16px] font-medium font-archivo text-primary">
              Password
            </label>
            <input
              type={isVisible ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
              className="rounded-lg bg-[bg-surface] mt-2 py-5 px-4 w-full border-[0.5px] border-solid border-[#FCFCFC33] font-archivo text-gray-900 placeholder:text-[#FCFCFC80] text-[16px] font-normal pr-10 disabled:opacity-50"
              required
            />
            <button
              type="button"
              onClick={toggleVisibility}
              disabled={isLoading}
              className="absolute top-16 right-3 text-primary focus:outline-none disabled:opacity-50"
            >
              {isVisible ? <PasswordViewIcon /> : <PasswordViewIcon />}
            </button>
          </div>

          <h2 className="text-right text-primary text-[16px] font-normal font-archivo">
            Forgot password?
          </h2>
          <div className="mt-8">
            <Button
              text={isLoading ? "Logging in..." : "Log In"}
              svg={<ArrowIcon />}
              width="w-full"
              type="submit"
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
