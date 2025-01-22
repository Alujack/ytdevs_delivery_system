import { z } from 'zod'

export const UserSchema = z.object({
  email: z.string().email().optional(),
  phone: z.string().min(10).optional(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'COMPANY', 'DRIVER', 'CUSTOMER']),
})

export const DeliverySchema = z.object({
  pickupAddr: z.string(),
  dropoffAddr: z.string(),
  categoryId: z.string(),
  weight: z.number().optional(),
  distance: z.number(),
})

export const ReviewSchema = z.object({
  deliveryId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
  driverId: z.string(),
})
