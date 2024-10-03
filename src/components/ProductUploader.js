"use client";

import { uploadProductImage } from "@/utils/uploadProductImage";
import React from "react";
import { useState } from "react";

export default function ProductUploader() {
  const [file, setFile] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: 0,
    description: "",
    stock: 0,
  });

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const parsedVal = name === "price" || name === "stock" ? parseInt(value) : value;
    setProductData((prevData) => ({
      ...prevData,
      [name]: isNaN(parsedVal) ? value : parsedVal,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      await uploadProductImage(file, productData);
      alert("Product Uploaded sucessfully!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold mb-4">Create Product</h1>
        <input type="file" onChange={handleFileChange} />
        <input
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
        />
        <input
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          type="text"
          name="category"
          placeholder="category"
          onChange={handleInputChange}
        />
        <input
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          type="number"
          name="price"
          placeholder="price"
          onChange={handleInputChange}
        />
        <textarea
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          type="text"
          name="description"
          placeholder="description"
          onChange={handleInputChange}
        ></textarea>
        <input
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          type="number"
          name="stock"
          placeholder="stock"
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload Product
        </button>
      </form>
    </div>
  );
}
