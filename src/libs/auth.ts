import { getServerSession } from 'next-auth'
import { AppError } from './errors'

export async function getCurrentUser() {
  const session = await getServerSession()
  
  if (!session?.user) {
    throw new AppError(401, 'Unauthorized')
  }
  
  return session.user
}

export async function checkRole(allowedRoles: string[]) {
  const user = await getCurrentUser()
  
  if (!allowedRoles.includes(user.role)) {
    throw new AppError(403, 'Forbidden')
  }
  
  return user
}
