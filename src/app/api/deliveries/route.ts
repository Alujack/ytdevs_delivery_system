// app/api/deliveries/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';
import {authOptions} from '@/libs/authOptions';

// Create delivery order
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session:', session?.user);
    
    const body = await req.json();
    console.log('Request body:', body);
  
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { pickupAddr, dropoffAddr, categoryId, price, distance } = body;

    const delivery = await prisma.delivery.create({
      data: {
        customerId: session.user.id,
        pickupAddr,
        dropoffAddr,
        categoryId,
        price,
        distance,
        status: 'PENDING'
      }
    });

    return NextResponse.json(delivery);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// Get deliveries
export async function GET(req: Request) {
  try {
     const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const deliveries = await prisma.delivery.findMany({
      where: {
        OR: [
          { customerId: session?.user.id },
          { driver: { userId: session?.user.id } }
        ],
        ...(status && { status })
      },
      include: {
        customer: true,
        driver: true,
        category: true,
        review: true
      }
    });

    return NextResponse.json(deliveries);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}