import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query'
import { markSaleAsDelivered } from '@/services/deliveries/markAsDelivered'

export function useMarkSaleAsDelivered(): UseMutationResult<
  void,
  Error,
  string,
  unknown
> {
  const queryClient = useQueryClient()

  return useMutation<void, Error, string>({
    mutationFn: markSaleAsDelivered,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notDeliveries'] })
    },
  })
}
