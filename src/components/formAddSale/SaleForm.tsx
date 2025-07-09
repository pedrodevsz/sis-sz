"use client"

import {
  useForm,
  FormProvider,
  SubmitHandler
} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { saleSchema, SaleSchema } from "@/services/saleProducts/schema"
import { Card, CardTitle, CardBody, CardActions } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CustomerInfoForm } from "./ui/form/CustomerInfoForm"
import { AddressForm } from "./ui/form/AddresForm"
import { ProductSaleForm } from "./ui/form/saleForm/ProductsSaleForm"
import { addSale } from "@/services/saleProducts/addNewSale"

export function SaleForm() {
  const methods = useForm<SaleSchema>({
    resolver: zodResolver(saleSchema),
    defaultValues: {
      customerName: "",
      paid: "notPaid",
      delivered: false,
      street: "",
      number: "",
      description: "",
      paymentMethod: undefined,
      avs: [""],
      productsSold: [
        {
          productName: "",
          salePriceUnitary: 0,
          quantitySold: 1
        }
      ]
    }
  })

  const onSubmit: SubmitHandler<SaleSchema> = async (data: SaleSchema) => {
    try {
      const response = await addSale(data)
      console.log("venda criada", response.message)
      methods.reset()
    } catch (error) {
      console.error("Houve um erro ao enviar venda", error)
    }
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Card className="max-w-3xl mx-auto my-10 p-6 space-y-6">
          <CardTitle>Nova Venda</CardTitle>

          <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CustomerInfoForm />
            <AddressForm />
          </CardBody>

          <CardBody className="space-y-4">
            <ProductSaleForm />
          </CardBody>

          <CardActions className="justify-end">
            <Button type="submit" variant="white">Salvar Venda</Button>
          </CardActions>
        </Card>
      </form>
    </FormProvider>
  )
}
