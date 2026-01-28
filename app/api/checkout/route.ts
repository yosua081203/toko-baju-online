import { NextResponse } from 'next/server';
import { prisma } from '../../../src/components/lib/prisma'; // Sesuaikan jalur prisma kamu

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, address, items, totalAmount } = body;

    // Menyimpan data ke tabel Order di MySQL XAMPP
    const order = await prisma.order.create({
      data: {
        customerName,
        customerEmail,
        address,
        totalAmount,
        status: "PENDING",
      },
    });

    return NextResponse.json({ message: "Pesanan berhasil dibuat!", orderId: order.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Gagal menyimpan pesanan" }, { status: 500 });
  }
}