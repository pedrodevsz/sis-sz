import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/client/prisma"

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(products, {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    })
  } catch (error) {
    console.error("Erro ao buscar produtos:", error)

    return NextResponse.json(
      { message: "Erro ao buscar produtos" },
      { status: 500 }
    )
  }
}
