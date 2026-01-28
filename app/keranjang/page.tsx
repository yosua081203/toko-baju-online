'use client';

import Link from 'next/link';
import { useCart } from '../../src/components/lib/useCart'; // Sesuaikan jalur jika perlu
import { Trash2, ChevronLeft, ShoppingBag, CreditCard } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function KeranjangPage() {
  const { items, removeItem, clearCart } = useCart();
  const [isClient, setIsClient] = useState(false);
  
  // State untuk form pembeli
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });

  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;

  const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Fungsi Kirim Data ke Database
  const handleCheckout = async () => {
    if (!formData.name || !formData.address) {
      alert("Mohon isi nama dan alamat lengkap!");
      return;
    }

    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: formData.name,
        customerEmail: formData.email,
        address: formData.address,
        totalAmount: totalPrice,
        items: items
      }),
    });

    if (response.ok) {
      alert("Pesanan Berhasil! Data sudah tersimpan di XAMPP.");
      clearCart();
      window.location.href = "/";
    } else {
      alert("Terjadi kesalahan saat memesan.");
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <ShoppingBag size={80} className="mx-auto text-gray-200 mb-6" />
        <h1 className="text-2xl font-bold mb-8 text-gray-900">Keranjangmu Kosong</h1>
        <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold">Mulai Belanja</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 min-h-screen">
      <h1 className="text-3xl font-extrabold mb-10 text-gray-900">Checkout Pesanan</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Form Data Pembeli - BAGIAN YANG DIPERBAIKI */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900">
              <CreditCard className="text-blue-600" /> Informasi Pengiriman
            </h2>
            <div className="space-y-5">
              {/* Input Nama */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Nama Lengkap</label>
                <input 
                  type="text" 
                  placeholder="Ketik nama lengkap Anda..." 
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              {/* Input Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Email (Opsional)</label>
                <input 
                  type="email" 
                  placeholder="contoh@email.com" 
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-gray-400"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              {/* Input Alamat */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 text-left">Alamat Lengkap Pengiriman</label>
                <textarea 
                  placeholder="Tulis alamat rumah, nomor jalan, kecamatan, dan kota..." 
                  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all h-32 placeholder:text-gray-400"
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                ></textarea>
              </div>
            </div>
          </div>

          {/* Daftar Barang */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900 px-2">Daftar Belanjaan</h2>
            {items.map((item) => (
              <div key={item.id} className="flex items-center gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                <img src={item.image} className="w-20 h-20 object-cover rounded-lg" alt={item.name} />
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-blue-600 font-bold">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
                <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600 transition-colors">
                  <Trash2 size={20}/>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Ringkasan Pembayaran */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit sticky top-24">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Total Pembayaran</h2>
          <div className="bg-blue-50 p-6 rounded-2xl mb-8">
            <p className="text-3xl font-black text-blue-600 text-center">Rp {totalPrice.toLocaleString('id-ID')}</p>
          </div>
          <button 
            onClick={handleCheckout}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg shadow-blue-100 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            Konfirmasi Pesanan
          </button>
          <p className="text-[10px] text-gray-400 mt-4 text-center uppercase tracking-widest font-bold">
            Data akan disimpan di MySQL XAMPP
          </p>
        </div>
      </div>
    </div>
  );
}