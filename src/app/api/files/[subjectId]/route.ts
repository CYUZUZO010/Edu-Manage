// File: src/app/api/files/[subjectId]/route.ts

import { type NextRequest, NextResponse } from "next/server";
import type { FileRecord } from "@/lib/file-storage";

type Params = { params: { subjectId: string } };

export async function GET(request: NextRequest, { params }: Params) {
  try {
    const { subjectId } = params;

    return NextResponse.json({
      files: [], // Replace with real DB logic
      subjectId,
    });
  } catch (error) {
    console.error("Error fetching files:", error);
    return NextResponse.json(
      { error: "Failed to fetch files" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest, { params }: Params) {
  try {
    const { subjectId } = params;
    const fileData: FileRecord = await request.json();

    if (!fileData.id || !fileData.name || !fileData.url) {
      return NextResponse.json({ error: "Invalid file data" }, { status: 400 });
    }

    console.log(`File metadata saved for subject ${subjectId}:`, fileData.name);

    return NextResponse.json({ success: true, file: fileData });
  } catch (error) {
    console.error("Error saving file metadata:", error);
    return NextResponse.json(
      { error: "Failed to save file metadata" },
      { status: 500 }
    );
  }
}
