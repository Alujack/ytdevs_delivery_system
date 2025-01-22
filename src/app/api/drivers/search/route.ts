import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const location = searchParams.get('location')
    
    const availableDrivers = await prisma.driver.findMany({
      where: {
        user: { isApproved: true }
      },
      include: {
        user: true,
        reviews: {
          select: {
            rating: true
          }
        }
      }
    })

    // Calculate average rating for each driver
    const driversWithRating = availableDrivers.map(driver => ({
      ...driver,
      averageRating: driver.reviews.length > 0
        ? driver.reviews.reduce((acc, curr) => acc + curr.rating, 0) / driver.reviews.length
        : null
    }))

    return NextResponse.json(driversWithRating)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
