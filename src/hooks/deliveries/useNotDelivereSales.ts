"use client"

import { useQuery } from '@tanstack/react-query'
import { getNotDeliver } from '@/services/deliveries/getNotDeliver'
import { Sale } from '@/services/deliveries/types'

export function useNotDeliveredSales() {
  return useQuery<Sale[], Error>({
    queryKey: ['notDeliveries'],
    queryFn: getNotDeliver,
    staleTime: 1000 * 60 * 2,
  })
}
