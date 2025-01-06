"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";

interface Product {
  brand: string;
  thumbnail: string;
}

interface Brand {
  id: string;
  name: string;
  logo: string;
  products: number;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await fetch('https://dummyjson.com/products');
        const data = await response.json();
        
        // Extract unique brands and create brand objects
        const uniqueBrands = Array.from(
          new Set(data.products.map((product: Product) => product.brand)) as Set<string>
        ).map((brandName) => ({
          id: String(brandName).toLowerCase(),
          name: brandName,
          logo: data.products.find((p: Product) => p.brand === brandName)?.thumbnail || '',
          products: data.products.filter((p: Product) => p.brand === brandName).length
        }));
        
        setBrands(uniqueBrands);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching brands:", error);
        setLoading(false);
      }
    }
    fetchBrands();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
      title="Our Brands"
      subtitle="Review our product's brands before proceeding to checkout!"
      imageUrl="/Brand-Hero-IMG.jpeg"
    />    
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {brands.map((brand) => (
          <div
            key={brand.id}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer"
            onClick={() => router.push(`/brands/${brand.id}`)}
          >
            <div className="relative h-40 mb-4">
              <Image
                src={brand.logo}
                alt={brand.name}
                layout="fill"
                objectFit="contain"
                className="rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold text-center mb-2">{brand.name}</h2>
            <p className="text-gray-600 text-center">{brand.products} Products</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}