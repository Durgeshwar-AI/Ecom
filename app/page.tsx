import Navbar from "@/components/Navbar";
import Hero from "@/components/Home/Hero";
import FeaturedProducts from "@/components/Home/FeaturedProducts";
import Footer from "@/components/Footer";

// Mock product data - replace with database fetch later
export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar />
      {/* Hero Section */}
      <Hero />
      {/* Featured Products */}
      <FeaturedProducts />
      {/* Footer */}
      <Footer />
    </div>
  );
}
