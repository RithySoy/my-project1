"use client"

import { useState } from 'react';
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from '@/lib/firebase';  // Import your Firestore setup

const UpdateProductForm = ({ productId }) => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
    imageUrl: "",  // Added imageUrl field
    description: "",  // Added description field
    dateCreated: Timestamp.now(),
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    });
  };

  // Update product in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const productRef = doc(db, "products", productId);  // Specify collection and productId

    try {
      await updateDoc(productRef, {
        ...productData,
        dateCreated: Timestamp.now(), // Update the dateCreated field
      });
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Product Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Stock:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
            min="0"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Image URL:</label>
          <input
            type="url"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block mb-1">Description:</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-3 py-2 border rounded-md"
          ></textarea>
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProductForm;