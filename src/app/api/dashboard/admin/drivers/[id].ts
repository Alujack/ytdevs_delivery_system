import { NextResponse } from "next/server"; // Adjust import for Next.js 13+ API Routes
import { prisma } from "@/libs/prisma"; // Adjust to your Prisma setup

export async function handler(req: Request) {
  const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

  // Check if 'id' exists before proceeding
  if (typeof id !== "string") {
    return NextResponse.json({ error: "Invalid or missing 'id' parameter" }, { status: 400 });
  }

  try {
    switch (req.method) {
      case "PATCH":
        // Ensure the body contains valid data for updating the driver
        if (!req.body) {
          return NextResponse.json({ error: "No data provided for update" }, { status: 400 });
        }

        // Approve or update a driver
        const updatedDriver = await prisma.driver.update({
          where: { id: id },
          data: await req.json(), // Parse the body as JSON
        });
        return NextResponse.json(updatedDriver, { status: 200 });

      case "DELETE":
        // Delete a driver
        await prisma.driver.delete({ where: { id: id } });
        return NextResponse.json(null, { status: 204 });

      default:
        return NextResponse.json(
          { error: `Method ${req.method} Not Allowed` },
          { status: 405 }
        );
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
