import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

const Order = () => {
  const orderItems = [
    { name: 'Basic Tee', color: 'Black', size: 'Large', price: 32.00 },
    { name: 'Basic Tee', color: 'Sienna', size: 'Large', price: 32.00 }
  ];

  const subtotal = orderItems.reduce((sum, item) => sum + item.price, 0);
  
  const total = subtotal;
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="container mx-auto p-6 lg:p-12">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Order Summary</h2>
        
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          {orderItems.map((item, index) => (
            <div key={index} className="flex items-center border-b last:border-b-0 pb-4 mb-4">
              <img 
                src={`/images/furnitur.jpg`} 
                alt="Furniture" 
                className="w-24 h-24 object-cover rounded-md mr-4"
/>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600">Color: {item.color}</p>
                <p className="text-gray-600">Size: {item.size}</p>
              </div>
              <div className="text-lg font-medium text-gray-900">${item.price.toFixed(2)}</div>
              <select defaultValue="1" className="ml-4 border border-gray-300 rounded-md py-1 px-2">
                <option value="1">1</option>
                {/* Add more options as needed */}
              </select>
            </div>
          ))}
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Order Totals</h3>
          <div className="flex justify-between text-gray-700 mb-2">
            <p>Subtotal:</p>
            <p className="font-medium text-gray-900">${subtotal.toFixed(2)}</p>
          </div>
         
          
          <div className="flex justify-between font-bold text-gray-900">
            <p>Total:</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        <button className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Confirm Order
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default Order;
