import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma/client/prisma";

type SoldProduct = {
  productName: string;
  salePriceUnitary: number;
  quantitySold: number;
};

export async function POST(req: NextRequest) {
  try {
    const {
      customerName,
      paymentMethod,
      street,
      number,
      description,
      productsSold,
      paid,
      delivered,
      avs,
    } = await req.json();

    if (
      !customerName ||
      !paid ||
      typeof delivered !== "boolean" ||
      !productsSold ||
      !Array.isArray(productsSold) ||
      productsSold.length === 0
    ) {
      return NextResponse.json(
        { error: "Campos obrigatórios não foram preenchidos" },
        { status: 400 }
      );
    }

    if (paid === "paid" && !paymentMethod) {
      return NextResponse.json(
        { error: "Forma de pagamento obrigatória se venda está paga" },
        { status: 400 }
      );
    }

    const result = await prisma.$transaction(async (tx) => {
      // Atualiza o estoque dos produtos vendidos
      for (const soldProduct of productsSold as SoldProduct[]) {
        const product = await tx.product.findUnique({
          where: { productName: soldProduct.productName },
        });

        if (!product) {
          throw new Error(`Produto ${soldProduct.productName} não encontrado`);
        }

        const newQuantity = product.totalQuantity - soldProduct.quantitySold;
        if (newQuantity < 0) {
          throw new Error(
            `Estoque insuficiente para o produto ${product.productName}`
          );
        }

        await tx.product.update({
          where: { id: product.id },
          data: { totalQuantity: newQuantity },
        });
      }

      const sale = await tx.sale.create({
        data: {
          customerName,
          paymentMethod: paymentMethod,
          street,
          number,
          description,
          paid,
          delivered,
          productsSold: {
            create: (productsSold as SoldProduct[]).map((product) => ({
              productName: product.productName,
              salePriceUnitary: product.salePriceUnitary,
              quantitySold: product.quantitySold,
            })),
          },
          PartialValue: {
            create: (avs || []).map((value: string) => ({ value })),
          },
        },
        select: {
          id: true,
          customerName: true,
          createdAt: true,
        },
      });

      return sale;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error: any) {
    console.error("Erro no POST /addSale:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno ao salvar venda" },
      { status: 500 }
    );
  }
}
