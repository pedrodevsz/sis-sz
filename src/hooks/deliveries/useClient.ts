'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchClients } from '@/services/clients/fetchClient'

export function useClients() {
  return useQuery({
    queryKey: ['clients'],
    queryFn: fetchClients,
    staleTime: 1000 * 60 * 2,
  })
}
