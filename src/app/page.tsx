"use client";

import Link from "next/link";
import HeroSection from "@/components/HeroSection"; // Reusable HeroSection component
import { FaShoppingCart, FaHeart, FaTags } from "react-icons/fa";
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Welcome to E-Shop!"
        subtitle="Explore an exclusive collection of products at unbeatable prices."
        imageUrl="/Home-Hero-IMG.avif" // Image size /1920x600
      />

      {/* Featured Categories */}
      <section className="container mx-auto p-8">
        <h2 className="text-4xl font-semibold text-center mb-8">Shop By Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Product Categories */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition ease-in-out duration-300">
            <FaTags className="text-4xl text-blue-600 mb-4" />
            <h3 className="text-xl font-medium">Products</h3>
            <Link href="/products" className="mt-2 text-blue-600 hover:text-blue-800">
              Browse Products
            </Link>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition ease-in-out duration-300">
            <FaShoppingCart className="text-4xl text-green-600 mb-4" />
            <h3 className="text-xl font-medium">Cart</h3>
            <Link href="/cart" className="mt-2 text-green-600 hover:text-green-800">
              View Cart
            </Link>
          </div>
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition ease-in-out duration-300">
            <FaHeart className="text-4xl text-yellow-600 mb-4" />
            <h3 className="text-xl font-medium">Wishlist</h3>
            <Link href="/wishlist" className="mt-2 text-yellow-600 hover:text-yellow-800">
              View Wishlist
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      <section className="bg-gray-50 py-8">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">Explore Our Top Brands</h2>
          <div className="flex justify-center space-x-8">
            <Link href="/brands">
              <Button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700 transition duration-300">
                Browse Brands
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
