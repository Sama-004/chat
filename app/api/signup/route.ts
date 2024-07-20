import bcrypt from "bcrypt";
import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

async function handler(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: `Method not allowed` },
      { status: 405 }
    );
  }
  const { name, username, email, password } = await req.json();
  console.log(name);
  console.log(username);
  console.log(email);
  console.log(password);

  if (!name || !username || !email || !password) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    // Check if username is unique
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUsername) {
      return NextResponse.json(
        { message: "Username already exists" },
        { status: 400 }
      );
    }

    // Check if email is unique
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error during sign up:", error);
    return NextResponse.json(
      { message: "An error occurred during sign up" },
      { status: 500 }
    );
  }
}

export { handler as POST };
