"use client";

import React, { useState, useEffect } from 'react';
import { Check, Clock } from 'lucide-react';
import Link from 'next/link';

const CartItem = ({ item, removeItem }) => (
  <div className="flex items-center py-6 border-b last:border-b-0">
    
    {/* Product Image */}
    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg mr-6" />
    
    {/* Product Details */}
    <div className="flex-grow">
      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
      <p className="text-gray-500">{item.color}</p>

      {item.stock > 0 ? (
        <p className="text-green-500 flex items-center mt-2">
          <Check size={18} className="mr-1" /> In stock
        </p>
      ) : (
        <p className="text-yellow-500 flex items-center mt-2">
          <Clock size={18} className="mr-1" /> Ships in {item.shippingDelay}
        </p>
      )}
    </div>

    {/* Quantity and Price */}
    <div className="flex items-center space-x-6">
      <select
        className="border rounded-md p-2 focus:outline-none focus:ring focus:border-blue-300"
        defaultValue={item.quantity}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <p className="text-lg font-semibold text-gray-900">${item.price.toFixed(2)}</p>
    </div>

    {/* Remove Button */}
    <button
      className="ml-6 text-red-600 hover:text-red-800 hover:underline"
      onClick={() => removeItem(item.id)} // Make sure item.id is unique for each product
    >
      Remove
    </button>
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

  useEffect(() => {
    const storedCart = getCart();
    setCartItems(storedCart);
  }, []);
  const removeItem = (id) => {
    // Find the first occurrence of the item with the matching id and remove only that one
    const index = cartItems.findIndex(item => item.id === id);
    if (index === -1) return;

    const updatedCart = [...cartItems];
    updatedCart.splice(index, 1);

    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Page Title */}
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="bg-white shadow-lg rounded-lg divide-y divide-gray-200">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem key={item.id} item={item} removeItem={removeItem} />
          ))
        ) : (
          <p className="text-gray-500 text-center py-10">Your cart is empty.</p>
        )}
      </div>

      {/* Cart Total */}
      <div className="flex justify-between items-center mt-8">
        <a href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
          Continue Shopping
        </a>
        <div className="text-right">
          <p className="text-xl font-semibold text-gray-900">Total: ${total.toFixed(2)}</p>
         {/* Link to payment/checkout page */}
        <Link href="/payment">
          <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition">
            Proceed to Checkout
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
