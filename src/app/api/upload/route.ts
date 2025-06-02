import { type NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const subjectId = formData.get("subjectId") as string;
    const category = formData.get("category") as string;
    const teacherId = formData.get("teacherId") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    console.log(`Uploading file: ${file.name} for subject: ${subjectId}`);

    // Upload to Vercel Blob with better configuration
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true, // Prevents filename conflicts
    });

    console.log(`File uploaded successfully: ${blob.url}`);

    // Create file metadata
    const fileData = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      name: file.name,
      type: file.name.split(".").pop()?.toUpperCase() || "FILE",
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split("T")[0],
      category: category || "resource",
      url: blob.url,
      subjectId,
      teacherId,
      uploadedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      file: fileData,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        error: "Upload failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
