import { api } from "@/services/api"
import axios from "axios"
import type { ProductRequest, ProductResponse } from "./types"

export async function createProduct(data: ProductRequest): Promise<ProductResponse> {
  try {
    const response = await api.post<ProductResponse>("/addProduct", data)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao criar produto:", error.response?.data || error.message)
      throw error.response?.data || error.message
    }
    throw "Erro inesperado ao criar produto"
  }
}

