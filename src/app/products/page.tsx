"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button"

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProduct = storedCart.find((item: Product) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = storedCart.map((item: Product & { quantity?: number }) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...storedCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }

    alert(`Added "${product.title}" to Cart!`);
  };

  const handleAddToWishlist = (product: Product) => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingProduct = storedWishlist.find((item: Product) => item.id === product.id);

    if (!existingProduct) {
      const updatedWishlist = [...storedWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      alert(`Added "${product.title}" to Wishlist!`);
    } else {
      alert(`"${product.title}" is already in your Wishlist!`);
    }
  };

  return (
    <div>
      <HeroSection
        title="Our Products"
        subtitle="Explore our amazing collection of products"
        imageUrl="/Products-Hero-IMG.avif"
      />

      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 space-x-2">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 bg-white rounded-full shadow hover:bg-blue-50"
                    >
                      <FaShoppingCart className="text-blue-600" size={20} />
                    </Button>
                    <Button
                      onClick={() => handleAddToWishlist(product)}
                      className="p-2 bg-white rounded-full shadow hover:bg-red-50"
                    >
                      <FaHeart className="text-red-600" size={20} />
                    </Button>
                  </div>
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {product.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">
                      ${product.price}
                    </span>
                    <Button
                      onClick={() => window.location.href = `/products/${product.id}`}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
