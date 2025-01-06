"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "./ui/button";
import {
  FaHome,
  FaTags,
  FaInfoCircle,
  FaStore,
  FaShoppingCart,
  FaHeart,
  FaBars,
  FaTimes
} from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setCartCount(cart.length);
      setWishlistCount(wishlist.length);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    updateCounts();
    window.addEventListener('storage', updateCounts);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('storage', updateCounts);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
              E-Store
            </Link>

            {/* Mobile menu Button */}
            <Button
              className="md:hidden hover:bg-blue-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              variant="ghost"
            >
              {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
            </Button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {[
                { href: "/", icon: FaHome, label: "Home" },
                { href: "/about", icon: FaInfoCircle, label: "About" },
                { href: "/products", icon: FaStore, label: "Products" },
                { href: "/brands", icon: FaTags, label: "Brands" },
              ].map(({ href, icon: Icon, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center space-x-1 hover:text-blue-600 transition-colors"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </Link>
              ))}
            </div>

            {/* Cart and Wishlist Icons */}
            <div className="hidden md:flex items-center space-x-4">
              {[
                { href: "/wishlist", icon: FaHeart, count: wishlistCount },
                { href: "/cart", icon: FaShoppingCart, count: cartCount },
              ].map(({ href, icon: Icon, count }) => (
                <Link
                  key={href}
                  href={href}
                  className="relative p-2 hover:bg-blue-50 rounded-full transition-colors"
                >
                  <Icon className="h-6 w-6 text-gray-600 hover:text-blue-600" />
                  {count > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {count}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96' : 'max-h-0'
          }`}>
            <div className="py-4 space-y-4">
              {[
                { href: "/", icon: FaHome, label: "Home" },
                { href: "/about", icon: FaInfoCircle, label: "About" },
                { href: "/products", icon: FaStore, label: "Products" },
                { href: "/brands", icon: FaTags, label: "Brands" },
                { href: "/wishlist", icon: FaHeart, label: "Wishlist", count: wishlistCount },
                { href: "/cart", icon: FaShoppingCart, label: "Cart", count: cartCount },
              ].map(({ href, icon: Icon, label, count }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center space-x-2 px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                  <span>{label}</span>
                  {count !== undefined && count > 0 && <span className="text-sm text-gray-500">({count})</span>}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar