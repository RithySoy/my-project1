'use client';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useState, useEffect } from 'react';
import { Loader2, Search } from 'lucide-react';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

export default function Component() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [selectedProduct1, setSelectedProduct1] = useState(null);
  const [selectedProduct2, setSelectedProduct2] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCollection);
      const productsList = productsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsList);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleSearch1 = (e) => {
    setSearchTerm1(e.target.value);
  };

  const handleSearch2 = (e) => {
    setSearchTerm2(e.target.value);
  };

  const handleSelect1 = (value) => {
    const selected = products.find(product => product.id === value);
    setSelectedProduct1(selected);
    setSearchTerm1(selected.name);
  };

  const handleSelect2 = (value) => {
    const selected = products.find(product => product.id === value);
    setSelectedProduct2(selected);
    setSearchTerm2(selected.name);
  };

  const filteredProducts1 = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm1.toLowerCase())
  );

  const filteredProducts2 = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm2.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-6 bg-gray-50">
        <h1 className="text-3xl font-bold text-center mb-8">Compare Products</h1>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <label htmlFor="product1" className="block text-sm font-medium text-gray-700 mb-1">
                First Product
              </label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="product1"
                  placeholder="Search first product..."
                  value={searchTerm1}
                  onChange={handleSearch1}
                  className="pl-8"
                />
              </div>
              {filteredProducts1.length > 0 && (
                <Select onValueChange={handleSelect1}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProducts1.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
            <div>
              <label htmlFor="product2" className="block text-sm font-medium text-gray-700 mb-1">
                Second Product
              </label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="product2"
                  placeholder="Search second product..."
                  value={searchTerm2}
                  onChange={handleSearch2}
                  className="pl-8"
                />
              </div>
              {filteredProducts2.length > 0 && (
                <Select onValueChange={handleSelect2}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {filteredProducts2.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProductCard product={selectedProduct1} />
            <ProductCard product={selectedProduct2} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ProductCard({ product }) {
  if (!product) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Select a product to compare</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-w-16 aspect-h-9 mb-4">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="rounded-md object-cover w-full h-full"
          />
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Category</TableCell>
              <TableCell>{product.category}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Price</TableCell>
              <TableCell className="text-orange-500">${product.price}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Stock</TableCell>
              <TableCell>{product.stock}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
