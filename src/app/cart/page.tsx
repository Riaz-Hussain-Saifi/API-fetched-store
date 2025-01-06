"use client";

import { useState, useEffect } from "react";
import { FaTrashAlt, FaMinus, FaPlus } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"
import HeroSection from "@/components/HeroSection";

interface CartItem {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  quantity: number;
}

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const handleQuantityChange = (productId: number, increment: boolean) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = increment ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const handleRemoveItem = (productId: number) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    updateCart(updatedCart);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert("Thank you for your purchase!");
    updateCart([]);
    router.push("/products");
  };

  return (
    <div>
    <HeroSection
      title="Shopping Cart"
      subtitle="Review your products before proceeding to checkout"
      imageUrl="/Cart-Hero-IMG.avif" // Replace with relevant image
    />
    <div className="container mx-auto px-4 py-8">

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <Button
            onClick={() => router.push("/products")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <div className="relative w-24 h-24 flex-shrink-0">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded"
                  />
                </div>

                <div className="flex-grow text-center sm:text-left">
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => handleQuantityChange(item.id, false)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <FaMinus className="text-gray-600" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    onClick={() => handleQuantityChange(item.id, true)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    <FaPlus className="text-gray-600" />
                  </Button>
                  <Button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1 hover:bg-red-100 rounded ml-2"
                  >
                    <FaTrashAlt className="text-red-600" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${calculateTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleCheckout}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}


