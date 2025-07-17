'use client'

import { useState } from 'react'
import { ErrorMessage } from '../pagination/errorMessage/ErrorMessage'
import { SaleRow } from './SaleRow'
import { useNotDeliveredSales } from '@/hooks/deliveries/useNotDelivereSales'
import { FilterClient } from '../filterClient/FilterClient'
import { LoadingProduct } from '../pagination/loaderMessage/loadingComponent'
import { CardBody, CardTitle } from '../ui/card'
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
} from '../ui/table'

export function NotDeliveryList() {
  const [filter, setFilter] = useState('')
  const { data: sales = [], isLoading, isError, error } = useNotDeliveredSales()

  const filteredSales = sales.filter(sale =>
    sale.customerName.toLowerCase().includes(filter.toLowerCase())
  )

  if (isLoading) return <LoadingProduct message="Carregando vendas" />
  if (isError) return <ErrorMessage message={error?.message || "Erro ao carregar vendas não entregues."} />

  return (
    <CardBody>
      <CardTitle>Vendas que ainda não foram entregues</CardTitle>
      <FilterClient filter={filter} setFilter={setFilter} />

      <Table>
        <TableHeader>
          <TableRow className="text-center">
            <TableHead>Cliente</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Produtos</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="text-center">
          {filteredSales.map(sale => (
            <SaleRow key={sale.id} sale={sale} />
          ))}
        </TableBody>
      </Table>
    </CardBody>
  )
}
