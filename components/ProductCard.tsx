"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice"; // adjust path as needed

type ProductCardProps = {
  _id: string;
  name: string;
  price: number;
  image: string;
  category?: string;
};

export default function ProductCard({
  _id,
  name,
  price,
  image,
  category,
}: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id,
        name,
        price,
        image,
        quantity: 1,
      })
    );
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative h-64 w-full bg-gray-100">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {category && (
          <span className="absolute top-2 left-2 bg-black/70 text-white text-xs px-3 py-1 rounded-full">
            {category}
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-gray-900">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2">
          <Link href={`/products/${_id}`} className="flex-1">
            <button className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors cursor-pointer">
              View Details
            </button>
          </Link>

          <button
            onClick={handleAddToCart}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
