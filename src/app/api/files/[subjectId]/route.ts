import { type NextRequest, NextResponse } from "next/server"
import type { FileRecord } from "@/lib/file-storage"

export async function GET(request: NextRequest, { params }: { params: { subjectId: string } }) {
  try {
    const subjectId = params.subjectId

    // In a real app, this would be a database query
    // For now, we'll return a simulated response that works with client-side storage
    return NextResponse.json({
      files: [], // Client will handle loading from localStorage
      subjectId,
    })
  } catch (error) {
    console.error("Error fetching files:", error)
    return NextResponse.json({ error: "Failed to fetch files" }, { status: 500 })
  }
}

export async function POST(request: NextRequest, { params }: { params: { subjectId: string } }) {
  try {
    const subjectId = params.subjectId
    const fileData: FileRecord = await request.json()

    // Validate file data
    if (!fileData.id || !fileData.name || !fileData.url) {
      return NextResponse.json({ error: "Invalid file data" }, { status: 400 })
    }

    // In a real app, save to database here
    console.log(`File metadata saved for subject ${subjectId}:`, fileData.name)

    return NextResponse.json({ success: true, file: fileData })
  } catch (error) {
    console.error("Error saving file metadata:", error)
    return NextResponse.json({ error: "Failed to save file metadata" }, { status: 500 })
  }
}
