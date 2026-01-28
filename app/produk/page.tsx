import Link from 'next/link';
import { ShoppingCart, ChevronLeft } from 'lucide-react';
// Import disesuaikan dengan gambar folder kamu (src/components/lib/prisma.ts)
import { prisma } from '../../src/components/lib/prisma';

// Definisi Tipe Data (Menghilangkan garis merah di 'product')
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export default async function DaftarProdukPage() {
  // Ambil data dari TiDB Cloud
  const products: Product[] = await prisma.product.findMany();

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 min-h-screen bg-white">
      {/* Tombol Kembali */}
      <div className="mb-8">
        <Link href="/" className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
          <ChevronLeft size={18} /> Kembali ke Beranda
        </Link>
      </div>

      <h1 className="text-4xl font-black text-gray-900 mb-10 tracking-tighter">
        SEMUA <span className="text-blue-600">PRODUK</span>
      </h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product: Product) => (
          <Link href={`/produk/${product.id}`} key={product.id} className="group">
            <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
              
              <div className="relative h-64 overflow-hidden bg-gray-50">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col text-left">
                <span className="text-blue-500 text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
                <h3 className="text-gray-900 font-bold mt-1 mb-4 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="mt-auto flex justify-between items-center">
                  <span className="text-xl font-black text-gray-900">
                    Rp {product.price.toLocaleString('id-ID')}
                  </span>
                  <div className="bg-gray-900 text-white p-2 rounded-xl group-hover:bg-blue-600 transition-colors">
                    <ShoppingCart size={20} />
                  </div>
                </div>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}