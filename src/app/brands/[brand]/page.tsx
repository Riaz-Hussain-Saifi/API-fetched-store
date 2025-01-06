"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import Image from "next/image";
import { Button } from "@/components/ui/button"

interface Product {
  id: number;
  brand: string;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function BrandProducts() {
  const params = useParams();
  const brand = params.brand; // Get the selected brand from the URL
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products filtered by the brand
  useEffect(() => {
    async function fetchBrandProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        const brandProducts = data.products.filter(
          (product: Product) => {
            if (typeof brand === 'string') {
              return product.brand.toLowerCase() === brand.toLowerCase();
            }
            return false;
          }
        );
        setProducts(brandProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }
    if (brand) {
      fetchBrandProducts();
    }
  }, [brand]);

  const handleAddToCart = (product: Product) => {
    alert(`Added "${product.title}" to Cart!`);
  };

  const handleAddToWishlist = (product: Product) => {
    alert(`Added "${product.title}" to Wishlist!`);
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-blue-600 text-white p-8 text-center">
        <h1 className="text-4xl font-bold">Explore Products from {brand}</h1>
        <p className="mt-2">Discover the best products from {brand}.</p>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto p-4">
        {loading ? (
          <p className="text-center text-lg">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative border rounded-lg shadow-md p-4 hover:shadow-lg transition"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={80}
                  height={40}
                  className="w-full h-40 object-cover rounded"
                />
                <h3 className="mt-2 text-xl font-semibold">{product.title}</h3>
                <p className="text-gray-600 mt-1">${product.price}</p>
                <p className="text-sm text-gray-500 mt-2">{product.description}</p>

                {/* Wishlist and Cart Icons */}
                <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    onClick={() => handleAddToWishlist(product)}
                    className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600"
                  >
                    <FaHeart />
                  </Button>
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600"
                  >
                    <FaShoppingCart />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
