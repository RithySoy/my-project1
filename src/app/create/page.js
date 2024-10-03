// "use client"
// import React, { useState } from 'react';

// const CreatePage = () => {
   
//   const [formData, setFormData] = useState({
//     title: '',
//     type: '',
//     size: '',
//     color: '',
//     description: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // Here you would typically send the data to your backend API
//     console.log('Form data submitted:', formData);
//     // Reset form after submission
//     setFormData({
//       title: '',
//       type: '',
//       size: '',
//       color: '',
//       slug: '',
//       description: '',
//     });
//   };

//      return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Add a Product</h1>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
           
//           <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
//           <input
//             type="text"
//             id="title"
//             name="title"
//             value={formData.title}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="type" className="block text-sm font-medium text-gray-700">Type</label>
//           <input
//             type="text"
//             id="type"
//             name="type"
//             value={formData.type}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="size" className="block text-sm font-medium text-gray-700">Size</label>
//           <input
//             type="text"
//             id="size"
//             name="size"
//             value={formData.size}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="color" className="block text-sm font-medium text-gray-700">Color</label>
//           <input
//             type="text"
//             id="color"
//             name="color"
//             value={formData.color}
//             onChange={handleInputChange}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             required
//           />
//         </div>
        
//         <div>
//           <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//           <textarea
//             id="description"
//             name="description"
//             value={formData.description}
//             onChange={handleInputChange}
//             rows={4}
//             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
//             required
//           ></textarea>
//         </div>
//         <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//           Add Product
//         </button>
//       </form>
    
//     </div>
//   );
// };

// export default CreatePage;
