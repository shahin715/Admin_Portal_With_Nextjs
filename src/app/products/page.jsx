"use client";

import { useState } from "react";
import Navbar from "../components/navbar/Navbar";
import SidebarCollapsed from "../components/sidebar/SidebarExpanded";
import { useCart } from "../context/CartContext";

const products = [
  {
    id: 1,
    name: "iPhone 13",
    price: 359,
    description: "Powerful smartphone with advanced camera capabilities.",
    image: "/images/product01.png",
  },
  {
    id: 2,
    name: "MacBook Air",
    price: 329,
    description: "Thin and light laptop with M1 chip.",
    image: "/images/product02.jpg",
  },
  {
    id: 3,
    name: "Bose OC25 II",
    price: 329,
    description: "Wireless noise-canceling headphones.",
    image: "/images/product03.jpg",
  },
  {
    id: 4,
    name: "Sony WH-1000XM4",
    price: 349,
    description: "Industry-leading noise cancelling headphones.",
    image: "/images/product04.jpg",
  },
  {
    id: 5,
    name: "Walnut Coffee Table",
    price: 250,
    description: "Midcentury modern wooden coffee table.",
    image: "/images/product05.webp",
  },
  {
    id: 6,
    name: "Gray Fabric Sofa",
    price: 550,
    description: "Comfortable three seater fabric sofa.",
    image: "/images/product06.jpeg",
  },
  {
    id: 7,
    name: "Nike Air Max 270",
    price: 150,
    description: "Light weight and stylish athletic shoe.",
    image: "/images/product07.avif",
  },
  {
    id: 8,
    name: "Converse Chuck Taylor All Star",
    price: 56,
    description: "Classic high-top sneakers with a canvas upper.",
    image: "/images/product08.webp",
  },
];

export default function ProductsPage() {
  const { addToCart } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100 flex-col">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg flex flex-col">
          <div className="flex justify-end p-3">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-black hover:text-red-500 text-2xl"
            >
              ✕
            </button>
          </div>
          <SidebarCollapsed />
        </div>
      )}

      {/* Main */}
      <div className="flex flex-col flex-1">
        <Navbar onToggleSidebar={toggleSidebar} />

        <div className="p-6 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">🛍️ All Products</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
              >
                {/* Image */}
                <div className="p-4 h-52 flex items-center justify-center border-b border-gray-200">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-36 object-contain"
                  />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col justify-between flex-1">
                  <h2 className="text-lg font-semibold text-gray-900 mb-1">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="text-blue-600 font-bold">${product.price}</span>
                    <button
                      onClick={() => {
                        addToCart(product);
                        alert(`${product.name} added to cart!`);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 text-sm rounded transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
