// Simple file storage simulation using localStorage
// In production, replace this with a real database

export interface FileRecord {
  id: string
  name: string
  type: string
  size: string
  uploadDate: string
  category: "lecture" | "assignment" | "resource"
  url: string
  subjectId: string
  teacherId: string
  uploadedAt: string
}

export class FileStorage {
  private static STORAGE_KEY = "school_files_db"

  static getAllFiles(): FileRecord[] {
    if (typeof window === "undefined") return []

    try {
      const stored = localStorage.getItem(this.STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  }

  static getFilesBySubject(subjectId: string): FileRecord[] {
    return this.getAllFiles().filter((file) => file.subjectId === subjectId)
  }

  static addFile(file: FileRecord): void {
    if (typeof window === "undefined") return

    const files = this.getAllFiles()
    files.push(file)
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(files))
  }

  static deleteFile(fileId: string): boolean {
    if (typeof window === "undefined") return false

    const files = this.getAllFiles()
    const filteredFiles = files.filter((file) => file.id !== fileId)

    if (filteredFiles.length !== files.length) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredFiles))
      return true
    }
    return false
  }

  static getFilesByTeacher(teacherId: string): FileRecord[] {
    return this.getAllFiles().filter((file) => file.teacherId === teacherId)
  }

  static getTotalFileCount(): number {
    return this.getAllFiles().length
  }

  static getFileCountBySubject(subjectId: string): number {
    return this.getFilesBySubject(subjectId).length
  }
}
