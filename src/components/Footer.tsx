import Link from 'next/link';
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

export default function Footer() {

  return(
    <>
    {/* Footer */}
    <footer className="bg-gray-900 text-gray-300 mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">E-Store</h3>
              <p className="text-sm">Your one-stop shop for all your needs. Quality products, competitive prices, and excellent customer service.</p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'About', 'Products', 'Brands'].map((item) => (
                  <li key={item}>
                    <Link href={`/${item.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Contact Us</h3>
              <ul className="space-y-2">
                {[
                  { icon: FaPhone, text: '+92 3000321640' },
                  { icon: FaEnvelope, text: 'infosaifideveloper@gmail.com' },
                  { icon: FaMapMarkerAlt, text: 'Gulshion-e-Hadeed, Karachi, Pakistan' },
                ].map(({ icon: Icon, text }, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span className="text-gray-400">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Follow Us</h3>
              <div className="flex space-x-4">
                {[
                  { icon: FaFacebook, label: 'Facebook' },
                  { icon: FaTwitter, label: 'Twitter' },
                  { icon: FaInstagram, label: 'Instagram' },
                ].map(({ icon: Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} E-Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  
    </>
  )
}
