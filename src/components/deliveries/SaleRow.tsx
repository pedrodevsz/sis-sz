'use client'

import { useState } from "react"
import { useDeliveredProducts } from "@/hooks/deliveries/useDeliveriedProducts"
import { useMarkSaleAsDelivered } from "@/hooks/deliveries/useMarkSaleAsDeliveried"
import { Checkbox } from "../ui/checkbox"
import { Button } from "../ui/button"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Sale } from "@/services/deliveries/types"
import { TableRow, TableCell } from "../ui/table"

interface Props {
  sale: Sale
}

export function SaleRow({ sale }: Props) {
  const [expanded, setExpanded] = useState(false)
  const { deliveredSet, toggleProductDelivered } = useDeliveredProducts(sale.id)
  const mutation = useMarkSaleAsDelivered()

  return (
    <TableRow
      className="align-top hover:bg-zinc-700/50 transition-colors cursor-pointer"
      onClick={() => setExpanded(prev => !prev)}
    >
      <TableCell className="font-medium text-white flex items-center gap-2">
        {expanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        {sale.customerName}
      </TableCell>

      <TableCell className="text-zinc-300">
        {new Date(sale.createdAt).toLocaleDateString()}
      </TableCell>

      <TableCell className="text-zinc-300 text-left">
        {expanded ? (
          <div onClick={(e) => e.stopPropagation()}>
            <ul className="space-y-1 border border-zinc-700 rounded-md p-2 bg-zinc-900 max-h-60 overflow-auto">
              {sale.productsSold.map((product) => (
                <li key={product.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={deliveredSet.has(product.id)}
                      onCheckedChange={() => toggleProductDelivered(product.id)}
                      id={`checkbox-${sale.id}-${product.id}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <label
                      htmlFor={`checkbox-${sale.id}-${product.id}`}
                      className="cursor-pointer text-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {product.productName}
                    </label>
                  </div>
                  <span className="text-zinc-400">
                    quantidade: {product.quantitySold}
                  </span>
                </li>
              ))}
            </ul>

            <Button
              type="button"
              variant="blueOnBlack"
              className="mt-2.5"
              onClick={(e) => {
                e.stopPropagation()
                mutation.mutate(sale.id)
              }}
            >
              Marcar como entregue
            </Button>
          </div>
        ) : (
          <span className="italic text-zinc-500">Clique para ver produtos</span>
        )}
      </TableCell>
    </TableRow>
  )
}
