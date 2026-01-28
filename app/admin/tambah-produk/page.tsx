'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, PlusCircle, Package } from 'lucide-react';

export default function TambahProdukPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: 'Kaos',
    stock: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/admin/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Produk Berhasil Ditambahkan!");
      router.push('/produk'); // Arahkan ke halaman produk untuk melihat hasilnya
      router.refresh();
    } else {
      alert("Terjadi kesalahan!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition">
        <ChevronLeft size={20} /> Kembali ke Beranda
      </Link>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <Package className="text-blue-600" /> Tambah Produk Baru
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Nama Produk</label>
            <input 
              type="text" required placeholder="Contoh: Jaket Denim Vintage"
              className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Harga (Rp)</label>
              <input 
                type="number" required placeholder="150000"
                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setFormData({...formData, price: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Stok Barang</label>
              <input 
                type="number" required placeholder="50"
                className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) => setFormData({...formData, stock: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Link Gambar Produk</label>
            <input 
              type="text" required placeholder="https://images.unsplash.com/..."
              className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Deskripsi Produk</label>
            <textarea 
              required placeholder="Ceritakan keunggulan produk ini..."
              className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none h-32"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2"
          >
            {loading ? "Menyimpan..." : <><PlusCircle size={20}/> Simpan ke Toko Online</>}
          </button>
        </form>
      </div>
    </div>
  );
}