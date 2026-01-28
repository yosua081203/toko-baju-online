import { prisma } from "@/src/components/lib/prisma"; // Jalur sesuai struktur folder kamu
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, ShieldCheck, Truck } from "lucide-react";
import AddToCartButton from "../../../src/components/AddToCartButton"; // Import komponen tombol baru

export default async function DetailProduk({ params }: { params: Promise<{ id: string }> }) {
  // Tunggu params tersedia (Standar Next.js 16)
  const { id } = await params;
  const productId = parseInt(id);

  // Cari produk di MySQL XAMPP
  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      {/* Tombol Kembali */}
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition">
        <ChevronLeft size={20} /> Kembali ke Beranda
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        {/* Bagian Kiri: Gambar Produk */}
        <div className="rounded-2xl overflow-hidden shadow-inner bg-gray-50 h-[500px]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>

        {/* Bagian Kanan: Informasi Produk */}
        <div className="flex flex-col">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2">{product.category}</span>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">{product.name}</h1>
          <p className="text-3xl font-black text-blue-600 mb-6">Rp {product.price.toLocaleString('id-ID')}</p>
          
          <div className="border-t border-gray-100 pt-6 mb-6">
            <h3 className="font-bold text-gray-900 mb-2">Deskripsi Produk</h3>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="bg-gray-50 p-4 rounded-2xl mb-8">
            <p className="text-sm text-gray-500 mb-3">Status: <span className="font-bold text-green-600">Tersedia ({product.stock} pcs)</span></p>
            <div className="grid grid-cols-2 gap-4 text-[13px] text-gray-600">
              <span className="flex items-center gap-2"><ShieldCheck size={16} className="text-green-500"/> Originalitas Terjamin</span>
              <span className="flex items-center gap-2"><Truck size={16} className="text-blue-500"/> Kurir Instan Tersedia</span>
            </div>
          </div>

          {/* NO 3: MENGGUNAKAN KOMPONEN TOMBOL ADD TO CART YANG SUDAH TERHUBUNG KE ZUSTAND */}
          <AddToCartButton product={product} />
          
        </div>
      </div>
    </div>
  );
}