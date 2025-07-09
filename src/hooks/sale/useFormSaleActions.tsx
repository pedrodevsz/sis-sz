import { startTransition } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { addSale } from "@/services/saleProducts/addNewSale"
import { SaleSchema } from "@/services/saleProducts/schema"
import { ProductSearchResult } from "@/services/saleProducts/types"
import { searchProductsByName } from "@/services/saleProducts/getSaleProducts"

type UseFormActionsParams = {
  reset: () => void
  setError: (error: string | null) => void
}

export function useSaleFormActions({ reset, setError }: UseFormActionsParams) {
  const mutation = useMutation({
    mutationFn: addSale,
    onSuccess() {
      startTransition(() => {
        reset()
        setError(null)
      })
    },
    onError: (error: any) => {
      const serverError =
        error?.response?.data?.error || error?.message || "Erro ao enviar os dados"
      setError(serverError)
    }
  })

  const handleSubmitForm = (data: SaleSchema) => {
    mutation.mutate(data)
  }

  return { mutation, handleSubmitForm }
}

export function useSearchProducts(name: string) {
  return useQuery<ProductSearchResult[], Error>({
    queryKey: ["searchProducts", name],
    queryFn: () => searchProductsByName(name),
    enabled: name.length > 0,
    staleTime: 5 * 60 * 1000, // 5 min
    // cacheTime removido aqui, vai no QueryClient global
  })
}
