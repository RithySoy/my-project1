"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from '@/lib/firebase';
import Navbar from './Navbar';
import Footer from './footer';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => (
        { id: doc.id, ...doc.data() }
      )));
    }
    fetchProduct();
  }, []);

  const handleEdit = (id) => {
    router.push(`/products/edit/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "products", id));
    alert(`Deleted product with id: ${id}`);
  };

  const handleCreate = () => {
    router.push('/uploadProduct/'); // Redirect to product creation page
  };

  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Manage your Products</h1>
      <button
        onClick={handleCreate}
        className="bg-green-500 text-white py-2 px-4 rounded mb-4 hover:bg-green-600"
      >
        Create Product
      </button>
      <ul className="space-y-4">
        {products.map((product) => (
          <li key={product.id} className="border p-4 rounded-lg shadow-sm flex items-center space-x-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(product.id)}
                className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white py-1 px-4 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Footer />
    </div>
  );
};

export default ProductList;
