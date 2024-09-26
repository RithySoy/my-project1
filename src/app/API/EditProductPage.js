// pages/api/editProduct.js
"use client"
import { db } from '../../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { id, data } = req.body;

    try {
      const productRef = doc(db, 'products', id); // Assuming 'products' is your collection
      await updateDoc(productRef, data);
      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update product' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
