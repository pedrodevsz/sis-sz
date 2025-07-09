
"use client"

import React, { useEffect, useState } from "react"
import { Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Trash2Icon } from "lucide-react"
import { useSearchProducts } from "@/hooks/sale/useFormSaleActions"
import type { ProductSearchResult } from "@/services/saleProducts/types"
import { ProductSaleRowProps } from "./types"

export function ProductSaleRow({
  index,
  control,
  register,
  remove,
  searchText,
  setSearchText,
  error,
  setValue,
}: ProductSaleRowProps) {
  const [debouncedText, setDebouncedText] = useState(searchText)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedText(searchText), 300)
    return () => clearTimeout(handler)
  }, [searchText])

  const { data: suggestions = [] } = useSearchProducts(debouncedText)

  const onProductNameChange = (value: string) => {
    setSearchText(value)
    setValue(`productsSold.${index}.productName`, value, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const selectSuggestion = (product: ProductSearchResult) => {
    setValue(`productsSold.${index}.productName`, product.productName, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setValue(`productsSold.${index}.salePriceUnitary`, product.salePrice, {
      shouldValidate: true,
      shouldDirty: true,
    })
    setSearchText("")
  }

  return (
    <div className="grid md:grid-cols-4 gap-3 items-end relative mb-6">
      <div className="relative">
        <Label>Produto</Label>
        <Controller
          control={control}
          name={`productsSold.${index}.productName`}
          render={({ field }) => (
            <>
              <Input {...field} onChange={(e) => onProductNameChange(e.target.value)} autoComplete="off" />
              {suggestions.length > 0 && (
                <ul className="absolute bg-zinc-800 border border-gray-800 w-full max-h-40 overflow-auto z-10 rounded-md shadow-md">
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      className="p-2 cursor-pointer text-white"
                      onClick={() => selectSuggestion(product)}
                    >
                      {product.productName}
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        />
        {error?.productName && <p className="text-red-500 text-sm">{error.productName.message}</p>}
      </div>

      <div>
        <Label>Preço Unitário</Label>
        <Input
          type="number"
          step="0.01"
          {...register(`productsSold.${index}.salePriceUnitary`, { valueAsNumber: true })}
        />
        {error?.salePriceUnitary && <p className="text-red-500 text-sm">{error.salePriceUnitary.message}</p>}
      </div>

      <div>
        <Label>Quantidade</Label>
        <Input
          type="number"
          {...register(`productsSold.${index}.quantitySold`, { valueAsNumber: true })}
        />
        {error?.quantitySold && <p className="text-red-500 text-sm">{error.quantitySold.message}</p>}
      </div>

      <div className="flex items-end">
        <Button
          type="button"
          className="absolute end-0"
          variant="destructive"
          onClick={() => remove(index)}
          aria-label={`Remover produto ${index + 1}`}
        >
          <Trash2Icon />
        </Button>
      </div>
    </div>

  )
}
