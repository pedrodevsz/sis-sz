'use client'

import { useTransition, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { productSchema } from "@/services/products/schema"
import { createProduct } from "@/services/products/addProduct"
import type { z } from "zod"

type ProductFormData = z.infer<typeof productSchema>

export default function FormAddProducts() {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  })

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      startTransition(() => {
        queryClient.invalidateQueries({ queryKey: ['products'] })
      })
      reset()
      setError(null)
    },
    onError: () => {
      setError("Erro ao enviar os dados.")
    }
  })

  const onSubmit = (data: ProductFormData) => {
    mutation.mutate(data)
  }

  return (
    <div className="w-full px-4 pt-6 sticky top-0 z-10 shadow-sm">
      <Card className="max-w-6xl mx-auto rounded-2xl shadow-lg border">
        <h1 className="text-2xl font-semibold px-3.5 pt-3">Adicionar Produto</h1>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-400">Nome</label>
                <Input id="name" {...register("productName")} placeholder="Ex: Camiseta" />
                {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="code" className="text-sm font-medium text-gray-400">Código</label>
                <Input id="code" {...register("code")} placeholder="Ex: 123ABC" />
                {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="brutePrice" className="text-sm font-medium text-gray-400">Preço Bruto por un</label>
                <Input id="brutePrice" type="number" {...register("brutePrice", { valueAsNumber: true })} placeholder="R$" />
                {errors.brutePrice && <p className="text-red-500 text-sm">{errors.brutePrice.message}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="percentage" className="text-sm font-medium text-gray-400">% Lucro</label>
                <Input id="percentage" type="number" {...register("percentage", { valueAsNumber: true })} placeholder="%" />
                {errors.percentage && <p className="text-red-500 text-sm">{errors.percentage.message}</p>}
              </div>
              <div className="space-y-1">
                <label htmlFor="totalQuantity" className="text-sm font-medium text-gray-400">Quantidade</label>
                <Input id="totalQuantity" type="number" {...register("totalQuantity", { valueAsNumber: true })} placeholder="Ex: 10" />
                {errors.totalQuantity && <p className="text-red-500 text-sm">{errors.totalQuantity.message}</p>}
              </div>
              <div className="flex items-end">
                <Button type="submit" variant="default" className="w-full" disabled={isPending || mutation.isPending}>
                  {isPending ? 'Adicionando...' : 'Adicionar'}
                </Button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
