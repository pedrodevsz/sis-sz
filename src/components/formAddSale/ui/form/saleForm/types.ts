import {
  Control,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form"
import type { SaleSchema } from "@/services/saleProducts/schema"

export type ProductSaleRowProps = {
  index: number
  control: Control<SaleSchema>
  register: UseFormRegister<SaleSchema>
  remove: UseFieldArrayRemove
  searchText: string
  setSearchText: (text: string) => void
  setValue: UseFormSetValue<SaleSchema>
  error?: {
    productName?: { message?: string }
    salePriceUnitary?: { message?: string }
    quantitySold?: { message?: string }
  }
}
