'use client'

import { Input } from "@/components/ui/input"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type {
  UseFormRegister,
  FieldErrors,
  UseFieldArrayRemove,
  Control
} from "react-hook-form"
import { SaleSchema } from "@/services/saleProducts/schema"

type ProductItemFieldProps = {
  index: number
  register: UseFormRegister<SaleSchema>
  control: Control<SaleSchema>
  errors: FieldErrors<SaleSchema>
  remove: UseFieldArrayRemove
}

export function ProductItemField({
  index,
  register,
  control,
  errors,
  remove
}: ProductItemFieldProps) {
  return (
    <div
      className="relative grid grid-cols-12 gap-3 border border-zinc-800 px-3 py-6 rounded-xl bg-zinc-900 max-w-full items-center"
    >
      <div className="col-span-12 md:col-span-5 flex flex-col gap-1">
        <label className="label-base" htmlFor={`productsSold.${index}.productName`}>
          Produto
        </label>
        <Input
          id={`productsSold.${index}.productName`}
          {...register(`productsSold.${index}.productName`)}
        />
        {errors.productsSold?.[index]?.productName && (
          <p className="text-error">{errors.productsSold[index]?.productName?.message}</p>
        )}
      </div>

      <div className="col-span-12 md:col-span-2 flex flex-col gap-1">
        <label className="label-base" htmlFor={`productsSold.${index}.quantitySold`}>
          Quantidade
        </label>
        <Input
          id={`productsSold.${index}.quantitySold`}
          type="number"
          {...register(`productsSold.${index}.quantitySold`, { valueAsNumber: true })}
        />
        {errors.productsSold?.[index]?.quantitySold && (
          <p className="text-error">{errors.productsSold[index]?.quantitySold?.message}</p>
        )}
      </div>

      <div className="col-span-12 md:col-span-3 flex flex-col gap-1">
        <label className="label-base" htmlFor={`productsSold.${index}.salePriceUnitary`}>
          Valor unitário
        </label>
        <Input
          id={`productsSold.${index}.salePriceUnitary`}
          type="number"
          step="0.01"
          {...register(`productsSold.${index}.salePriceUnitary`, { valueAsNumber: true })}
        />
        {errors.productsSold?.[index]?.salePriceUnitary && (
          <p className="text-error">{errors.productsSold[index]?.salePriceUnitary?.message}</p>
        )}
      </div>

      <div className="absolute top-1 right-1">
        <Button
          type="button"
          onClick={() => remove(index)}
          className="w-auto text-red-500"
          aria-label="Remover produto"
        >
          <Trash2 />
        </Button>
      </div>
    </div>
  )
}
