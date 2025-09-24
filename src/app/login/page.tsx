"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, ArrowLeft, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "", // Added name field
    email: "",
    password: "",
    role: "student", // Added role field with default
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to login");
      }

      // Redirect based on user role
      const { user } = data;
      switch (user.role) {
        case "admin":
          router.push("../admin");
          break;
        case "teacher":
          router.push("../teacher");
          break;
        case "student":
          router.push("../student");
          break;
        default:
          router.push("/");
      }
    } catch (err) {
      setIsSubmitting(false);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                SMS
              </div>
              <h1 className="text-xl font-bold text-slate-800">
                School Management
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button className="bg-slate-300 hover:bg-slate-400 cursor-pointer">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Form */}
      <div className="flex items-center justify-center px-8 py-16">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-white/40 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <LogIn className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Welcome Back
            </CardTitle>
            <p className="text-slate-600">Sign in to your account</p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center text-red-800">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
                  placeholder="Enter your password"
                  disabled={isSubmitting}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-slate-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    href="#"
                    className="text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-slate-800 hover:bg-slate-700 cursor-pointer text-white py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-indigo-600 hover:text-indigo-700 font-medium hover:cursor-pointer"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
