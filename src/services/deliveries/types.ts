export type ProductSold = {
  id: string
  productName: string
  salePriceUnitary: number
  quantitySold: number
  paid: string
  delivered: string
}

export type Sale = {
  id: string
  customerName: string
  createdAt: string
  paymentMethod?: string
  street?: string
  number?: string
  description?: string
  delivered: boolean
  paid: string
  productsSold: ProductSold[]
  PartialValue: any[] // ajuste se necessário
}
