import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/client/prisma'

export async function GET() {
  try {
    const sales = await prisma.sale.findMany({
      where: { delivered: false },
      include: { productsSold: true },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(sales)
  } catch (error) {
    console.error('Erro ao buscar vendas não entregues:', error)
    return NextResponse.json(
      { error: 'Erro ao buscar vendas não entregues' },
      { status: 500 }
    )
  }
}
