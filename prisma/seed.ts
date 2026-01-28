const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Menghapus data lama agar tidak terjadi duplikat saat kita running ulang
  await prisma.product.deleteMany();

  // Menambahkan daftar koleksi produk baru yang lebih lengkap
  await prisma.product.createMany({
    data: [
      {
        name: "Kaos Polos Cotton Combed 30s",
        description: "Bahan nyaman, menyerap keringat, tersedia berbagai warna dasar untuk tampilan kasual.",
        price: 55000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
        category: "Kaos",
        stock: 100,
      },
      {
        name: "Kemeja Flanel Premium",
        description: "Kemeja flanel motif kotak-kotak dengan bahan tebal dan lembut, cocok untuk luaran.",
        price: 150000,
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000",
        category: "Kemeja",
        stock: 50,
      },
      {
        name: "Jaket Bomber Navy",
        description: "Jaket bomber stylish dengan lapisan dalam yang hangat dan tahan angin.",
        price: 225000,
        image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
        category: "Jaket",
        stock: 30,
      },
      {
        name: "Hoodie Oversize Hitam",
        description: "Hoodie dengan potongan oversize yang modern dan bahan fleece yang sangat lembut.",
        price: 185000,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000",
        category: "Hoodie",
        stock: 45,
      },
      {
        name: "Celana Chino Slim Fit",
        description: "Celana chino dengan potongan slim fit yang memberikan kesan rapi dan profesional.",
        price: 195000,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=1000",
        category: "Celana",
        stock: 60,
      },
      {
        name: "Kemeja Putih Formal",
        description: "Kemeja putih bersih dengan bahan katun premium, wajib dimiliki untuk acara resmi.",
        price: 135000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000",
        category: "Kemeja",
        stock: 40,
      },
    ],
  });

  console.log("Daftar koleksi produk berhasil diperbarui!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });