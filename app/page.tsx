'use client'

import Navbar from "@/components/Navbar";
import Hero from "@/components/Home/Hero";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { login } from "@/store/userSlice";

// Mock product data - replace with database fetch later
export default function HomePage() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          return;
        }

        const res = await fetch("/api/getUser", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          localStorage.removeItem('token')
          return;
        }

        dispatch(login({
          userName: data.user.name,
          email: data.user.email,
        }))
      } catch (err) {
      }
    };

    fetchUser();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <FeaturedProducts />
      <Footer />
    </div>
  );
}
