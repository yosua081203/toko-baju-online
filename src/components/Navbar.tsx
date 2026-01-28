'use client'; // Tambahkan ini karena Navbar sekarang memantau perubahan data (state)

import Link from 'next/link';
import { ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '@/src/components/lib/useCart'; // Sesuaikan jalur jika file useCart ada di src/lib
import { useEffect, useState } from 'react';

export default function Navbar() {
  const items = useCart((state) => state.items);
  const [cartCount, setCartCount] = useState(0);

  // Efek ini memastikan angka sinkron antara data di browser dan tampilan
  useEffect(() => {
    const total = items.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(total);
  }, [items]);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600 tracking-tighter">
              CLOTHING<span className="text-gray-900">STORE</span>
            </Link>
          </div>

          {/* Navigasi Tengah - Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition font-medium">Beranda</Link>
            <Link href="/produk" className="text-gray-600 hover:text-blue-600 transition font-medium">Produk</Link>
          </div>

          {/* Ikon Aksi */}
          <div className="flex items-center space-x-5">
            <button className="text-gray-600 hover:text-blue-600 transition">
              <Search size={22} />
            </button>
            
            {/* Ikon Keranjang dengan Angka Dinamis */}
            <Link href="/keranjang" className="text-gray-600 hover:text-blue-600 transition relative">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </Link>

            <button className="text-gray-600 hover:text-blue-600 transition">
              <User size={22} />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}