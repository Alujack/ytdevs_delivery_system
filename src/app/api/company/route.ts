import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/libs/prisma";

export async function POST(req: Request) {
  try {
    const { 
      email, 
      password, 
      phone, 
      name, 
      address 
    } = await req.json();

    // Validate required fields
    if (!email || !password || !phone || !name || !address) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check for existing user
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email or phone already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user and company profile in a transaction
    const user = await prisma.$transaction(async (prisma) => {
      // Create user
      const newUser = await prisma.user.create({
        data: {
          email,
          phone,
          password: hashedPassword,
          role: "COMPANY",
        },
      });

      // Create company profile
      const company = await prisma.company.create({
        data: {
          userId: newUser.id,
          name,
          address,
        },
      });

      return {
        ...newUser,
        company,
      };
    });

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      message: "Company registered successfully",
      user: userWithoutPassword
    }, { status: 201 });

  } catch (error: any) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Error registering company" },
      { status: 500 }
    );
  }
}