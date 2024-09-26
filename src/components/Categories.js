'use client'
import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


const products = [
  { id: 1, name: 'Furniture', color: 'Brown', price: 120, image: '/images/furniture.jpg', featured: true },
  { id: 2, name: 'Smartphone', color: 'Black', price: 250, image: '/images/smartphone.jpg', featured: true },
  { id: 3, name: 'Clothing', color: 'Various', price: 35, image: '/images/clothing.jpg', featured: true },
  { id: 4, name: 'Laptop', color: 'Silver', price: 500, image: '/images/laptop.jpg', featured: true },
];

const ProductCard = ({ name, color, price, image, featured }) => (
  <Card className="w-full max-w-sm overflow-hidden shadow-lg">
    <CardHeader className="relative p-0">
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={name}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
      {featured && (
        <Badge className="absolute top-2 right-2 bg-orange-500 text-white">
          Featured
        </Badge>
      )}
    </CardHeader>
    <CardContent className="p-4">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p className="text-gray-600">{color}</p>
    </CardContent>
    <CardFooter className="bg-gray-100 px-4 py-2">
      <span className="text-orange-500 font-bold">${price}</span>
    </CardFooter>
  </Card>
);

const ProductCategoryCards = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">Available for Purchase</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductCategoryCards;