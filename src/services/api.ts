import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

export const api = axios.create({
  baseURL: BASE_URL, // teste e reuso
  headers: {
    'Content-Type': 'application/json', // informa o servidor que espera JSON na resposta
    'Accept': 'application/json',
  },
  timeout: 10000, // evita chamadas travadas
})
