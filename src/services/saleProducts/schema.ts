import { z } from "zod"

export const customerPaymentSchema = z.object({
  customerName: z.string().min(1, "Nome do cliente é obrigatório"),
  paymentMethod: z.enum(["dinheiro", "pix", "cartao"], {
    errorMap: () => ({ message: "Forma de pagamento inválida" }),
  }),
})

export const saleSchema = z
  .object({
    customerName: z.string().min(1, "Nome do cliente é obrigatório"),

    paid: z.enum(["paid", "notPaid"], {
      required_error: "Informe se a venda foi paga ou não",
    }),

    paymentMethod: z.enum(["dinheiro", "pix", "cartao"], {
      errorMap: () => ({ message: "Forma de pagamento inválida" }),
    }).optional(),

    street: z.string().optional(),
    number: z.string().optional(),
    description: z.string().optional(),

    delivered: z.boolean({
      required_error: "Informe se a venda foi entregue",
    }),

    avs: z
      .array(z.string().min(1, "Valor parcial não pode estar vazio"))
      .optional(),

    productsSold: z.array(
      z.object({
        productName: z.string().min(1, "Produto é obrigatório"),
        salePriceUnitary: z.number().min(0.01, "Preço deve ser maior que 0"),
        quantitySold: z.number().min(1, "Quantidade deve ser ao menos 1"),
      })
    )
  })
  .refine((data) => {
    if (data.paid === "paid" && !data.paymentMethod) return false
    return true
  }, {
    path: ["paymentMethod"],
    message: "Forma de pagamento é obrigatória quando a venda está paga"
  })




export type SaleSchema = z.infer<typeof saleSchema>
