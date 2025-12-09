/*
Elegant Revolution â€” Premium single-file React component (Tailwind CSS)

How to use:
1. Create a React app (Next.js or create-react-app) with Tailwind CSS configured.
2. Drop this file as `ElegantRevolutionSite.jsx` in your components/pages folder.
3. Install shadcn/ui & lucide-react if you want (optional imports are included).
4. Replace placeholder images and product data with your real assets.
5. Deploy to Vercel / Netlify and point domain `elrevo.com` to the deploy.

Notes:
- This is a starting, production-ready UI scaffold, mobile-first and responsive.
- Uses Tailwind utility classes for styling. No inline colors are required â€” palette defined in classes.
*/

import React from "react";
import { ShoppingCart, Mail, Instagram, Twitter, Facebook } from "lucide-react";

// --- Sample product data (replace with real images & prices) ---
const products = [
  { id: 1, name: "The Classic Tailored Jacket", price: "AED 1,450", img: "https://picsum.photos/seed/jacket/800/1000" },
  { id: 2, name: "Silk-Cotton Shirt", price: "AED 420", img: "https://picsum.photos/seed/shirt/800/1000" },
  { id: 3, name: "Midnight Knit Sweater", price: "AED 560", img: "https://picsum.photos/seed/sweater/800/1000" },
  { id: 4, name: "Signature Leather Belt", price: "AED 250", img: "https://picsum.photos/seed/belt/800/1000" },
];

export default function ElegantRevolutionSite() {
  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      {/* NAV */}
      <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-yellow-400 flex items-center justify-center text-white font-semibold text-lg">ER</div>
          <div>
            <h1 className="text-xl font-serif tracking-wide">Elegant Revolution</h1>
            <p className="text-xs text-gray-500 -mt-0.5">Luxury made timeless</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a href="#shop" className="hover:underline">Shop</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <button className="flex items-center gap-2 border px-3 py-2 rounded-full text-sm">
            <ShoppingCart size={16} /> Cart
          </button>
        </nav>

        <div className="md:hidden">
          <button className="p-2">Menu</button>
        </div>
      </header>

      {/* HERO */}
      <section className="relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-12">
          <div className="space-y-6">
            <p className="uppercase text-sm text-gray-500">Introducing</p>
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">Elegant Revolution â€” Classic. Modern. Yours.</h2>
            <p className="text-gray-600 max-w-xl">A premium collection of timeless silhouettes crafted from luxurious fabrics. Minimal, refined and made to last â€” design that honours tradition and breaks it at the same time.</p>
            <div className="flex items-center gap-4">
              <a href="#shop" className="px-6 py-3 bg-black text-white rounded-full text-sm shadow">Shop the Collection</a>
              <a href="#about" className="px-6 py-3 border rounded-full text-sm">Discover Our Story</a>
            </div>

            <div className="flex gap-4 mt-6 items-center text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">âœ“</div>
                <div>
                  <div className="font-medium">Ethically Sourced</div>
                  <div className="text-xs">High-quality responsibly sourced fabrics</div>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-4">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">â˜…</div>
                <div>
                  <div className="font-medium">Limited Editions</div>
                  <div className="text-xs">Small-batch premium runs</div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-first md:order-last">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img src="https://picsum.photos/seed/hero/1200/1400" alt="Elegant Revolution" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* SHOP GRID */}
      <section id="shop" className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-serif">Featured Pieces</h3>
          <a href="#" className="text-sm text-gray-500">View all</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div key={p.id} className="border rounded-2xl overflow-hidden group">
              <div className="relative">
                <img src={p.img} alt={p.name} className="w-full h-72 object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute top-3 right-3 bg-white/80 backdrop-blur rounded-full p-2">
                  <button title="Add to cart" className="p-1">
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>

              <div className="p-4">
                <h4 className="font-medium">{p.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{p.price}</p>
                <div className="mt-4 flex gap-3">
                  <button className="flex-1 border rounded-full py-2 text-sm">Quick view</button>
                  <button className="flex-1 bg-black text-white rounded-full py-2 text-sm">Add</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-3xl font-serif">Our Philosophy</h3>
            <p className="text-gray-600 mt-4">Elegant Revolution stands for refined minimalism. We believe clothing should be honest, high-quality and responsibly made. Our artisans craft pieces with attention to detail â€” classic shapes given a modern cut.</p>

            <ul className="mt-6 space-y-3 text-sm text-gray-600">
              <li>â€¢ Premium fabrics and meticulous tailoring</li>
              <li>â€¢ Minimal design language, long-lasting wear</li>
              <li>â€¢ Environmentally considerate manufacturing</li>
            </ul>

            <div className="mt-6">
              <a href="#contact" className="px-6 py-3 border rounded-full">Become a VIP</a>
            </div>
          </div>

          <div>
            <div className="rounded-2xl overflow-hidden shadow">
              <img src="https://picsum.photos/seed/about/900/700" alt="About" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER / CONTACT */}
      <section id="contact" className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white border rounded-2xl p-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-2xl font-serif">Stay in the loop</h4>
              <p className="text-gray-600 mt-2">Sign up for exclusive drops, early access and behind-the-scenes stories.</p>
              <form className="mt-6 flex gap-3">
                <input type="email" placeholder="Your email" className="flex-1 border rounded-full px-4 py-3" />
                <button className="px-6 py-3 bg-black text-white rounded-full">Subscribe</button>
              </form>

              <div className="flex gap-3 mt-6 text-sm text-gray-500 items-center">
                <Mail size={16} />
                <div>hello@elrevo.com</div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium">Visit our Atelier (by appointment)</h4>
              <p className="text-gray-600 mt-2 text-sm">Dubai â€” location provided after appointment booking.</p>

              <div className="mt-4">
                <button className="px-6 py-3 border rounded-full">Book Appointment</button>
              </div>

              <div className="mt-6 text-sm">
                <div className="font-medium">Follow</div>
                <div className="flex gap-3 mt-3">
                  <button title="Instagram" className="p-2"><Instagram size={18} /></button>
                  <button title="Twitter" className="p-2"><Twitter size={18} /></button>
                  <button title="Facebook" className="p-2"><Facebook size={18} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">ER</div>
              <div>
                <div className="font-medium">Elegant Revolution</div>
                <div className="text-xs text-gray-500">Luxury made timeless</div>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-500">Â© {new Date().getFullYear()} Elegant Revolution â€” All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
