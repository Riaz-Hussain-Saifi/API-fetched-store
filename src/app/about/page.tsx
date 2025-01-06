"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import Image from "next/image";
import { Button } from "@/components/ui/button"

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
}

export default function About() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
        setError(null);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="border rounded-lg shadow-md p-4 animate-pulse">
          <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        title="About Us"
        subtitle="Learn more about our mission, products, and how we use APIs to bring you the best!"
        imageUrl="/About-Hero-IMG.avif"
      />

      {/* About the API Section */}
      <section className="container mx-auto p-4 sm:p-6 mt-8">
        <h2 className="text-3xl font-semibold text-center mb-6">How We Fetch Products</h2>
        <p className="text-lg text-gray-700 mb-4">
          Our products are fetched from a public API, <strong>DummyJSON</strong>. We fetch data
          including product details like title, description, price, and images to display them
          dynamically on our website. This helps us provide up-to-date products and offer a
          smooth shopping experience.
        </p>
        <p className="text-lg text-gray-700 mb-6">
          With real-time data fetching, we ensure that our catalog remains fresh, and users can
          easily explore and shop for their favorite items. Here are some products that we display
          using the API:
        </p>

        {/* Displaying products with loading and error states */}
        <div className="mt-8">
          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <div className="text-center p-6 bg-red-50 rounded-lg">
              <p className="text-red-600">{error}</p>
              <Button 
                onClick={() => window.location.reload()} 
                className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="border rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300 flex flex-col"
                >
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-cover rounded"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <h3 className="text-xl font-semibold line-clamp-1">{product.title}</h3>
                  <p className="text-gray-600 mt-1 font-medium">${product.price.toFixed(2)}</p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2 flex-grow">{product.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About the Company Section */}
      <section className="container mx-auto p-4 sm:p-6 mt-8 bg-gray-100 rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Mission</h2>
        <p className="text-lg text-gray-700 mb-4">
          We are committed to providing quality products at affordable prices. Our mission is to
          create a seamless shopping experience for everyone, allowing users to discover and shop
          the best items through easy-to-use interfaces, dynamic product displays, and swift checkout
          processes.
        </p>
        <p className="text-lg text-gray-700">
          Whether you are looking for gadgets, clothing, or beauty products, we aim to offer a wide
          range of carefully selected items to meet every need.
        </p>
      </section>
    </div>
  );
}
