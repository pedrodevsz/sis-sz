import axios from "axios";
import { api } from "../api";
import { ProductSearchResult } from "./types";

export async function searchProductsByName(name: string): Promise<ProductSearchResult[]> {
  try {
    const response = await api.get<ProductSearchResult[]>("/searchProducts", {
      params: { name },
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Erro ao buscar produtos por nome:", error.response?.data || error.message);
      throw error.response?.data || error.message;
    }
    throw "Erro inesperado ao buscar produtos por nome";
  }
}
