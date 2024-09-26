// "use client"
import CarouselPage from '@/components/Carousel';  // Correct path for src/components
import NavBar from '@/components/Navbar';
import Footer from '@/components/footer';
import React from 'react';
import Image from 'next/image';

const images = [
  {
    id: 1,
    name: 'Furniture',
    imageSrc: '/images/furnitur.jpg',
    imageAlt: 'Furniture for resale',
    price: '$120',
    color: 'Brown',
  },
  {
    id: 2,
    name: 'Smartphone',
    imageSrc: '/images/smartphones.jpg',
    imageAlt: 'Smartphones for resale',
    price: '$250',
    color: 'Black',
  },
  {
    id: 3,
    name: 'Clothing',
    imageSrc: '/images/clothing.jpg',
    imageAlt: 'Clothing for resale',
    price: '$35',
    color: 'Various',
  },
  {
    id: 4,
    name: 'Laptop',
    imageSrc: '/images/laptop.jpg',
    imageAlt: 'Laptops for resale',
    price: '$500',
    color: 'Silver',
  },
  {
    id: 5,
    name: 'Materials',
    imageSrc: '/images/matrail.jpg',
    imageAlt: 'Educational materials for resale',
    price: '$20',
    color: 'White',
  },
  {
  id: 6,
    name: 'Furniture',
    imageSrc: '/images/furnitur.jpg',
    imageAlt: 'Furniture for resale',
    price: '$120',
    color: 'Brown',
  },
  {
    id: 7,
    name: 'Smartphone',
    imageSrc: '/images/smartphones.jpg',
    imageAlt: 'Smartphones for resale',
    price: '$250',
    color: 'Black',
  },
  {
    id: 8,
    name: 'Clothing',
    imageSrc: '/images/clothing.jpg',
    imageAlt: 'Clothing for resale',
    price: '$35',
    color: 'Various',
  },
];

const categories = [
  { id: 1, name: 'Electronics', imageSrc: '/images/tablet.jpg', description: 'Phones, laptops, and more' },
  { id: 2, name: 'Furniture', imageSrc: '/images/furnitur.jpg', description: 'Chairs, tables, and more' },
  { id: 3, name: 'Clothing', imageSrc: '/images/clothing.jpg', description: 'Shirts, pants, and more' },
  { id: 4, name: 'Educational Materials', imageSrc: '/images/matrail.jpg', description: 'Books and learning tools' },
];

const recommendedItems = [
  {
    id: 1,
    name: 'Headphones',
    imageSrc: '/images/headphones.jpg',
    imageAlt: 'Headphones for resale',
    price: '$85',
    color: 'Black',
  },
  {
    id: 2,
    name: 'Desk Chair',
    imageSrc: '/images/deskchair.jpg',
    imageAlt: 'Desk chair for resale',
    price: '$150',
    color: 'Gray',
  },
  {
    id: 3,
    name: 'Camera',
    imageSrc: '/images/camera.jpg',
    imageAlt: 'Camera for resale',
    price: '$300',
    color: 'Black',
  },
  {
    id: 4,
    name: 'Tablet',
    imageSrc: '/images/tablet.jpg',
    imageAlt: 'Tablet for resale',
    price: '$220',
    color: 'White',
  },
];

const HomePage = () => {
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
            <h2 className="text-2xl font- blod tracking-tight text-gray-700 mb-6">Available for Purchase</h2>
            <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {images.map((product) => (
                <div key={product.id} className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none lg:h-60">
                    <img
                      src={product.imageSrc}
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
                 
                  <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-xs font-bold transform rotate-12">
                    Featured
                  </div>
                </div>
              ))}
            </div>

            {/* Categories Section */}
            <div className="bg-white py-10">
              <h2 className="text-2xl font-bold-thin tracking-tight text-gray-700 mb-6 text-left">Shop by Category</h2>
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
                  {categories.map((category) => (
                    <div key={category.id} className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                      <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200">
                        <img
                          src={category.imageSrc}
                          alt={category.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      <div className="px-4 py-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          <a href="./overview">
                            <span aria-hidden="true" className="absolute inset-0" />
                            {category.name}
                          </a>
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">{category.description}</p>
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
                {recommendedItems.map((item) => (
                  <div key={item.id} className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none lg:h-60">
                      <img
                        src={item.imageSrc}
                        alt={item.imageAlt}
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                      />
                    </div>
                    <div className="px-4 py-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        <a href="./overview">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {item.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">{item.color}</p>
                      <p className="text-lg font-medium text-orange-500 mt-2">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
