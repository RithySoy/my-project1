import {
  collection,
  doc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { checkCurrentUserRole } from "@/app/getRole";

const ProductCard = ({ product }) => {
  const [role, setRole] = useState("");
  useEffect(()=>{
   const fetchRole = async () => {
    setRole(await checkCurrentUserRole())
   }
   fetchRole()
  },[product])
  const increaseView = async (id) => {
    const productRef = doc(db, "products", id);
    await updateDoc(productRef, {
      views: increment(1),
    });
  };
  return (
    <div
      key={product.id}
      className="group relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105"
    >
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:aspect-none lg:h-60">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
        />
      </div>
      <div className="px-4 py-4">
        <h3 className="text-lg font-semibold text-gray-900">
          <Link
            href={`/products/${product.id}`}
            onClick={() => increaseView(product.id)}
          >
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Category: {product.category}
        </p>
        <p className="mt-1 text-sm text-gray-500">Stock: {product.stock}</p>
        <p className="mt-1 text-sm text-gray-500">Views: {product.views}</p>
        <p className="text-lg font-medium text-orange-500 mt-2">
          ${product.price}
        </p>
        {role === "admin" && <p className="text-lg font-medium text-orange-500 mt-2">
          Date created: {product.dateCreated}
        </p>}
      </div>
    </div>
  );
};

export default ProductCard;
