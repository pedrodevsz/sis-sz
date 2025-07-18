'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from "@/services/addProducts/fetchProducts"
import { deleteProduct } from "@/services/addProducts/deleteProduct"
import type { ProductResponse } from "@/services/addProducts/types"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"

export default function ListAllProducts() {
  const [filter, setFilter] = useState("")

  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery<ProductResponse[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id)
      refetch()
    } catch (error) {
      console.error("Erro ao deletar produto:", error)
    }
  }

  const filteredProducts = products?.filter(product =>
    product.productName.toLowerCase().includes(filter.toLowerCase())
  )

  if (isLoading) return <p className="text-center text-muted-foreground">Carregando produtos...</p>
  if (isError || !products) return <p className="text-center text-muted-foreground">Erro ao carregar produtos.</p>
  if (filteredProducts?.length === 0) return <p className="text-center text-muted-foreground">Nenhum produto encontrado.</p>

  return (
    <div className="max-w-6xl mx-auto p-4 mt-6 overflow-x-auto">
      {/* Input de filtro centralizado */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Filtrar por nome do produto..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-zinc-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-600"
        />
      </div>

      <table className="w-full text-sm text-left border-collapse rounded-2xl overflow-hidden">
        <thead className="bg-zinc-900 text-white">
          <tr className="text-sm font-semibold border-b border-zinc-800 text-center">
            <th className="px-4 py-3">Produto</th>
            <th className="px-4 py-3">Código</th>
            <th className="px-4 py-3">Preço Bruto por un</th>
            <th className="px-4 py-3">% Lucro</th>
            <th className="px-4 py-3">Preço Venda</th>
            <th className="px-4 py-3">Qtd</th>
            <th className="px-4 py-3">Ações</th>
          </tr>
        </thead>
        <tbody className="bg-zinc-800 divide-y divide-zinc-700 text-center">
          {filteredProducts?.map(product => {
            const salePrice = product.salePrice // pega direto do backend
            return (
              <tr key={product.id} className="hover:bg-zinc-700 transition-colors">
                <td className="px-4 py-3 font-medium text-white">{product.productName}</td>
                <td className="px-4 py-3 text-zinc-400">{product.code || "—"}</td>
                <td className="px-4 py-3 text-zinc-300">
                  {product.brutePrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </td>
                <td className="px-4 py-3 text-zinc-300">{product.percentage}%</td>
                <td className="px-4 py-3 text-green-500 font-semibold">
                  {salePrice.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                  })}
                </td>
                <td className="px-4 py-3 text-zinc-300">{product.totalQuantity}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-center">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Excluir
                    </Button>
                  </div>
                </td>
              </tr>
            )
          })}
        </tbody>

      </table>
    </div>
  )
}
