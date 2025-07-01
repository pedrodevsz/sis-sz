import { z } from "zod"

export const productSchema = z.object({
  productName: z.string().min(1, "Nome é obrigatório"),
  code: z.string().optional(),
  brutePrice: z.coerce.number().nonnegative("Preço bruto inválido"),
  percentage: z.coerce.number().nonnegative("Percentual inválido"),
  totalQuantity: z.coerce.number().nonnegative("Quantidade deve ser positiva")
})

export type ProductSchema = z.infer<typeof productSchema>
