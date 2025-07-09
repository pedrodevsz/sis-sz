import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/client/prisma"

export async function POST(req: NextRequest) {
  try {
    const { productName, code, brutePrice, percentage, totalQuantity } = await req.json()

    if (
      !productName ||
      brutePrice === undefined ||
      percentage === undefined ||
      totalQuantity === undefined
    ) {
      return NextResponse.json(
        { error: "Campos obrigatórios não foram preenchidos" },
        { status: 400 }
      )
    }
    const salePrice = brutePrice * (1 + percentage / 100)

    const product = await prisma.product.upsert({
      where: { productName },
      update: {
        brutePrice,
        percentage,
        salePrice,  // salva aqui
        totalQuantity: {
          increment: totalQuantity,
        },
        ...(code ? { code } : {}),
      },
      create: {
        productName,
        brutePrice,
        percentage,
        salePrice,  // e aqui
        totalQuantity,
        code,
      },
    })

    return NextResponse.json({ ...product, salePrice }, { status: 200 })
  } catch (error) {
    console.error("Erro no POST /createProduct:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
