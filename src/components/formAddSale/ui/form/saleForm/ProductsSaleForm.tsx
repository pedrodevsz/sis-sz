
"use client"

import React, { useState } from "react"
import { useFormContext, useFieldArray } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ProductSaleRow } from "./ProductSaleRow"
import type { SaleSchema } from "@/services/saleProducts/schema"

export function ProductSaleForm() {
  const {
    register,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<SaleSchema>()

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productsSold",
  })

  const [searchTexts, setSearchTexts] = useState<Record<number, string>>({})

  const setSearchTextAtIndex = (index: number, text: string) => {
    setSearchTexts((prev) => ({ ...prev, [index]: text }))
  }

  return (
    <>
      <Label className="block text-lg mb-2">Produtos Vendidos</Label>

      {fields.map((field, index) => (
        <ProductSaleRow
          key={field.id}
          index={index}
          control={control}
          register={register}
          remove={remove}
          searchText={searchTexts[index] ?? ""}
          setSearchText={(text) => setSearchTextAtIndex(index, text)}
          error={errors.productsSold?.[index]}
          setValue={setValue}
        />
      ))}

      <Button
        type="button"
        variant="blueOnBlack"
        onClick={() =>
          append({ productName: "", salePriceUnitary: 0, quantitySold: 1 })
        }
      >
        Adicionar Produto
      </Button>
    </>
  )
}
