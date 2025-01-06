// src/components/Products.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa"; // Import icons for cart and wishlist        FaShoppingCart, 
import HeroSection from "@/components/HeroSection";
import { Button } from "./ui/button"

export default function Products({ addToWishlist }: { addToWishlist: (product: { id: number; title: string; price: number; description: string; thumbnail: string; }) => void }) {
  const [products, setProducts] = useState<{ id: number; title: string; price: number; description: string; thumbnail: string; }[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://dummyjson.com/products");
        const data = await response.json();
        setProducts(data.products); // Extracting products array
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const handleAddToCart = (product: { id: number; title: string; price: number; description: string; thumbnail: string; }) => {
    alert(`Added "${product.title}" to Cart!`);
  };

  const handleViewDetails = (id: number) => {
    // Handle viewing product details
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Our Products"
        subtitle="Explore a wide variety of amazing products at great prices!"
        imageUrl="https://via.placeholder.com/1920x600" // Replace with relevant image URL
      />

      {/* Products Grid */}
      <div className="container mx-auto p-4">
        {loading ? (
          <p className="text-center text-lg">Loading products...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative border rounded-lg shadow-md p-4 hover:shadow-lg transition group"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={500}
                  height={200}
                  className="w-full h-40 object-cover rounded"
                />

                {/* Product Details */}
                <h2 className="mt-2 text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-600 mt-1">${product.price}</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {product.description}
                </p>

                {/* Wishlist Icon */}
                <div className="absolute top-2 right-2">
                  <FaHeart
                    className="text-yellow-500 cursor-pointer hover:text-yellow-600"
                    size={24}
                    onClick={() => addToWishlist(product)}
                  />
                </div>

                {/* View Details Button */}
                <div className="mt-4">
                  <Button
                    onClick={() => handleViewDetails(product.id)}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    View Details
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







