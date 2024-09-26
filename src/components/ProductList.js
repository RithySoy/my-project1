"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { doc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from '@/lib/firebase';




// const products = querySnapshot.docs.map(doc => doc.data()); 

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  useEffect(()=> {
    const fetchProduct = async ()=>{
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => (
        {id: doc.id,
          ...doc.data()})));
    }
    fetchProduct();
  },[])
  const handleEdit = (id) => {
    // Add logic to handle editing the product
    router.push(`/products/${id}`);
    
  };

   const handleDelete = async(id) => {
    // Add logic to handle deleting the product
    
    await deleteDoc(doc(db, "products", id));
    alert(`Delete product with id: ${id}`);
  };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
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
    </div>
  );
};

export default ProductList;
