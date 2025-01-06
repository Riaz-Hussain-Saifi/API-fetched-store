"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  category: string;
  brand: string;
  rating: number;
  stock: number;
  images: string[];
}

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setSelectedImage(data.thumbnail);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    
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

    router.push('/cart');
  };

  const handleAddToWishlist = () => {
    if (!product) return;
    
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const existingProduct = storedWishlist.find((item: Product) => item.id === product.id);

    if (!existingProduct) {
      const updatedWishlist = [...storedWishlist, product];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      router.push('/wishlist');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Product not found</h1>
        <Button
          onClick={() => router.push('/products')}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={selectedImage}
              alt={product.title}
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`relative h-24 cursor-pointer rounded-lg overflow-hidden border-2 
                  ${selectedImage === image ? 'border-blue-600' : 'border-transparent'}`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="space-y-2">
            <p className="text-3xl font-bold text-blue-600">${product.price}</p>
            <div className="flex items-center space-x-2">
              <span className="text-yellow-500">★</span>
              <span>{product.rating}/5</span>
            </div>
          </div>

          <div className="space-y-2">
            <p><span className="font-semibold">Category:</span> {product.category}</p>
            <p><span className="font-semibold">Brand:</span> {product.brand}</p>
            <p><span className="font-semibold">Stock:</span> {product.stock} units</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </Button>
            <Button
              onClick={handleAddToWishlist}
              className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
            >
              <FaHeart />
              <span>Add to Wishlist</span>
            </Button>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Shipping Information:</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Free shipping on orders over $50</li>
              <li>✓ Express delivery available</li>
              <li>✓ 30-day return policy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}