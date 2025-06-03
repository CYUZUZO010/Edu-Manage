import { jwtVerify } from "jose"
import { cookies } from "next/headers"

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function verifyAuth() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      return null
    }

    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    console.error("Auth verification error:", error)
    return null
  }
}

export async function requireAuth(requiredRole?: string) {
  const user = await verifyAuth()

  if (!user) {
    throw new Error("Authentication required")
  }

  if (requiredRole && user.role !== requiredRole) {
    throw new Error("Insufficient permissions")
  }

  return user
}
