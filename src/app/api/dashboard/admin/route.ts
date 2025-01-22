import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';
import { getServerSession } from 'next-auth';

export async function GET(req: Request) {
  try {
    // const session = await getServerSession();
    // if (!session || !session.user || session.user.role !== 'ADMIN') {
    //   console.error('Unauthorized access attempt:', session);
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const { searchParams } = new URL(req.url);
    const period = searchParams.get('period') || 'day';
    const startDate = searchParams.get('startDate') as string;
    const endDate = searchParams.get('endDate') as string;

    if (period === 'custom' && (!startDate || !endDate)) {
      return NextResponse.json({ error: 'Invalid date range' }, { status: 400 });
    }

    let dateFilter = {};
    switch (period) {
      case 'day':
        dateFilter = { createdAt: { gte: new Date(new Date().setHours(0, 0, 0, 0)) } };
        break;
      case 'week':
        dateFilter = { createdAt: { gte: new Date(new Date().setDate(new Date().getDate() - 7)) } };
        break;
      case 'month':
        dateFilter = { createdAt: { gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) } };
        break;
      case 'custom':
        dateFilter = {
          createdAt: {
            gte: new Date(startDate),
            lte: new Date(endDate),
          },
        };
        break;
    }

    const [totalCompanies, totalDrivers, totalCustomers, totalDeliveries,  totalUsers] = await Promise.all([
      prisma.company.count(),
      prisma.driver.count(),
      prisma.customer.count(),
      prisma.delivery.count({ where: dateFilter }),
      prisma.user.count(),
    ]);

    return NextResponse.json({ totalCompanies, totalDrivers, totalCustomers, totalDeliveries , totalUsers});
  } catch (error:any) {
    console.error('Error processing request:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
