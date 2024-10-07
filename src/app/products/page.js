'use client';

import Navbar from '@/components/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

const ProductsPage = () => {
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
  );

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Products</h1>

        {/* Search Input */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full max-w-lg p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Product Grid Section */}
        <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none lg:h-60">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="px-4 py-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <Link href={`/products/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">Category: {product.category}</p>
                <p className="mt-1 text-sm text-gray-500">Stock: {product.stock}</p>
                <p className="text-lg font-medium text-orange-500 mt-2">${product.price}</p>
                <p className="text-lg font-medium text-orange-500 mt-2">Date created: {product.dateCreated}</p>

              </div>
            </div>
          ))}
        </div>

        {/* No Products Found */}
        {filteredProducts.length === 0 && (
          <p className="text-center mt-4 text-gray-600">No products found.</p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-4 rounded-md shadow-sm">
            <h2 className="text-xl font-semibold">{product.name}</h2>
             <img src={product.imageUrl} alt=""/>
            <p className="text-gray-600">Category: {product.category}</p>
            <p className="text-gray-600">Price: ${product.price}</p>
            <p className="text-gray-600">Stock: {product.stock}</p>
             <p className="text-gray-600">Date Created: {product.dateCreated}</p>

            {/* <Link href={`/products/edit/${product.id}`} className='mr-10'>
              <span className="text-blue-500 hover:underline">Edit</span>
            </Link> */}
            <Link href={`/products/${product.id}`}>
              <span className="text-blue-500 hover:underline">View</span>
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

export default ProductsPage;
