'use client';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsData);
    };

    fetchProducts();
  }, []);

  return (
 <div>
  <Navbar/>
  <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10">Products</h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <li key={product.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1">
            <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <p className="text-xl font-semibold mb-2">{product.name}</p>
              <p className="text-gray-600 mb-4">${product.price}</p>
              {/* <Link href={`/products/${product.id}`}>
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Edit</button>
              </Link> */}
            </div>
          </li>
        ))}
      </ul>
    </div>
 </div>
  );
}