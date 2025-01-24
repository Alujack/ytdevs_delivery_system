import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prisma"; // Adjust to your Prisma setup

export async function handler(req: Request) {
  try {
    switch (req.method) {
      case "GET":
        // Fetch all drivers
        const drivers = await prisma.driver.findMany();
        return NextResponse.json(drivers, { status: 200 });

      case "POST":
        // Parse the JSON body for POST requests
        const body = await req.json(); // Parsing JSON body in Next.js 13+ API route
        const newDriver = await prisma.driver.create({ data: body });
        return NextResponse.json(newDriver, { status: 201 });

      default:
        return NextResponse.json(
          { error: `Method ${req.method} Not Allowed` },
          { status: 405 }
        );
    }
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
