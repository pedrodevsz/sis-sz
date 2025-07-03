import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/client/prisma"

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params

  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "ID inválido" }, { status: 400 })
  }

  try {
    const existingProduct = await prisma.product.findUnique({ where: { id } })

    if (!existingProduct) {
      return NextResponse.json({ message: "Produto não encontrado" }, { status: 404 })
    }

    await prisma.product.delete({ where: { id } })

    return NextResponse.json({ message: "Produto deletado com sucesso" }, { status: 200 })
  } catch (error) {
    console.error("Erro ao deletar produto:", error)
    return NextResponse.json({ message: "Erro ao deletar produto" }, { status: 500 })
  }
}
