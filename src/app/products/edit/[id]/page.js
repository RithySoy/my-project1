"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2 } from "lucide-react";

const ProductDetailPage = ({ params }) => {
  const { id } = params; // Ensure the id is correctly destructured from params
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProductData(productSnap.data());
      } else {
        console.error("No such document!");
      }
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedVal = name === "price" || name === "stock" ? parseInt(value) : value;
    setProductData((prevData) => ({
      ...prevData,
      [name]: isNaN(parsedVal) ? value : parsedVal,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productRef = doc(db, "products", id);

    try {
      await updateDoc(productRef, productData);
      console.log("Product updated successfully");
      router.push("/products"); // Redirect to products page after update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-3xl p-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Edit Product</h1>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">Product Name</label>
              <input
                type="text"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
                className="mt-2 block w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={productData.price}
                onChange={handleChange}
                required
                min="0"
                className="mt-2 block w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                value={productData.stock}
                onChange={handleChange}
                required
                min="0"
                className="mt-2 block w-full p-4 text-lg border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-lg text-xl font-semibold transition duration-300"
            >
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductDetailPage;
