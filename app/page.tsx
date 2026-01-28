import Link from 'next/link';
import { ArrowRight, ShoppingBag, ShoppingCart } from 'lucide-react';
// Jalur ini disesuaikan dengan foto: keluar dari 'app', masuk ke 'src/lib/prisma'
import { prisma } from '../src/components/lib/prisma';

export default async function Home() {
  
  // Mengambil data produk dari MySQL XAMPP
  const products = await prisma.product.findMany();

  return (
    <div className="flex flex-col min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070" 
            alt="Fashion Banner" 
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            GAYA TERBARU <br /> <span className="text-blue-500">KUALITAS PREMIUM</span>
          </h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#produk" className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105">
              Mulai Belanja <ShoppingBag size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* DAFTAR PRODUK DARI DATABASE */}
      <section id="produk" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900">Koleksi Terbaru</h2>
              <p className="text-gray-500 mt-2">Produk pilihan terbaik dari database XAMPP</p>
            </div>
            <Link href="/produk" className="text-blue-600 font-semibold flex items-center gap-2 hover:underline">
              Lihat Semua <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link href={`/produk/${product.id}`} key={product.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 h-full">
                  <div className="relative h-72 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-blue-600 shadow-sm">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-400 block uppercase font-bold tracking-tighter">Harga</span>
                        <span className="text-xl font-extrabold text-blue-600">
                          Rp {product.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                      <div className="bg-gray-900 group-hover:bg-blue-600 text-white p-3 rounded-xl transition-colors shadow-lg shadow-gray-200">
                        <ShoppingCart size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}