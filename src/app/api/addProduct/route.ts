import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/client/prisma"

export async function POST(req: NextRequest) {
  try {
    const { productName, code, brutePrice, percentage, totalQuantity } = await req.json() // extrai os dados da req

    // validação básica
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

    const product = await prisma.product.upsert({
      where: { productName },
      update: {
        brutePrice,
        percentage,
        totalQuantity: {
          increment: totalQuantity,
        },
        ...(code ? { code } : {})
      },
      create: {
        productName,
        brutePrice,
        percentage,
        totalQuantity,
        code
      }
    })

    const status = product ? 200 : 201

    return NextResponse.json(product, { status })
  } catch (error) {
    console.error("Erro no POST /createProduct:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
