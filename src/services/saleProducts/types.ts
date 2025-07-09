import {
  FieldErrors,
  UseFormRegister,
  Control,
  UseFieldArrayRemove,
} from "react-hook-form"
import type { SaleSchema } from "@/services/saleProducts/schema"

export type ProductItemsListProps = {
  fields: { id: string }[]
  register: UseFormRegister<SaleSchema>
  control: Control<SaleSchema>
  errors: FieldErrors<SaleSchema>
  remove: UseFieldArrayRemove
}

export type AddressClientProps = {
  register: UseFormRegister<SaleSchema>
}

export type ProductSearchResult = {
  id: string
  productName: string
  salePrice: number
}
