'use client'; // Remove this if using Next.js in pages directory

import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Link from 'next/link';

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) 
  // ||
    //product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">{product.name}</h2>
             <img src={product.imageUrl} alt=""/>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
            <Link href={`/products/${product.id}`}>
              <span className="text-blue-500 hover:underline">Edit</span>
            </Link>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && (
        <p className="text-center mt-4 text-gray-600">No products found.</p>
      )}
    </div>
  );
};

export default SearchPage;
