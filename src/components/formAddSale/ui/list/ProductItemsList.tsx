import type { ProductItemsListProps } from "@/services/saleProducts/types"
import { ProductItemField } from "./ProductItemField"

export function ProductItemsList({
  fields,
  register,
  control,
  errors,
  remove
}: ProductItemsListProps) {
  return (
    <div className="w-full flex justify-center">
      <div className="space-y-4 w-full max-w-5xl px-4">
        {fields.map((field, index) => (
          <ProductItemField
            key={field.id}
            index={index}
            register={register}
            control={control}
            errors={errors}
            remove={remove}
          />
        ))}
      </div>
    </div>
  )
}
