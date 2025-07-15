import axios from "axios"
import { api } from "../api"

export async function markSaleAsDelivered(saleId: string) {
  try {
    const response = await api.patch(`/deliveries/${saleId}`)
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message
      console.error("Erro ao marcar venda como entregue:", message)
      throw new Error(message)
    }
    console.error("Erro inesperado ao marcar venda como entregue:", error)
    throw new Error("Erro inesperado ao marcar venda como entregue")
  }
}
