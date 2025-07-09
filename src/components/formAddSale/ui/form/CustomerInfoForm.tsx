"use client"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from "@/components/ui/select"
import { SaleSchema } from "@/services/saleProducts/schema"

export function CustomerInfoForm() {
  const {
    register,
    control,
    formState: { errors }
  } = useFormContext<SaleSchema>()

  const paid = useWatch({ control, name: "paid" })

  return (
    <>
      <div>
        <Label htmlFor="customerName">Cliente</Label>
        <Input id="customerName" {...register("customerName")} />
        {errors.customerName && (
          <p className="text-red-500 text-sm">{errors.customerName.message}</p>
        )}
      </div>

      <Controller
        name="paid"
        control={control}
        render={({ field }) => (
          <div>
            <Label>Status de Pagamento</Label>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="paid">Pago</SelectItem>
                <SelectItem value="notPaid">Não Pago</SelectItem>
              </SelectContent>
            </Select>
            {errors.paid && (
              <p className="text-red-500 text-sm">{errors.paid.message}</p>
            )}
          </div>
        )}
      />

      {paid === "paid" && (
        <Controller
          name="paymentMethod"
          control={control}
          render={({ field }) => (
            <div>
              <Label>Forma de Pagamento</Label>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pix">PIX</SelectItem>
                  <SelectItem value="cartao">Cartão</SelectItem>
                  <SelectItem value="dinheiro">Dinheiro</SelectItem>
                </SelectContent>
              </Select>
              {errors.paymentMethod && (
                <p className="text-red-500 text-sm">{errors.paymentMethod.message}</p>
              )}
            </div>
          )}
        />
      )}

      {paid === "notPaid" && (
        <div>
          <Label>Valor Inicial (AV)</Label>
          <Input {...register("avs.0")} placeholder="Ex: 50.00" />
          {errors.avs?.[0] && (
            <p className="text-red-500 text-sm">{errors.avs[0].message}</p>
          )}
        </div>
      )}
    </>
  )
}
