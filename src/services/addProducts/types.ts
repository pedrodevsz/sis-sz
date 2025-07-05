import { z } from "zod"
import { productSchema } from "./schema"

export type ProductRequest = z.infer<typeof productSchema>

export type ProductResponse = ProductRequest & {
  id: string
  createdAt: string
  updatedAt: string
}
