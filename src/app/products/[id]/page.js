"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useRouter for navigation
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Package, Tag, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter(); // Initialize the router
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get cart from localStorage or initialize an empty cart
  const getCart = () => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      return storedCart ? JSON.parse(storedCart) : [];
    }
    return [];
  };

  const [cart, setCart] = useState(getCart());

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", id);
      try {
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          setProduct(productSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    const updatedCart = [...cart, { ...product, quantity: 1 }];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleBuyNow = () => {
    // Redirect to the payment page
    router.push("/payment"); // Assuming you have a payment page at this route
  };

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p className="text-xl font-semibold">Product not found</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover md:h-full"
              />
            </div>
            <div className="md:w-1/2 p-6">
              <CardHeader>
                <CardTitle className="text-3xl font-bold">{product.name}</CardTitle>
                <Badge variant="secondary" className="mt-2">
                  {product.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Tag className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Price:</span>
                    <span className="ml-2">${product.price}</span>
                  </div>
                  <div className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Stock:</span>
                    <span className="ml-2">{product.stock} units</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-4 w-4" />
                    <span className="font-semibold">Description:</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
                <div className="mt-6 flex space-x-4">
                  <Button className="w-full" onClick={handleAddToCart}>
                    Add to Cart
                  </Button>
                  <Button className="w-full" variant="primary" onClick={handleBuyNow}>
                    Buy Now
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
