import { type NextRequest, NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(request: NextRequest) {
  try {
    // Debug logging
    console.log("=== BLOB TOKEN DEBUG ===");
    console.log("Token exists:", !!process.env.BLOB_READ_WRITE_TOKEN);
    console.log(
      "Token length:",
      process.env.BLOB_READ_WRITE_TOKEN?.length || 0
    );
    console.log(
      "Token preview:",
      process.env.BLOB_READ_WRITE_TOKEN
        ? `${process.env.BLOB_READ_WRITE_TOKEN.substring(0, 10)}...`
        : "No token"
    );
    console.log(
      "All BLOB env vars:",
      Object.keys(process.env).filter((key) => key.includes("BLOB"))
    );
    console.log("========================");

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        {
          error: "BLOB_READ_WRITE_TOKEN environment variable is not set",
          debug: {
            hasToken: false,
            availableEnvVars: Object.keys(process.env).filter((key) =>
              key.includes("BLOB")
            ),
          },
        },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    const fileData = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.name.split(".").pop()?.toUpperCase() || "FILE",
      size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split("T")[0],
      category: formData.get("category") || "resource",
      url: blob.url,
      subjectId: formData.get("subjectId"),
      teacherId: formData.get("teacherId"),
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
