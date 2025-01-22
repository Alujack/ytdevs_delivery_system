// app/api/auth/register/existing-user/driver/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/authOptions";

export async function POST(req: Request) {
  try {
    // Get the current session
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { license, vehicle } = await req.json();

    // Validate required fields
    if (!license || !vehicle) {
      return NextResponse.json(
        { error: "License and vehicle details are required" },
        { status: 400 }
      );
    }

    // Check if user already has a driver profile
    const existingDriver = await prisma.driver.findFirst({
      where: {
        userId: session?.user.id
      }
    });

    if (existingDriver) {
      return NextResponse.json(
        { error: "User is already registered as a driver" },
        { status: 400 }
      );
    }

    // Update user and create driver profile in a transaction
    const updatedUser = await prisma.$transaction(async (prisma) => {
      // Update user role
      const user = await prisma.user.update({
        where: {
          id: session.user.id
        },
        data: {
          role: "DRIVER"
        }
      });

      // Create driver profile
      const driver = await prisma.driver.create({
        data: {
          userId: user.id,
          license,
          vehicle
        }
      });

      return {
        ...user,
        driver
      };
    });

    return NextResponse.json({
      message: "Successfully registered as driver",
      user: updatedUser
    }, { status: 200 });

  } catch (error) {
    console.error("Driver registration error:", error);
    return NextResponse.json(
      { error: "Error registering as driver" },
      { status: 500 }
    );
  }
}