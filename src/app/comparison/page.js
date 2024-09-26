'use client'

import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import React from 'react';
import Image from 'next/image';

const Comparison = () => {
  const products = [
    { id: 1, image: '/images/clothing.jpg', alt: 'Basic Tee: Aspen White' }, // Corrected path
    { id: 2, image: '/images/clothing.jpg', alt: 'Basic Tee: Aspen White' }, // Corrected path
    { id: 3, image: '/images/clothing.jpg', alt: 'Basic Tee: Aspen White' }, // Corrected path
    { id: 4, image: '/images/clothing.jpg', alt: 'Basic Tee: Aspen White' }, // Corrected path
    { id: 5, image: '/images/clothing.jpg', alt: 'Basic Tee: Aspen White' }, // Corrected path
    { id: 6, image: '/images/clothing.jpg', alt: 'Basic Tee: Aspen White' }, // Corrected path
    { id: 7, image: '/images/clothing.jpg', alt: 'Basic Tee: Aspen White' }, // Corrected path
    { id: 8, image: '/images/clothing.jpg', alt: 'Basic Tee: Aspen White' }, // Corrected path
    { id: 9, image: '/images/clothing.jpg', alt: 'Basic Tee: Aspen White' }, // Corrected path
    { id: 10, image: '/images/clothing.jpg', alt: 'Basic Tee: Aspen White' }, // Corrected path
  ];
 
  return (
    <>
    <Navbar/>
    
      <main className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md">
              <Image
                src={product.image}
                alt={product.alt || 'product image'}
                width={300}
                height={250}
                className="w-full h-auto object-cover"
              />
              <h2 className="text-lg font-semibold mt-2">{product.alt || 'Product'}</h2>
            </div>
          ))}
        </div>
      </main>
      < Footer />
    </>
  );
};

export default Comparison;
