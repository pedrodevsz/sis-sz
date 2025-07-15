import axios from 'axios'
import { api } from '../api'

export async function getTodayDelivery() {
  try {
    const response = await api.get('/deliveries/deliveryToday')
    return response.data
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.error || error.message
      console.error('Erro ao buscar vendas de hoje:', message)
      throw new Error(message)
    }

    console.error('Erro inesperado ao buscar vendas de hoje:', error)
    throw new Error('Erro inesperado ao buscar vendas de hoje')
  }
}
