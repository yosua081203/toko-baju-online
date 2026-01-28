import { prisma } from "@/src/components/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, description, price, image, category, stock } = body;

    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        image,
        category,
        stock: Number(stock),
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menambah produk" }, { status: 500 });
  }
}