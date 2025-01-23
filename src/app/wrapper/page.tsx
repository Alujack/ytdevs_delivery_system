"use client"
import { useSession, signIn } from 'next-auth/react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const { data: session } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      const role = session.user.role
      if (role === 'ADMIN') router.push('/admin/admin-dashboard')
      else if (role === 'COMPANY') router.push('/company/home')
      else if (role === 'DRIVER') router.push('/drivers/home')
      else router.push('/user/home')
    console.log(session)
    }
  }, [session, router])

  return (
    <div>
    </div>
  )
}