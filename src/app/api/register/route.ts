import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma"; // Verify path
import bcrypt from "bcrypt";


export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received JSON payload:", body);
    const { name, email, password, role } = body;

    if (!name || !email || !password) {
      console.log("Validation error: Name, email, and password are required");
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }
    const allowedRoles = ["student", "teacher", "admin"];
    const userRole = role || "student";
    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json(
        { error: "Invalid role. Must be student, teacher or admin" },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword, role: userRole }, // Explicitly set role
    });
    console.log("Created user:", user);

    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Failed to register user" },
      { status: 500 }
    );
  }
}
