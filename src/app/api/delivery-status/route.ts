import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { deliveryId, status } = body

    // Verify user has permission to update this delivery
    const delivery = await prisma.delivery.findUnique({
      where: { id: deliveryId },
      include: { driver: true }
    })

    if (!delivery) {
      return NextResponse.json({ error: 'Delivery not found' }, { status: 404 })
    }

    if (session.user.role === 'DRIVER' && delivery.driver?.userId !== session.user.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const updatedDelivery = await prisma.delivery.update({
      where: { id: deliveryId },
      data: { status }
    })

    return NextResponse.json(updatedDelivery)
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}