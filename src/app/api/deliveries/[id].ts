// app/api/deliveries/[id]/accept/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';


export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get driver id for the current user
    const driver = await prisma.driver.findFirst({
      where: { userId: session.user.id }
    });

    if (!driver) {
      return NextResponse.json({ error: 'Driver not found' }, { status: 404 });
    }

    // Update delivery with driver and change status
    const delivery = await prisma.delivery.update({
      where: { id: params.id },
      data: {
        driverId: driver.id,
        status: 'ACCEPTED'
      }
    });

    return NextResponse.json(delivery);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}