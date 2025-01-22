import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import { getServerSession } from 'next-auth'
export async function GET(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user || session.user.role !== 'COMPANY') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const company = await prisma.company.findFirst({
      where: { userId: session.user.id }
    })

    if (!company) {
      return NextResponse.json({ error: 'Company not found' }, { status: 404 })
    }

    const totalDrivers = await prisma.driver.count({
      where: { companyId: company.id }
    })

    const totalDeliveries = await prisma.delivery.count({
      where: {
        driver: {
          companyId: company.id
        }
      }
    })

    return NextResponse.json({ totalDrivers, totalDeliveries })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}