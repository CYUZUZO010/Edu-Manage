"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Users, UserCheck, GraduationCap, Shield } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createAt: string;
}

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          id: "1",
          name: "Cyuzuzo Sandra",
          email: "sandracyuzuzo14@gmail.com",
          role: "ADMIN",
          createAt: "2024-03-15T10:30:00Z",
        },
        {
          id: "2",
          name: "SUGIRA Cedrick",
          email: "cedrick@gmail.com",
          role: "STUDENT",
          createAt: "2024-02-15T10:20:002",
        },
        {
          id: "3",
          name: "HIRWA Ian",
          email: "Hirwaian14@gmail.com",
          role: "TEACHER",
          createAt: "2024-04-15T10:30:002",
        },
        {
          id: "4",
          name: "ISHIMWE Briella",
          email: "ishimwebriella@gmail.com",
          role: "STUDENT",
          createAt: "2024-06-15T10:30:002",
        },
        {
          id: "5",
          name: "KEZA Audrey",
          email: "kezaaudrey@gmail.com",
          role: "STUDENT",
          createAt: "2024-04-15T10:35:002",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800 border-purple-200 hover:bg-purple-200";
      case "TEACHER":
        return "bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-200";
      case "STUDENT":
        return "bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "ADMIN":
        return <Shield className="w-4 h-4" />;
      case "TEACHER":
        return <UserCheck className="w-4 h-4" />;
      case "STUDENT":
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <Users className="w-4 h-4" />;
    }
  };

  const getStatCardColors = (role: string) => {
    switch (role) {
      case "total":
        return "bg-gradient-to-br from-slate-50 to-slate-100 border-slate-200";
      case "students":
        return "bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200";
      case "teachers":
        return "bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200";
      case "admins":
        return "bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200";
      default:
        return "bg-white";
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchItem.toLowerCase()) ||
      user.email.toLowerCase().includes(searchItem.toLowerCase()) ||
      user.role.toLowerCase().includes(searchItem.toLowerCase())
  );

  const roleStats = {
    total: users.length,
    students: users.filter((u) => u.role === "STUDENT").length,
    teachers: users.filter((u) => u.role === "TEACHER").length,
    admins: users.filter((u) => u.role === "ADMIN").length,
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-white rounded-lg shadow-md"
                ></div>
              ))}
            </div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-32 bg-white rounded-lg shadow-md"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Admin Dashboard
          </h1>
          <p className="text-slate-600">
            Manage and view all registered users in the system
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card
            className={`${getStatCardColors(
              "total"
            )} hover:shadow-lg transition-all duration-300 cursor-pointer border`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-600">
                    Total Users
                  </p>
                  <p className="text-2xl font-bold text-slate-800">
                    {roleStats.total}
                  </p>
                </div>
                <Users className="w-8 h-8 text-slate-500" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`${getStatCardColors(
              "students"
            )} hover:shadow-lg transition-all duration-300 cursor-pointer border`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-emerald-700">
                    Students
                  </p>
                  <p className="text-2xl font-bold text-emerald-800">
                    {roleStats.students}
                  </p>
                </div>
                <GraduationCap className="w-8 h-8 text-emerald-600" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`${getStatCardColors(
              "teachers"
            )} hover:shadow-lg transition-all duration-300 cursor-pointer border`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Teachers</p>
                  <p className="text-2xl font-bold text-blue-800">
                    {roleStats.teachers}
                  </p>
                </div>
                <UserCheck className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card
            className={`${getStatCardColors(
              "admins"
            )} hover:shadow-lg transition-all duration-300 cursor-pointer border`}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Admins</p>
                  <p className="text-2xl font-bold text-purple-800">
                    {roleStats.admins}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6 bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search users by name, email, or role..."
                value={searchItem}
                onChange={(e) => setSearchItem(e.target.value)}
                className="pl-10 bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4 mb-0">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white/90"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-md">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">
                        {user.name}
                      </h3>
                      <p className="text-slate-600">{user.email}</p>
                      <p className="text-sm text-slate-500">
                        Registered:{" "}
                        {new Date(user.createAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      className={`${getRoleBadgeColor(
                        user.role
                      )} flex items-center space-x-1 transition-colors duration-200`}
                    >
                      {getRoleIcon(user.role)}
                      <span>{user.role}</span>
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>User ID: {user.id}</span>
                    <span>Last active: 2 hours ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredUsers.length === 0 && !loading && (
            <Card className="bg-white/80 backdrop-blur-sm border border-white/30">
              <CardContent className="text-center py-12">
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-800 mb-2">
                  No users found
                </h3>
                <p className="text-slate-600">
                  {searchItem
                    ? "Try adjusting your search terms"
                    : "No users have been registered yet"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
