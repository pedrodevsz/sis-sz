"use client"
import { useFormContext } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SaleSchema } from "@/services/saleProducts/schema"

export function AddressForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<SaleSchema>()

  return (
    <>
      <div>
        <Label htmlFor="street">Rua</Label>
        <Input id="street" {...register("street")} />
      </div>
      <div>
        <Label htmlFor="number">Número</Label>
        <Input id="number" {...register("number")} />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="description">Descrição</Label>
        <Input id="description" {...register("description")} />
      </div>
      <div>
        <Label htmlFor="delivered">Entregue?</Label>
        <input type="checkbox" {...register("delivered")} className="ml-2" id="delivered" />
        {errors.delivered && (
          <p className="text-red-500 text-sm">{errors.delivered.message}</p>
        )}
      </div>
    </>
  )
}
