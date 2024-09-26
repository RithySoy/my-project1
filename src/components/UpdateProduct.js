"use client"
import { useState } from 'react';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '@/lib/firebase';  // Import your Firestore setup

const UpdateProductForm = ({ productId }) => {
  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: 0,
    stock: 0,
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  // Update product in Firestore
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const productRef = doc(db, "products", productId);  // Specify collection and productId

    try {
      await updateDoc(productRef, productData);
      console.log("Product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h2>Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <div>
          <label>Stock:</label>
          <input
            type="number"
            name="stock"
            value={productData.stock}
            onChange={handleChange}
            required
            min="0"
          />
        </div>
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default UpdateProductForm;
