import axios from 'axios'
import { api } from '../api'

export async function getNotDeliver() {
  try {
    const response = await api.get('/deliveries/notDeliver')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message
      console.error("Erro ao buscar vendas não entregues:", message)
      throw new Error(message)
    }

    console.error("Erro inesperado ao buscar vendas não entregues:", error)
    throw new Error("Erro inesperado ao buscar vendas não entregues")
  }
}
