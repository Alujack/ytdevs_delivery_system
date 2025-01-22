import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { authMiddleware } from '../../lib/auth' 

const prisma = new PrismaClient()

export default authMiddleware(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'PUT') {
    try {
      const { ...userData } = req.body 

      const updatedUser = await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: userData,
      })

      res.status(200).json(updatedUser)
    } catch (error) {
      console.error('Error updating user:', error)
      res.status(500).json({ message: 'Failed to update user' })
    } finally {
      await prisma.$disconnect()
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
})