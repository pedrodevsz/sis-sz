import axios from "axios"
import { ProductResponse } from "./types"
import { api } from "../api"

export async function fetchProducts(): Promise<ProductResponse[]> {
  try {
    const response = await api.get<ProductResponse[]>("/fetchProduct")
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao buscar produtos:", error.response?.data || error.message)
      throw error.response?.data || error.message
    }
    throw "Erro inesperado ao buscar produtos"
  }
}
