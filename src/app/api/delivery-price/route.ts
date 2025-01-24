import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { distance, categoryId, weight = 0 } = body

    // Fetch category for specific pricing rules
    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 })
    }

    // Base price calculation
    const basePrice = 5.00 // Base fee
    const pricePerKm = 2.00 // Price per kilometer
    const weightFactor = 0.5 // Additional price per kg

    const price = basePrice + (distance * pricePerKm) + (weight * weightFactor)

    return NextResponse.json({ price: Math.round(price * 100) / 100 })
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
