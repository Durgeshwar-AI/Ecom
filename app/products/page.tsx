"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { IProduct } from "@/models/product.model";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AllProducts() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filtered, setFiltered] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products/");
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
        setFiltered(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter logic
  useEffect(() => {
    let results = [...products];

    if (category !== "all") {
      results = results.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim()) {
      results = results.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFiltered(results);
  }, [search, category, products]);

  return (
    <>
      <Navbar />
      <section className="w-screen min-h-screen mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-gray-900">All Products</h2>

          <div className="flex flex-col sm:flex-row gap-3 items-center text-black">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              <option value="pizza">Pizza</option>
              <option value="burger">Burger</option>
              <option value="drinks">Drinks</option>
              <option value="dessert">Dessert</option>
            </select>
          </div>
        </div>

        {/* State Handling */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-80 bg-gray-200 animate-pulse rounded-lg"
              ></div>
            ))}
          </div>
        )}

        {error && (
          <p className="text-red-600 font-medium text-center mt-10">{error}</p>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-gray-600 text-center mt-10 text-lg">
            No products found.
          </p>
        )}

        {/* Product Grid */}
        {!loading && !error && filtered.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <ProductCard
                key={product._id}
                {...product}
                image={product.image ?? ""}
              />
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}
