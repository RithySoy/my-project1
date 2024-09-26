import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';
import { ShoppingCart } from 'lucide-react';
import Search from '@/components/Search';
import Link from 'next/link';


const product = {
  name: 'Sofa',
  price: '$192',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The Sofa includes two black, two white, and two heather gray Basic Tees. Ideal for daily wear with a classic style that matches everything.',
  images: [
    {
      src: 'images/furnitur.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
  ],
};


export default function ProductOverview() {
  return (
    <div className="bg-white">
      <Navbar />


      {/* Header Section with Search and Shopping Cart */}
      <div className="flex justify-between items-center px-6 py-4">
        {/* Search Bar */}
        <Search />


        {/* Shopping Cart Icon */}
        <div className="ml-auto">
       <Link href="/shoppingCart">
        <ShoppingCart size={36} className="text-gray-700 hover:text-orange-500 cursor-pointer" />
      </Link>
      </div>
      </div>


      {/* Main Content */}
      <div className="pt-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Image */}
          <div className="flex justify-center flex-col">
            <img
              src={product.images[0].src}
              alt={product.images[0].alt}
              className="rounded-lg object-cover object-center max-w-full"
            />
            {/* Product Header */}
            <div className="text-center text-left ">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {product.name}
              </h1>
              <p className="text-2xl text-red-700 mt-4">{product.price}</p>
            </div>
          </div>


          {/* Product Details */}
          <div className="text-left">
            <p className="text-lg text-green-600 mb-6">{product.description}</p>


            {/* Highlights */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900">Highlights</h3>
              <ul role="list" className="list-disc mt-4 pl-4 text-gray-600">
                {product.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>


            {/* Details */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900">Details</h3>
              <p className="mt-2 text-gray-600">{product.details}</p>
            </div>


            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <a
                href="./home"
                className="inline-block rounded-md bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700"
              >
                Back to Shop
              </a>
              <a
                href="./order"
                className="inline-block rounded-md bg-green-600 px-8 py-3 text-base font-medium text-white hover:bg-green-700"
              >
                Order Now
              </a>
            </div>
          </div>
        </div>


        {/* Call to Action */}
        <div className="mt-16 flex justify-center">
          <a
            href="/order"
            className="rounded-md bg-yellow-500 px-10 py-4 text-lg font-medium text-white hover:bg-yellow-600"
          >
            Get Your Basic Tee 6-Pack Today!
          </a>
        </div>
      </div>


      <Footer />
    </div>
  );
}






