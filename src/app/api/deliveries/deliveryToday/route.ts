import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma/client/prisma'

export async function GET() {
  try {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

    const todaySales = await prisma.sale.findMany({
      where: {
        createdAt: {
          gte: startOfDay,
          lt: endOfDay,
        },
      },
      include: {
        productsSold: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(todaySales)
  } catch (error) {
    console.error('Erro ao buscar vendas de hoje:', error)
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
