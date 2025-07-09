import axios from "axios"
import { api } from "@/services/api"
import type { SaleSchema } from "@/services/saleProducts/schema"

type AddSaleResponse = {
  message: string
  saleId?: string
}

export async function addSale(data: SaleSchema): Promise<AddSaleResponse> {
  try {
    const response = await api.post<AddSaleResponse>("/addSale", data)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao criar venda:", error.response?.data || error.message)
      throw error.response?.data || error.message
    }
    throw new Error("Erro inesperado ao criar venda")
  }
}
