import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'

export function useDeliveryTracking(deliveryId: string) {
  const { data: session } = useSession()
  const [delivery, setDelivery] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!deliveryId || !session) return

    const fetchDelivery = async () => {
      try {
        const response = await fetch(`/api/deliveries/${deliveryId}`)
        if (!response.ok) throw new Error('Failed to fetch delivery')
        const data = await response.json()
        setDelivery(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchDelivery()
    // Set up polling or WebSocket connection here for real-time updates
    const interval = setInterval(fetchDelivery, 30000) // Poll every 30 seconds

    return () => clearInterval(interval)
  }, [deliveryId, session])

  return { delivery, loading, error }
}