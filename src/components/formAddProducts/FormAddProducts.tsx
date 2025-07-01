'use client'

import { createProduct } from "@/services/products/addProduct"
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { productSchema } from "../../services/products/schema"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { z } from "zod"

type ProductFormData = z.infer<typeof productSchema>

export default function FormAddProducts() {
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema)
  })

  const onSubmit = async (data: ProductFormData) => {
    try {
      await createProduct(data)
      reset()
      setError(null)
    } catch {
      setError("Erro ao enviar os dados.")
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 gap-4">
          <div className="space-y-1">
            <label htmlFor="name" className="text-sm font-medium">Nome</label>
            <Input id="name" {...register("productName")} />
            {errors.productName && <p className="text-red-500 text-sm">{errors.productName.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="code" className="text-sm font-medium">Código</label>
            <Input id="code" {...register("code")} />
            {errors.code && <p className="text-red-500 text-sm">{errors.code.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="brutePrice" className="text-sm font-medium">Preço Bruto</label>
            <Input id="brutePrice" type="number" {...register("brutePrice", { valueAsNumber: true })} />
            {errors.brutePrice && <p className="text-red-500 text-sm">{errors.brutePrice.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="percentage" className="text-sm font-medium">% Lucro</label>
            <Input id="percentage" type="number" {...register("percentage", { valueAsNumber: true })} />
            {errors.percentage && <p className="text-red-500 text-sm">{errors.percentage.message}</p>}
          </div>
          <div className="space-y-1">
            <label htmlFor="totalQuantity" className="text-sm font-medium">Quantidade</label>
            <Input id="totalQuantity" type="number" {...register("totalQuantity", { valueAsNumber: true })} />
            {errors.totalQuantity && <p className="text-red-500 text-sm">{errors.totalQuantity.message}</p>}
          </div>
          <div className="flex items-end">
            <Button type="submit" className="w-full">
              Adicionar
            </Button>
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

    </div>
  )
}
