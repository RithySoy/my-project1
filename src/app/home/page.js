"use client"
import CarouselPage from '@/components/Carousel';  // Correct path for src/components
import NavBar from '@/components/Navbar';
import Footer from '@/components/footer';
import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsRef = collection(db, 'products');
      const productsSnap = await getDocs(productsRef);
      const productsList = productsSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
    };
    getProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavBar />
      <CarouselPage/>
     
      <main className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center text-gray-800">Welcome</h1>
        <p className="mt-4 text-center text-gray-600">
          Welcome to our website that offers a variety of second-hand products for resale!
        </p>

        {/* Product Grid Section */}
        <div className="bg-white py-16">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-700 mb-6">Available for Purchase</h2>
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none lg:h-60">
                    <img
                      src={product.imageUrl}
                      alt={product.imageAlt}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      <a href="./overview">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                    <p className="text-lg font-medium text-orange-500 mt-2">{product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-white py-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-700 mb-6 text-left">Shop by Category</h2>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="px-4 py-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      <a href="./overview">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* For You Section */}
        <div className="bg-white py-16">
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 mb-6 text-left">For You</h2>
          <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product.id} className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none lg:h-60">
                  <img
                    src={product.imageUrl}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="px-4 py-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    <a href="./overview">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                  <p className="text-lg font-medium text-orange-500 mt-2">{product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;

