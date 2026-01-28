'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, PlusCircle, Package, Upload, Image as ImageIcon } from 'lucide-react';

export default function TambahProdukPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '', // Ini akan diisi link otomatis setelah upload berhasil
    category: 'Kaos',
    stock: ''
  });

  // FUNGSI UNTUK UPLOAD KE CLOUDINARY
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "toko_baju"); // GANTI dengan Nama Upload Preset kamu
    data.append("cloud_name", "dooj0rir1"); // GANTI dengan Cloud Name kamu

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/dooj0rir1/image/upload`, {
        method: "POST",
        body: data,
      });
      const fileData = await res.json();
      setFormData({ ...formData, image: fileData.secure_url });
      setPreview(fileData.secure_url);
      alert("Gambar berhasil diunggah!");
    } catch (err) {
      alert("Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) return alert("Tunggu sampai gambar selesai diunggah!");
    
    setLoading(true);
    const res = await fetch('/api/admin/product', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Produk Berhasil Ditambahkan!");
      router.push('/produk');
      router.refresh();
    } else {
      alert("Terjadi kesalahan!");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 min-h-screen">
      <Link href="/" className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition">
        <ChevronLeft size={20} /> Kembali
      </Link>

      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <Package className="text-blue-600" /> Tambah Produk
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* BAGIAN UPLOAD GAMBAR */}
          <div className="border-2 border-dashed border-gray-200 p-8 rounded-2xl text-center hover:border-blue-500 transition-all bg-gray-50 relative overflow-hidden">
            {preview ? (
              <img src={preview} className="mx-auto h-48 object-cover rounded-xl mb-4" />
            ) : (
              <ImageIcon size={48} className="mx-auto text-gray-300 mb-2" />
            )}
            
            <label className="cursor-pointer block">
              <span className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition shadow-sm inline-flex items-center gap-2">
                <Upload size={16} /> {uploading ? "Sedang Mengunggah..." : "Pilih Gambar Produk"}
              </span>
              <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
            </label>
            <p className="text-[10px] text-gray-400 mt-2 uppercase font-bold tracking-widest">Maksimal 2MB (JPG/PNG)</p>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nama Produk</label>
            <input 
              type="text" required className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input 
              type="number" required placeholder="Harga (Rp)" className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
            <input 
              type="number" required placeholder="Stok" className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
            />
          </div>

          <textarea 
            required placeholder="Deskripsi..." className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-500 outline-none h-24"
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          ></textarea>

          <button 
            type="submit" disabled={loading || uploading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 rounded-2xl shadow-lg transition-all disabled:bg-gray-400"
          >
            {loading ? "Menyimpan..." : "Simpan Produk"}
          </button>
        </form>
      </div>
    </div>
  );
}