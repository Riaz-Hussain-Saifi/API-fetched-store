// src/components/Wishlist.tsx
"use client";

import React from "react";
import {  FaTrashAlt } from "react-icons/fa"; // Import icons for wishlist and delete   FaHeart,
import HeroSection from "@/components/HeroSection";
import Image from "next/image"

interface WishlistProps {
  wishlist: { id: number; title: string; price: number; description: string; thumbnail: string; }[];
  setWishlist: React.Dispatch<React.SetStateAction<{ id: number; title: string; price: number; description: string; thumbnail: string; }[]>>;
}

export default function Wishlist({ wishlist, setWishlist }: WishlistProps) {
  // Function to handle removal of product from wishlist
  const handleRemoveFromWishlist = (productId: number) => {
    setWishlist((prevWishlist) => prevWishlist.filter((product) => product.id !== productId));
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        title="Your Wishlist"
        subtitle="Check out all the products you love!"
        imageUrl="/Wishlist-Hero-IMG.avif" // Image size /1920x600
      />

      {/* Wishlist Grid */}
      <div className="container mx-auto p-4">
        {wishlist.length === 0 ? (
          <p className="text-center text-lg">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="relative border rounded-lg shadow-md p-4 hover:shadow-lg transition group"
              >
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={80}
                  height={40}
                  className="w-full h-40 object-cover rounded"
                />

                {/* Product Details */}
                <h2 className="mt-2 text-xl font-semibold">{product.title}</h2>
                <p className="text-gray-600 mt-1">${product.price}</p>
                <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                  {product.description}
                </p>

                {/* Remove from Wishlist Icon */}
                <div className="absolute top-2 right-2">
                  <FaTrashAlt
                    className="text-red-600 cursor-pointer hover:text-red-700"
                    size={24}
                    onClick={() => handleRemoveFromWishlist(product.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}






