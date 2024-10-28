import React from 'react'

import {LucideShoppingCart} from "lucide-react";

function ProduitSimilaires() {
    const articlesSimilaires = [
        {
          id: 1,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          label: "Pub",
          rating: 5,
          vendu: 33,
          price: 9763,
          pub: true,
        },
        {
          id: 2,
          name: "Chaussures de jogging en mai",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          label: "Pub",
          rating: 5,
          vendu: 33,
          price: 9763,
        },
        {
          id: 3,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          rating: 5,
          vendu: 33,
          price: 9763,
        },
        {
          id: 4,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          label: "Pub",
          rating: 2,
          vendu: 33,
          price: 9763,
        },
        {
          id: 5,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          rating: 5,
          vendu: 33,
          price: 9763,
        },
        {
          id: 6,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          label: "Pub",
          rating: 4,
          vendu: 33,
          price: 9763,
        },
        {
          id: 7,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          label: "Pub",
          rating: 4,
          vendu: 33,
          price: 9763,
        },
        {
          id: 8,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          rating: 4,
          vendu: 33,
          price: 9763,
        },
        {
          id: 9,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          label: "Pub",
          rating: 4,
          vendu: 33,
          price: 9763,
        },
        {
          id: 10,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          label: "Pub",
          rating: 4,
          vendu: 33,
          price: 9763,
        },
        {
          id: 11,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          label: "Pub",
          rating: 4,
          vendu: 33,
          price: 9763,
        },
        {
          id: 12,
          name: "Chaussures de jogging en m...",
          image:
            "https://ae-pic-a1.aliexpress-media.com/kf/Ae5b9737c959943bc9bc8e80fb99faa89A.jpg_480x480.jpg_.webp",
          rating: 4,
          vendu: 33,
          price: 9763,
        },
      ];

  return (
    <div className="py-2">
    <div className="border-t border-gray-300 mb-4" />
    <h2 className="text-2xl text-[#B17236] font-bold mb-4 font-semibold text-[#B17236] mb-4">Articles similaires</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mx-auto">
      {articlesSimilaires.map((article) => (
        <div
          key={article.id}
          className="cursor-pointer rounded-md border overflow-hidden border-gray-300 shadow-md hover:shadow-lg transition-shadow duration-200"
        >
          <div className=" relative  w-full h-40">
            <img
              src={article.image}
              className="w-full h-full object-cover"
              alt={`Article similaire ${article.id}`}
            />
            {!article.label? (
              <></>
            ): (
                <div className="absolute top-2 right-2 bg-[#62aca2bb] p-1 shadow-md rounded">
              <p className="text-xs font-bold text-white">
                -10%
              </p>
            </div>
            )}
          
            <div className="absolute z-1 bottom-2 cursor-pointer right-2 bg-[#30A08B] bg-opacity-50 p-2 rounded-full flex items-center border">
              <LucideShoppingCart
                size={20}
                color="#B17236"
                className="hover:animate-bounce"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#30A08B] opacity-15 group-hover:scale-105 transition-transform duration-300"></div>

          </div>
          <p className="text-xs ms-1 font-semibold text-gray-700 mt-1">
            {article.name}
          </p>

          <div className="flex items-center mt-1 ms-1">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < article.rating ? "text-yellow-400" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-xs text-gray-600 ml-1">
              {article.vendu > 0
                ? `${article.vendu} vendus`
                : `${article.rating} vendus`}
            </span>
          </div>
          <div className="ml-1">
            <p className="text-lg text-[#30A08D] font-bold">
              {article.price} FCFA
            </p>
          </div>
        </div>
      ))}
    </div>



  
  </div>

  )
}

export default ProduitSimilaires