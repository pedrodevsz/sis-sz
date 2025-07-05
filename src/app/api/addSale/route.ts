import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/client/prisma"

export async function POST(req: NextRequest) {
  try {
    const {
      customerName,
      paymentMethod,
      street,
      number,
      description,
      productsSold
    } = await req.json()

    if (!customerName || !paymentMethod || !productsSold || productsSold.length === 0) {
      return NextResponse.json(
        { error: "Campos obrigatórios não foram preenchidos" },
        { status: 400 }
      )
    }

    const sale = await prisma.sale.create({
      data: {
        customerName,
        paymentMethod,
        street,
        number,
        description,
        productsSold: {
          create: productsSold.map((product: any) => ({
            productName: product.productName,
            salePriceUnitary: product.salePriceUnitary,
            quantitySold: product.quantitySold,
          }))
        }
      },
      select: {
        id: true,
        customerName: true,
        createdAt: true,
      }
    })

    return NextResponse.json(sale, { status: 201 })

  } catch (error) {
    console.error("Erro no POST /addSale:", error)
    return NextResponse.json(
      { error: "Erro interno ao salvar venda" },
      { status: 500 }
    )
  }
}
