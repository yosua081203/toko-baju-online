'use client'; // Wajib karena ada fungsi klik
import { useCart } from '@/src/components/lib/useCart';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product }: { product: any }) {
  const addItem = useCart((state) => state.addItem);

  return (
    <button 
      onClick={() => {
        addItem(product);
        alert("Produk berhasil ditambah ke keranjang!");
      }}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-blue-100"
    >
      <ShoppingCart size={22} /> Tambah ke Keranjang Belanja
    </button>
  );
}