

// src/app/products/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductDetails() {
  const { id } = useParams(); // Extracting id from useParams
  const [product, setProduct] = useState<{
    thumbnail: string;
    title: string;
    price: number;
    description: string;
    category: string;
    brand: string;
    rating: number;
    stock: number;
    images: string[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch product details based on ID
  useEffect(() => {
    if (!id) return; // Wait for the `id` to be available
    async function fetchProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg">Loading product details...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <div>
          {product && (
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={500}
              height={500}
              className="w-full rounded shadow-md"
            />
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          {product && (
            <>
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-gray-600 text-lg">${product.price}</p>
              <p className="text-gray-700">{product.description}</p>
            </>
          )}

          <div className="space-y-2">
            {product && (
              <>
                <p className="font-medium">
                  <span className="text-gray-500">Category:</span> {product.category}
                </p>
                <p className="font-medium">
                  <span className="text-gray-500">Brand:</span> {product.brand}
                </p>
                <p className="font-medium">
                  <span className="text-gray-500">Rating:</span> {product.rating} ⭐
                </p>
                <p className="font-medium">
                  <span className="text-gray-500">Stock:</span> {product.stock} units
                </p>
              </>
            )}
          </div>

          {/* Additional Details */}
          <div className="bg-gray-100 p-4 rounded-md shadow-inner space-y-2">
            <p className="font-medium text-lg">Delivery & Warranty:</p>
            <p className="text-gray-600">
              <strong>Delivery Process:</strong> Free delivery within 3-5
              business days. Express shipping available.
            </p>
            <p className="text-gray-600">
              <strong>Warranty:</strong> 12-month manufacturer warranty
              included.
            </p>
          </div>
        </div>
      </div>

      {/* Other Images */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Product Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {product && product.images &&
            product.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`Product Image ${index + 1}`}
                width={160}
                height={160}
                className="w-full h-40 object-cover rounded shadow"
              />
            ))}
        </div>
      </div>
    </div>
  );
}











