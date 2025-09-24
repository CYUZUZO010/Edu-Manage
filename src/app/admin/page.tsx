"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Users,
  UserCheck,
  GraduationCap,
  Shield,
  LogOut,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createAt?: string;
}

export default function AdminUsers() {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        console.log("Fetched users:", data.users);
        setUsers(data.users);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    [user.name, user.email, user.role.toUpperCase()]
      .join(" ")
      .toLowerCase()
      .includes(searchItem.toLowerCase())
  );

  const roleStats = {
    total: users.length,
    students: users.filter((u) => u.role.toUpperCase() === "STUDENT").length,
    teachers: users.filter((u) => u.role.toUpperCase() === "TEACHER").length,
    admins: users.filter((u) => u.role.toUpperCase() === "ADMIN").length,
  };

  const getRoleIcon = (role: string) => {
    switch (role.toUpperCase()) {
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
        return "bg-slate-100 border-slate-300";
      case "students":
        return "bg-emerald-100 border-emerald-300";
      case "teachers":
        return "bg-blue-100 border-blue-300";
      case "admins":
        return "bg-purple-100 border-purple-300";
      default:
        return "bg-white";
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toUpperCase()) {
      case "ADMIN":
        return "bg-purple-100 text-purple-800";
      case "TEACHER":
        return "bg-blue-100 text-blue-800";
      case "STUDENT":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-6xl mx-auto gap-3">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              SMS
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Admin Dashboard
            </h1>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="whitespace-nowrap"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">
          Welcome Back, Admin
        </h2>
        <p className="text-center text-slate-600 mb-8">
          Manage and view all registered users in the system
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Total",
              value: roleStats.total,
              icon: <Users />,
              key: "total",
            },
            {
              label: "Students",
              value: roleStats.students,
              icon: <GraduationCap />,
              key: "students",
            },
            {
              label: "Teachers",
              value: roleStats.teachers,
              icon: <UserCheck />,
              key: "teachers",
            },
            {
              label: "Admins",
              value: roleStats.admins,
              icon: <Shield />,
              key: "admins",
            },
          ].map(({ label, value, icon, key }) => {
            const textColor = {
              total: "text-slate-700",
              students: "text-emerald-700",
              teachers: "text-blue-700",
              admins: "text-purple-700",
            }[key];

            return (
              <Card
                key={key}
                className={`${getStatCardColors(
                  key
                )} p-4 border rounded-lg flex items-center justify-between`}
              >
                <div>
                  <p className="text-sm font-medium text-gray-600">{label}</p>
                  <p className={`text-2xl font-extrabold ${textColor}`}>
                    {value}
                  </p>
                </div>
                <div className="text-gray-500">{icon}</div>
              </Card>
            );
          })}
        </div>

        {/* Search */}
        <Card className="mb-6 bg-white shadow-md">
          <CardContent className="relative p-4">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search users by name, email, or role..."
              className="pl-12"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
          </CardContent>
        </Card>

        {/* User List */}
        {loading ? (
          <p className="text-center text-gray-600">Loading users...</p>
        ) : filteredUsers.length === 0 ? (
          <p className="text-center text-gray-600">No users found.</p>
        ) : (
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <Card
                key={user.id}
                className="bg-white shadow-md rounded-lg"
                tabIndex={0}
              >
                <CardContent className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                  <div className="flex items-start sm:items-center space-x-4 flex-1 min-w-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="truncate min-w-0">
                      <h3 className="text-lg font-semibold text-slate-800 truncate">
                        {user.name}
                      </h3>
                      <p className="text-slate-600 text-sm truncate">
                        {user.email}
                      </p>
                      <p className="text-slate-500 text-sm">
                        Registered:{" "}
                        {user.createAt
                          ? new Date(user.createAt).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 shrink-0">
                    <Badge
                      className={`${getRoleBadgeColor(
                        user.role
                      )} px-2 py-1 flex items-center space-x-1 whitespace-nowrap`}
                    >
                      {getRoleIcon(user.role)}
                      <span>{user.role.toUpperCase()}</span>
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      className="whitespace-nowrap"
                    >
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
