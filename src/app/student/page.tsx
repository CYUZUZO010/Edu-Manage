"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "@/src/components/ui/user-toast";
import { useRouter } from "next/navigation"; // ✅ Correct import for App Router
import { LogOut } from "lucide-react";
import {
  BookOpen,
  Download,
  FileText,
  Calendar,
  Search,
  LucideFile,
  RefreshCw,
  ExternalLink,
} from "lucide-react";
import { FileStorage } from "@/lib/file-storage";

interface Subject {
  id: string;
  name: string;
  code: string;
  teacher: string;
  color: string;
  progress: number;
  files: CourseFile[];
}

interface CourseFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  category: "lecture" | "assignment" | "resource";
  url?: string;
}

export default function StudentDashboard() {
  const router = useRouter();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [searchItem, setSearchItem] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: "1",
      name: "Mathematics",
      code: "MATH101",
      teacher: "Dr. HIRWA Ian",
      color: "bg-blue-500",
      progress: 75,
      files: [],
    },
    {
      id: "2",
      name: "Physics",
      code: "PHYS201",
      teacher: "Prof. UWIMANA Marie",
      color: "bg-purple-500",
      progress: 60,
      files: [],
    },
    {
      id: "3",
      name: "Geography",
      code: "GE301",
      teacher: "Dr. MUKAMANA Alice",
      color: "bg-emerald-500",
      progress: 75,
      files: [],
    },
    {
      id: "4",
      name: "History and Citizenship",
      code: "HE601",
      teacher: "Ms. INGABIRE Grace",
      color: "bg-slate-500",
      progress: 45,
      files: [],
    },
    {
      id: "5",
      name: "Biology",
      code: "BI301",
      teacher: "Ms. INGABIRE Grace",
      color: "bg-yellow-500",
      progress: 55,
      files: [],
    },
    {
      id: "6",
      name: "Chemistry",
      code: "CH843",
      teacher: "Ms. INGABIRE Grace",
      color: "bg-red-400",
      progress: 65,
      files: [],
    },
  ]);
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout Error:", error);
      router.push("/login");
    }
  };

  const fetchFiles = async (subjectId: string) => {
    try {
      setLoading(true);

      // Get files from localStorage (simulating database)
      const files = FileStorage.getFilesBySubject(subjectId);

      setSubjects((prev) =>
        prev.map((subject) =>
          subject.id === subjectId ? { ...subject, files: files } : subject
        )
      );

      // Also try to fetch from API for any server-side files
      const response = await fetch(`/api/files/${subjectId}`);
      if (response.ok) {
        // const data = await response.json()
        // Merge with localStorage files if needed
      }
    } catch (error) {
      console.error("Error fetching files:", error);
      toast({
        title: "Error",
        description: "Failed to load files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectSelect = (subjectId: string) => {
    setSelectedSubject(subjectId);
    fetchFiles(subjectId);
  };

  const handleDownload = async (file: CourseFile) => {
    if (file.url) {
      try {
        // Open the file in a new tab for download
        window.open(file.url, "_blank");
        toast({
          title: "Download Started",
          description: `Downloading ${file.name}`,
        });
      } catch (error) {
        console.error("Download error:", error);
        toast({
          title: "Download Failed",
          description: "There was an error downloading the file.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "File Not Available",
        description: "This file is not available for download.",
        variant: "destructive",
      });
    }
  };

  const refreshFiles = () => {
    if (selectedSubject) {
      fetchFiles(selectedSubject);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "lecture":
        return "bg-blue-100 text-blue-800";
      case "assignment":
        return "bg-red-100 text-red-800";
      case "resource":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return "📄";
      case "docx":
      case "doc":
        return "📝";
      case "pptx":
      case "ppt":
        return "📊";
      case "zip":
        return "🗜️";
      case "jpg":
      case "jpeg":
      case "png":
        return "🖼️";
      default:
        return "📁";
    }
  };

  const selectedSubjectData = subjects.find((s) => s.id === selectedSubject);
  const filteredFiles = selectedSubjectData?.files.filter((file) =>
    file.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  useEffect(() => {
    // Update file counts for all subjects
    setSubjects((prev) =>
      prev.map((subject) => ({
        ...subject,
        files: FileStorage.getFilesBySubject(subject.id),
      }))
    );
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      {/* Header with Logout */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-gradient-to-br  from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                SMS
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Student Dashboard
                </h1>
              </div>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2 hover:cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>
      <p className="text-3xl font-bold text-slate-900 text-center pt-6">
        Welcome back, Student
      </p>
      <div className="p-7">
        <div className="max-w-6xl mx-auto">
          {!selectedSubject ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-blue-700">
                          Enrolled Subjects
                        </p>
                        <p className="text-2xl font-bold text-blue-800">
                          {subjects.length}
                        </p>
                      </div>
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-emerald-700">
                          Total Files
                        </p>
                        <p className="text-2xl font-bold text-emerald-800">
                          {subjects.reduce(
                            (acc, subject) => acc + subject.files.length,
                            0
                          )}
                        </p>
                      </div>
                      <FileText className="w-8 h-8 text-emerald-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-purple-700">
                          Avg Progress
                        </p>
                        <p className="text-2xl font-bold text-purple-800">
                          {Math.round(
                            subjects.reduce(
                              (acc, subject) => acc + subject.progress,
                              0
                            ) / subjects.length
                          )}
                          %
                        </p>
                      </div>
                      <Calendar className="w-8 h-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {subjects.map((subject) => (
                  <Card
                    key={subject.id}
                    className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/30 cursor-pointer hover:bg-white/90"
                    onClick={() => handleSubjectSelect(subject.id)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 ${subject.color} rounded-lg flex items-center justify-center text-white font-semibold text-lg`}
                          >
                            {subject.code.substring(0, 2)}
                          </div>
                          <div>
                            <h3 className="font-semibold text-slate-800 text-lg">
                              {subject.name}
                            </h3>
                            <p className="text-sm text-slate-600">
                              {subject.code}
                            </p>
                            <p className="text-xs text-slate-500">
                              {subject.teacher}
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-slate-100 text-slate-800">
                          {subject.files.length} files
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Progress</span>
                          <span className="font-medium text-slate-800">
                            {subject.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${subject.color}`}
                            style={{ width: `${subject.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button className="w-full mt-4" variant="outline">
                        View Materials
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedSubject(null)}
                    className="hover: cursor-pointer"
                  >
                    ← Back to Subjects
                  </Button>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">
                      {selectedSubjectData?.name}
                    </h2>
                    <p className="text-slate-600">
                      {selectedSubjectData?.teacher}
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={refreshFiles}
                  disabled={loading}
                  className="hover:cursor-pointer"
                >
                  <RefreshCw
                    className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
              </div>

              <Card className="mb-6 bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
                <CardContent className="p-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search files..."
                      value={searchItem}
                      onChange={(e) => setSearchItem(e.target.value)}
                      className="pl-10 bg-white/50 border-slate-200 focus:border-blue-400 focus:ring-blue-400"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {loading ? (
                  <Card className="bg-white/80 backdrop-blur-sm border border-white/30">
                    <CardContent className="text-center py-12">
                      <RefreshCw className="w-8 h-8 text-slate-400 mx-auto mb-4 animate-spin" />
                      <h3 className="text-lg font-medium text-slate-800 mb-2">
                        Loading files...
                      </h3>
                      <p className="text-slate-600">
                        Please wait while we fetch the latest files
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredFiles?.map((file) => (
                    <Card
                      key={file.id}
                      className="hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm border border-white/30 hover:bg-white/90"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-2xl">
                              {getFileIcon(file.type)}
                            </div>
                            <div>
                              <h3 className="font-semibold text-slate-800">
                                {file.name}
                              </h3>
                              <div className="flex items-center space-x-4 text-sm text-slate-600">
                                <span>{file.type}</span>
                                <span>{file.size}</span>
                                <span>
                                  Uploaded:{" "}
                                  {new Date(
                                    file.uploadDate
                                  ).toLocaleDateString()}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge className={getCategoryColor(file.category)}>
                              {file.category}
                            </Badge>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                              onClick={() => handleDownload(file)}
                              
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </Button>
                            {file.url && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => window.open(file.url, "_blank")}
                              >
                                <ExternalLink className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}

                {!loading && filteredFiles?.length === 0 && (
                  <Card className="bg-white/80 backdrop-blur-sm border border-white/30">
                    <CardContent className="text-center py-12">
                      <LucideFile className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-slate-800 mb-2">
                        No files found
                      </h3>
                      <p className="text-slate-600">
                        {searchItem
                          ? "Try adjusting your search terms"
                          : "No files have been uploaded yet"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
