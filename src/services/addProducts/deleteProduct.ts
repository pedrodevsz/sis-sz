import axios from "axios"
import { api } from "../api"

export async function deleteProduct(id: string): Promise<void> {
  try {
    await api.delete(`/deleteProduct/${id}`)
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao deletar produto:", error.response?.data || error.message)
      throw error.response?.data || error.message
    }
    throw "Erro inesperado ao deletar produto"
  }
}
