import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client/prisma";

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get("name");

  if (!name || name.length < 1) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const products = await prisma.$queryRaw<
      { id: number; productName: string; totalQuantity: number }[]
    >`
      SELECT id, productName, totalQuantity
      FROM Product
      WHERE LOWER(productName) LIKE LOWER(${`%${name}%`})
      LIMIT 10
    `;

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar produtos por nome:", error);
    return NextResponse.json({ message: "Erro ao buscar produtos" }, { status: 500 });
  }
}
