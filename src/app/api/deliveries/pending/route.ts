// pages/api/deliveries/pending.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';


export async function GET(req: Request) {
  try {
    const deliveries = await prisma.delivery.findMany({
      where: {
        status: 'PENDING',
      },
      include: {
        customer: true,    // Include customer details
        driver: true,      // Include driver details if available
        category: true,    // Include category details
      },
    });

    return NextResponse.json({ deliveries });
  } catch (error) {
    console.error('Error fetching pending deliveries:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
