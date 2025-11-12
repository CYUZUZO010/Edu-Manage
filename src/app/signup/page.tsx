"use client";
import { useState } from "react";
import type React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student", 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send data to your API endpoint
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to register user");
      }

      // Registration successful
      console.log("User registered successfully:", data);
      setIsSubmitting(false);
      setIsSuccess(true);

      
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "student",
        });
        router.push("/login"); // Redirect to login page
      }, 2000);
    } catch (err) {
      setIsSubmitting(false);
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      console.error("Registration error:", err);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isSuccess) {
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
                  <Button variant="ghost">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Success Message */}
        <div className="flex items-center justify-center px-8 py-16">
          <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-white/40 shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                Account Created Successfully!
              </h2>
              <p className="text-slate-600 mb-6">
                Your account has been created. You can now login with your
                credentials.
              </p>
              <Link href="/">
                <Button className="w-full bg-slate-800 hover:bg-slate-900">
                  Go to Login
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
              <Link href="/login">
                <Button variant="ghost">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Signup Form */}
      <div className="flex items-center justify-center px-8 py-16">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm border border-white/40 shadow-lg">
          <CardHeader className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
              <UserPlus className="w-6 h-6" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-800">
              Create Account
            </CardTitle>
            <p className="text-slate-600">Join our school management system</p>
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
                  htmlFor="name"
                  className="text-sm font-medium text-slate-700"
                >
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-slate-700"
                >
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="role"
                  className="text-sm font-medium text-slate-700"
                >
                  Role
                </label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => handleInputChange("role", value)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger className="w-full bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-slate-900">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200">
                    <SelectItem
                      value="student"
                      className="text-slate-900 hover:bg-slate-50"
                    >
                      Student
                    </SelectItem>
                    <SelectItem
                      value="teacher"
                      className="text-slate-900 hover:bg-slate-50"
                    >
                      Teacher
                    </SelectItem>
                    <SelectItem
                      value="admin"
                      className="text-slate-900 hover:bg-slate-50"
                    >
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  placeholder="Create a password"
                  required
                  disabled={isSubmitting}
                  className="w-full bg-white border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full mt-6 bg-slate-800 hover:bg-slate-700 cursor-pointer text-white py-3"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/"
                  className="text-indigo-600 hover:text-indigo-700 font-medium"
                >
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
