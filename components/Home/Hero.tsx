import Link from 'next/link'
import React from 'react'

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to Ecom</h1>
            <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Discover amazing products at unbeatable prices. Shop the latest
              trends in electronics, fashion, and more.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Shop Now
              </Link>
              <Link
                href="/products"
                className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero