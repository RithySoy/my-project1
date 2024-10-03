'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';


const ProductDetailPage = ({ params }) => {
  const { id } = params; // Ensure the id is correctly destructured from params
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, 'products', id);
      const productSnap = await getDoc(productRef);

      if (productSnap.exists()) {
        setProductData(productSnap.data());
      } else {
        console.error('No such document!');
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

    const productRef = doc(db, 'products', id);

    try {
      await updateDoc(productRef, productData);
      console.log('Product updated successfully');
      router.push('/products'); // Redirect to products page after update
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return  <div className="flex h-screen justify-center items-center">
    <Loader2 className="h-8 w-8 animate-spin text-primary" />
  </div>;
  }

  return (

   <div>
    
     <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Stock:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Update Product
        </button>
      </form>
    </div>
   </div>
  );
};

export default ProductDetailPage;
