import { AppError } from './errors'
import { prisma } from './prisma'

export async function calculateDeliveryPrice({
  distance,
  weight = 0,
  categoryId
}: {
  distance: number
  weight?: number
  categoryId: string
}) {
  const category = await prisma.category.findUnique({
    where: { id: categoryId }
  })

  if (!category) {
    throw new AppError(404, 'Category not found')
  }

  // Base calculation
  const basePrice = 5.00
  const pricePerKm = 2.00
  const weightFactor = 0.5

  // Add any additional category-specific pricing rules here
  const price = basePrice + (distance * pricePerKm) + (weight * weightFactor)

  return Math.round(price * 100) / 100
}