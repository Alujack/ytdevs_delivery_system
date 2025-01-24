import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { deliveryId, rating, comment, driverId } = body

    const review = await prisma.review.create({
      data: {
        deliveryId,
        userId: session.user.id,
        driverId,
        rating,
        comment
      }
    })

    return NextResponse.json(review)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
