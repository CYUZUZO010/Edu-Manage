"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Shield,
  GraduationCap,
  UserCheck,
  UserPlus,
  LogIn,
} from "lucide-react";
import Link from "next/link";

import AdminUsers from "./admin-user";
import Teacher from "./teacher";
import Dashboard from "./student-page";

type UserRole = "ADMIN" | "TEACHER" | "STUDENT" | null;

interface UserType {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export default function HomePage() {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [showLogin, setShowLogin] = useState(false);

  const mockUsers = [
    {
      id: "1",
      name: "Cyuzuzo Sandra",
      email: "sandracyuzuzo14@gmail.com",
      role: "ADMIN" as UserRole,
    },
    {
      id: "2",
      name: "HIRWA Ian",
      email: "Hirwaian14@gmail.com",
      role: "TEACHER" as UserRole,
    },
    {
      id: "3",
      name: "SUGIRA Cedrick",
      email: "cedrick@gmail.com",
      role: "STUDENT" as UserRole,
    },
  ];

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setShowLogin(false);
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return <Shield className="w-5 h-5" />;
      case "TEACHER":
        return <UserCheck className="w-5 h-5" />;
      case "STUDENT":
        return <GraduationCap className="w-5 h-5" />;
      default:
        return <User className="w-5 h-5" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "TEACHER":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "STUDENT":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // If user is logged in, show their dashboard
  if (currentUser) {
    return (
      <div>
        <div className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">
                  {currentUser.name}
                </h2>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={`${getRoleBadgeColor(
                      currentUser.role
                    )} flex items-center space-x-1`}
                  >
                    {getRoleIcon(currentUser.role)}
                    <span>{currentUser.role}</span>
                  </Badge>
                </div>
              </div>
            </div>
            <Button onClick={handleLogout} variant="outline">
              Logout
            </Button>
          </div>
        </div>

        {currentUser.role === "ADMIN" && <AdminUsers />}
        {currentUser.role === "TEACHER" && <Teacher />}
        {currentUser.role === "STUDENT" && <Dashboard />}
      </div>
    );
  }

  // Landing page with navigation
  if (!showLogin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Navigation Bar */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
          <div className="max-w-6xl mx-auto px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  SMS
                </div>
                <h1 className="text-xl font-bold text-slate-800">
                  School Management
                </h1>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  onClick={() => setShowLogin(true)}
                  className="flex items-center space-x-2 bg-slate-600 hover:cursor-pointer"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Button>
                <Link href="/signup">
                  <Button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700">
                    <UserPlus className="w-4 h-4" />
                    <span>Sign Up</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="flex items-center justify-center px-8 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl font-bold text-slate-800 mb-4">
                Welcome to School Management System
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                A comprehensive platform for students, teachers, and
                administrators to manage academic activities efficiently.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-white/80 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    For Students
                  </h3>
                  <p className="text-slate-600">
                    Access course materials, download files, track progress, and
                    stay updated with assignments.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <UserCheck className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    For Teachers
                  </h3>
                  <p className="text-slate-600">
                    Manage subjects, upload assignments, track student progress,
                    and organize classes.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm border border-white/30 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                    <Shield className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    For Admins
                  </h3>
                  <p className="text-slate-600">
                    Oversee user management, monitor system activities, and
                    maintain platform security.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Call to Action */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-4">
                <Button
                  size="lg"
                  onClick={() => setShowLogin(true)}
                  className="bg-slate-800 hover:bg-slate-900 text-white px-8 py-3"
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Login to Your Account
                </Button>
                <Link href="/signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-8 py-3"
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Create New Account
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-slate-500">
                New to our platform? Sign up to get started with your academic
                journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Login page
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navigation Bar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-6xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                SMS
              </div>
              <h1 className="text-xl font-bold text-slate-800">
                School Management
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                className="cursor-pointer"
                onClick={() => setShowLogin(false)}
              >
                ← Back to Home
              </Button>
              <Link href="/signup">
                <Button className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700">
                  <UserPlus className="w-4 h-4" />
                  <span>Sign Up</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Login Section */}
      <div className="flex items-center justify-center px-8 py-16">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-600">Choose your account to continue</p>
          </div>

          <div className="space-y-4">
            {mockUsers.map((user) => (
              <Card
                key={user.id}
                className="cursor-pointer hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white/90"
                onClick={() => handleLogin(user)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-800">
                        {user.name}
                      </h3>
                      <p className="text-sm text-slate-600">{user.email}</p>
                    </div>
                    <Badge
                      className={`${getRoleBadgeColor(
                        user.role
                      )} flex items-center space-x-1`}
                    >
                      {getRoleIcon(user.role)}
                      <span>{user.role}</span>
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-indigo-600 hover:text-indigo-700 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
