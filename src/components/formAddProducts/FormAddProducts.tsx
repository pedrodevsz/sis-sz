'use client'

import { useTransition, useState } from 'react'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from "@/components/ui/card"
import { productSchema } from "@/services/addProducts/schema"
import { createProduct } from "@/services/addProducts/addProduct"
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
    <div className="page-container">
      <Card className="card-base">
        <h1 className="title-xl">Adicionar Produto</h1>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid-base">
              <div className="group-base">
                <label htmlFor="name" className="label-base">Nome</label>
                <Input id="name" {...register("productName")} />
                {errors.productName && <p className="text-error">{errors.productName.message}</p>}
              </div>

              <div className="group-base">
                <label htmlFor="code" className="label-base">Código</label>
                <Input id="code" {...register("code")} />
                {errors.code && <p className="text-error">{errors.code.message}</p>}
              </div>

              <div className="group-base">
                <label htmlFor="brutePrice" className="label-base">Preço Bruto por un</label>
                <Input id="brutePrice" type="number" {...register("brutePrice", { valueAsNumber: true })} />
                {errors.brutePrice && <p className="text-error">{errors.brutePrice.message}</p>}
              </div>

              <div className="group-base">
                <label htmlFor="percentage" className="label-base">% Lucro</label>
                <Input id="percentage" type="number" {...register("percentage", { valueAsNumber: true })} />
                {errors.percentage && <p className="text-error">{errors.percentage.message}</p>}
              </div>

              <div className="group-base">
                <label htmlFor="totalQuantity" className="label-base">Quantidade</label>
                <Input id="totalQuantity" type="number" {...register("totalQuantity", { valueAsNumber: true })} />
                {errors.totalQuantity && <p className="text-error">{errors.totalQuantity.message}</p>}
              </div>

              <div className="flex items-end">
                <Button
                  type="submit"
                  variant="white"
                  className="btn-block"
                  disabled={isPending || mutation.isPending}
                >
                  {isPending ? 'Adicionando...' : 'Adicionar'}
                </Button>
              </div>
            </div>

            {error && <p className="text-error">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
