"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Loader2, Package, Tag, FileText, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { checkCurrentUserRole } from "@/app/getRole";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0);
  const [role, setRole] = useState("");
  const [showAlert, setShowAlert] = useState(false); // State to show/hide alert
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
      setRole(await checkCurrentUserRole());
      try {
        const productSnap = await getDoc(productRef);
        if (productSnap.exists()) {
          const productData = productSnap.data();
          setProduct(productData);
          setViews(productData.views);
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
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);
    if (existingItemIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity + 1,
      };
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, id: id, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
    setShowAlert(true); // Show alert when the product is added to cart

    // Auto-hide alert after 3 seconds
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleBuyNow = () => {
    router.push("/payment");
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

      <div className="container mx-auto px-4 py-10">
        {showAlert && (
          <Alert variant="success" className="mb-6">
            <AlertTitle>Added to Cart</AlertTitle>
            <AlertDescription>
              You have successfully added <strong>{product.name}</strong> to
              your cart!
            </AlertDescription>
          </Alert>
        )}
        <Card className="shadow-lg rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 h-full">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="md:w-1/2 p-6 space-y-4">
              <CardHeader>
                <CardTitle className="text-4xl font-bold text-gray-800">
                  {product.name}
                </CardTitle>
                <Badge variant="secondary" className="mt-2 text-lg">
                  {product.category}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-gray-600">
                  <div className="flex items-center text-lg">
                    <Tag className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="font-semibold">Price:</span>
                    <span className="ml-2 text-gray-900">${product.price}</span>
                  </div>
                  <div className="flex items-center text-lg">
                    <Package className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="font-semibold">Stock:</span>
                    <span className="ml-2 text-gray-900">
                      {product.stock} units
                    </span>
                  </div>
                  <div className="flex items-center text-lg">
                    <Eye className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="font-semibold">Views:</span>
                    <span className="ml-2 text-gray-900">{views}</span>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="text-gray-600 space-y-2">
                  <div className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-gray-500" />
                    <span className="font-semibold">Description:</span>
                  </div>
                  <p className="text-base">{product.description}</p>
                </div>
                <div className="mt-8 flex space-x-4">
                  {!role ? (
                    <Button className="w-full" onClick={()=> router.push("/login")}>Buy now</Button>
                  ) : role === "user" ? (
                    <div className="flex space-x-4 w-full">
                      <Button className="w-full" onClick={handleAddToCart}>
                        Add to Cart
                      </Button>
                      <Button
                        className="w-full bg-green-500 hover:bg-green-600"
                        onClick={handleBuyNow}
                      >
                        Buy Now
                      </Button>
                    </div>
                  ) : (
                    <Button className="w-full" variant="secondary" disabled>
                      Admin View Only
                    </Button>
                  )}
                </div>
              </CardContent>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
