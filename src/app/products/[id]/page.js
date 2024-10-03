'use client'

import React, { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { Loader2, Package, Tag, Banknote, BarChart, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import Navbar from "@/components/Navbar"

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      const productRef = doc(db, "products", id)
      try {
        const productSnap = await getDoc(productRef)
        if (productSnap.exists()) {
          setProduct(productSnap.data())
        } else {
          console.error("No such document!")
        }
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p className="text-xl font-semibold">Product not found</p>
      </div>
    )
  }

  return (
  
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
                <div className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  <span className="font-semibold">Category:</span>
                  <span className="ml-2">{product.category}</span>
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
              <div className="mt-6">
                <Link  href="/shoppingCart">
                <Button className="w-full">Add to Cart</Button>
                </Link>
              </div>
            </CardContent>
          </div>
        </div>
      </Card>
    </div>
  )
}