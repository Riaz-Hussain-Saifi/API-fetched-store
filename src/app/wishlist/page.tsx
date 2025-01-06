"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import HeroSection from "@/components/HeroSection";
import { Button } from "@/components/ui/button";

interface WishlistItem {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
  brand: string;
}

export default function Wishlist() {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(storedWishlist);
  }, []);

  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter(item => item.id !== productId);
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  const moveToCart = (product: WishlistItem) => {
    // Get current cart
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
    // Check if product already exists in cart
    const existingProduct = storedCart.find((item: WishlistItem) => item.id === product.id);
    
    if (existingProduct) {
      // If product exists, increment quantity
      const updatedCart = storedCart.map((item: WishlistItem & { quantity?: number }) =>
        item.id === product.id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      );
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      // If product doesn't exist, add it with quantity 1
      const updatedCart = [...storedCart, { ...product, quantity: 1 }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    
    // Remove from wishlist and navigate to cart
    removeFromWishlist(product.id);
    router.push('/cart');
  };

  return (
    <div>
      <HeroSection
        title="My Wishlist"
        subtitle="Items you've saved for later"
        imageUrl="/Wishlist-Hero-IMG.avif"
      />

      <div className="container mx-auto px-4 py-8">
        {wishlist.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-500 mb-8">
              Add items to your wishlist while browsing our products!
            </p>
            <Button
              onClick={() => router.push("/products")}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Browse Products
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                    {item.description}
                  </p>
                  <div className="text-sm text-gray-500 mb-4">
                    <p>Category: {item.category}</p>
                    <p>Brand: {item.brand}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-blue-600">
                      ${item.price}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => moveToCart(item)}
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        title="Move to Cart"
                      >
                        <FaShoppingCart size={18} />
                      </Button>
                      <Button
                        onClick={() => removeFromWishlist(item.id)}
                        className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                        title="Remove from Wishlist"
                      >
                        <FaTrashAlt size={18} />
                      </Button>
                    </div>
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





