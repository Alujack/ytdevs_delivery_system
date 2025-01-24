import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'
import bcrypt from 'bcryptjs'
import { getServerSession } from 'next-auth'
export async function PATCH(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { userId, approved } = body

    const user = await prisma.user.update({
      where: { id: userId },
      data: { isApproved: approved }
    })

    return NextResponse.json({ ...user, password: undefined })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}