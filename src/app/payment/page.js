import React from 'react';
import Link from 'next/link';
import { CheckIcon } from 'lucide-react';

const OrderConfirmation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-16 rounded-lg shadow-lg max-w-3xl w-full text-center">
        <div className="flex justify-center mb-12">
          <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center">
            <CheckIcon className="w-16 h-16 text-black" />
          </div>
        </div>
        <h2 className="text-4xl font-semibold mb-6">Order Confirmed!</h2>
        <p className="text-gray-700 text-lg mb-10">
          Thank you for your purchase. Your order is being processed, and we will notify you once it has shipped.
        </p>
        <div className="flex justify-center space-x-10">
          {/* Link to order details page */}
          

          {/* Link to continue shopping (e.g., product page) */}
          <Link href="/products" passHref>
            <button className="px-8 py-4 bg-black text-white text-lg rounded-md hover:bg-gray-800 transition-colors">
              CONTINUE SHOPPING
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
