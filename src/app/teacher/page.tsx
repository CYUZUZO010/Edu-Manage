"use client";
import type React from "react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/src/components/ui/user-toast";
import {
  BookOpen,
  Users,
  FileText,
  Upload,
  Calendar,
  CheckCircle,
  AlertCircle,
  LogOut,
} from "lucide-react";
import { FileStorage } from "@/lib/file-storage";

export default function TeacherDashboard() {
  const router = useRouter();
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});
  const [uploadingSubject, setUploadingSubject] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<{
    [key: string]: string;
  }>({});

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  const subjects = [
    {
      id: "1",
      name: "Mathematics",
      code: "MATH101",
      students: 45,
      color: "bg-blue-500",
      description: "Advanced Mathematics for Engineering Students",
    },
    {
      id: "2",
      name: "Physics",
      code: "PHYS201",
      students: 38,
      color: "bg-purple-500",
      description: "Classical and Modern Physics Principles",
    },
    {
      id: "3",
      name: "Geography",
      code: "GE301",
      students: 52,
      color: "bg-emerald-500",
      description: "Physical and Human Geography",
    },
    {
      id: "4",
      name: "History and Citizenship",
      code: "HE601",
      students: 52,
      color: "bg-slate-500",
      description: "History and Citizenship",
    },
    {
      id: "5",
      name: "Biology",
      code: "BI301",
      students: 40,
      color: "bg-yellow-500",
      description: "Biology and Health Sciences",
    },
    {
      id: "6",
      name: "Chemistry",
      code: "CH843",
      students: 30,
      color: "bg-red-400",
      description: "Chemistry and Matters",
    },
  ];

  const handleUploadClick = (subjectId: string) => {
    fileInputRefs.current[subjectId]?.click();
  };

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    subjectId: string
  ) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const category = selectedCategory[subjectId] || "resource";
    setUploadingSubject(subjectId);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const formData = new FormData();
        formData.append("file", file);
        formData.append("subjectId", subjectId);
        formData.append("category", category);
        formData.append("teacherId", "teacher-1");

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json();
          throw new Error(errorData.details || "Upload failed");
        }

        const uploadResult = await uploadResponse.json();
        FileStorage.addFile(uploadResult.file);

        await fetch(`/api/files/${subjectId}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uploadResult.file),
        });
      }

      toast({
        title: "Upload Successful",
        description: `${files.length} file(s) uploaded successfully for ${
          subjects.find((s) => s.id === subjectId)?.name
        }!`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description:
          error instanceof Error
            ? error.message
            : "There was an error uploading your files. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingSubject(null);
      if (fileInputRefs.current[subjectId]) {
        fileInputRefs.current[subjectId]!.value = "";
      }
    }
  };

  const handleCategoryChange = (subjectId: string, category: string) => {
    setSelectedCategory((prev) => ({
      ...prev,
      [subjectId]: category,
    }));
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 min-h-screen">
      
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                SMS
              </div>
              <h1 className="text-xl font-bold text-slate-800">
                Teacher Dashboard
              </h1>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </header>

    
      <main className="p-4 sm:p-6">
        <div className="max-w-6xl mx-auto space-y-8">
          
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Welcome Back!
            </h1>
            <p className="text-slate-600 text-sm sm:text-base">
              Manage your classes and upload course materials
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-blue-700">Total Subjects</p>
                    <p className="text-2xl font-bold text-blue-800">
                      {subjects.length}
                    </p>
                  </div>
                  <BookOpen className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-emerald-700">Total Students</p>
                    <p className="text-2xl font-bold text-emerald-800">
                      {subjects.reduce(
                        (acc, subject) => acc + subject.students,
                        0
                      )}
                    </p>
                  </div>
                  <Users className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-600" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-purple-700">Files Uploaded</p>
                    <p className="text-2xl font-bold text-purple-800">24</p>
                  </div>
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          
          <div className="space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-semibold text-slate-800">
                Upload Course Materials
              </h2>
              <p className="text-slate-600 text-sm">
                Manage and upload files for your subjects here
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subjects.map((subject) => (
                <Card
                  key={subject.id}
                  className="bg-white/80 backdrop-blur-md border border-white/30"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0">
                      <div className="flex items-start space-x-4">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 ${subject.color} rounded-lg flex items-center justify-center text-white font-semibold`}
                        >
                          {subject.code.substring(0, 2)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">
                            {subject.name}
                          </h3>
                          <p className="text-sm text-slate-600">
                            {subject.code}
                          </p>
                          <p className="text-xs text-slate-500">
                            {subject.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-start sm:items-end space-y-3">
                        <Badge className="bg-slate-100 text-slate-800">
                          {subject.students} students
                        </Badge>

                        <Select
                          value={selectedCategory[subject.id] || "resource"}
                          onValueChange={(value) =>
                            handleCategoryChange(subject.id, value)
                          }
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue placeholder="Category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="lecture">Lecture</SelectItem>
                            <SelectItem value="assignment">
                              Assignment
                            </SelectItem>
                            <SelectItem value="resource">Resource</SelectItem>
                          </SelectContent>
                        </Select>

                        <Button
                          size="sm"
                          onClick={() => handleUploadClick(subject.id)}
                          disabled={uploadingSubject === subject.id}
                          className="text-xs bg-blue-600 hover:bg-blue-700"
                        >
                          {uploadingSubject === subject.id ? (
                            <>
                              <AlertCircle className="w-3 h-3 mr-1 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-3 h-3 mr-1" />
                              Upload Files
                            </>
                          )}
                        </Button>

                        <input
                          type="file"
                          ref={(el) => {
                            if (el) {
                              fileInputRefs.current[subject.id] = el;
                            }
                          }}
                          onChange={(e) => handleFileChange(e, subject.id)}
                          style={{ display: "none" }}
                          multiple
                          accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.zip"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Quick Actions */}
              <Card className="bg-white/80 backdrop-blur-sm border border-white/30">
                <CardHeader>
                  <CardTitle className="text-slate-800">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full justify-start" variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Manage Assignments
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Class
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <Users className="w-4 h-4 mr-2" />
                    View Students
                  </Button>
                </CardContent>
              </Card>

              {/* Upload Tips */}
              <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                    <div>
                      <h3 className="font-semibold text-green-800">
                        Upload Tips
                      </h3>
                      <p className="text-sm text-green-700">
                        Select file category before uploading. Supported
                        formats: PDF, DOC, PPT, images, ZIP
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
