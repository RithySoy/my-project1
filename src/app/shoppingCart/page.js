"use client";

import React, { useState, useEffect } from 'react';
import { Check, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

const CartItem = ({ item, removeItem, updateQuantity, toggleSelect, isSelected }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex items-center space-x-6 hover:shadow-lg transition">
    {/* Product Image */}
    <img src={item.imageUrl} alt={item.name} className="w-32 h-32 object-cover rounded-lg" />

    {/* Product Details */}
    <div className="flex-grow space-y-2">
      <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
      <p className="text-sm text-gray-500">{item.color}</p>

      {item.stock > 0 ? (
        <p className="text-green-500 flex items-center text-sm">
          <Check size={18} className="mr-1" /> In stock
        </p>
      ) : (
        <p className="text-yellow-500 flex items-center text-sm">
          <Clock size={18} className="mr-1" /> Ships in {item.shippingDelay}
        </p>
      )}
    </div>

    {/* Quantity and Price */}
    <div className="flex flex-col items-center space-y-4">
      <select
        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <p className="text-lg font-bold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
    </div>

    {/* Remove Button */}
    <button
      className="ml-6 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition ease-in-out"
      onClick={() => removeItem(item.id)}
    >
      Remove
    </button>
    
    {/* Compare Button */}
    <button
      className={`ml-6 py-1 px-3 rounded-md transition ease-in-out ${
        isSelected ? 'bg-green-500 text-white' : 'bg-blue-500 text-white'
      } hover:bg-opacity-80`}
      onClick={() => toggleSelect(item.id)}
    >
      {isSelected ? 'Deselect' : 'Compare'}
    </button>
  </div>
);

const Comparison = ({ items, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-2xl w-full shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Product Comparison</h2>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.id} className="border p-4 rounded-lg shadow-sm">
            <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-600">{item.color}</p>
            <p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
            <p className="mt-2">{item.stock > 0 ? 'In Stock' : `Ships in ${item.shippingDelay}`}</p>
            <p className="text-sm mt-2 text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
      <button
        className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition ease-in-out"
        onClick={onClose}
      >
        Close Comparison
      </button>
    </div>
  </div>
);

const ShoppingCart = () => {
  const getCart = () => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  };

  const [cartItems, setCartItems] = useState(getCart());
  const [selectedItems, setSelectedItems] = useState([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    const storedCart = getCart();
    setCartItems(storedCart);
  }, []);

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const toggleSelect = (id) => {
    setSelectedItems(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(itemId => itemId !== id);
      } else if (prevSelected.length < 2) {
        return [...prevSelected, id];
      } else {
        return prevSelected;
      }
    });
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Include Navbar at the top */}
      <Navbar />

      <div className="max-w-7xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items Section */}
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Shopping Cart</h1>

          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                removeItem={removeItem}
                updateQuantity={updateQuantity}
                toggleSelect={toggleSelect}
                isSelected={selectedItems.includes(item.id)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
          )}
        </div>

        {/* Sidebar Section */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Summary</h2>
            <p className="text-lg font-semibold text-gray-700">Total: ${total.toFixed(2)}</p>
            <Link href="/payment">
              <button className="mt-4 bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition ease-in-out">
                Proceed to Checkout
              </button>
            </Link>
          </div>

          {selectedItems.length === 2 && (
            <button
              className="bg-green-600 text-white w-full py-2 rounded-md hover:bg-green-700 transition ease-in-out"
              onClick={() => setShowComparison(true)}
            >
              Compare Selected Items
            </button>
          )}

          <Link href="/products">
            <span className="text-blue-600 hover:text-blue-800 font-medium transition ease-in-out block text-center">
              Continue Shopping
            </span>
          </Link>
        </div>
      </div>

      {showComparison && (
        <Comparison
          items={cartItems.filter(item => selectedItems.includes(item.id))}
          onClose={() => setShowComparison(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default ShoppingCart;
