import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/client/prisma"

export async function PATCH(request: NextRequest, { params }: { params: { saleId: string } }) {
  const { saleId } = params

  try {
    const updatedSale = await prisma.sale.update({
      where: { id: saleId },
      data: { delivered: true },
    })

    return NextResponse.json(updatedSale, { status: 200 })
  } catch (error) {
    console.error("Erro ao atualizar entrega:", error)
    return NextResponse.json({ error: "Erro ao atualizar entrega." }, { status: 500 })
  }
}
