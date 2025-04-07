import { ShoppingCart } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BoutiqueProduits({ products }) {
  const navigation = useNavigate();

  const [cartItems, setCartItems] = useState([]);

  // const handleAddToCart = (product) => {
  //   const existingItem = cartItems.find((item) => item.id === product.id);
  //   if (existingItem) {
  //     setCartItems(
  //       cartItems.map((item) =>
  //         item.id === product.id
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       )
  //     );
  //   } else {
  //     setCartItems([...cartItems, { ...product, quantity: 1 }]);
  //   }
  // };
  const mockProducts = [
    {
      id: 1,
      name: "Premium Leather Jacket",
      price: 249.99,
      originalPrice: 349.99,
      description:
        "Handcrafted leather jacket with modern silhouette and premium finish.",
      images: [
        "https://ae-pic-a1.aliexpress-media.com/kf/S0855088d8b7b45ad828624c44c0cbf0am.jpg_480x480.jpg_.webp",
      ],
      category: "Fashion",
      rating: 4.7,
      inStock: true,
      badges: ["10%"],
    },
    {
      id: 2,
      name: "Smart Wireless Earbuds",
      price: 129.99,
      originalPrice: 199.99,
      description:
        "Noise-canceling wireless earbuds with advanced Bluetooth 5.2 technology.",
      images: [
        "https://ae-pic-a1.aliexpress-media.com/kf/S0855088d8b7b45ad828624c44c0cbf0am.jpg_480x480.jpg_.webp",
      ],
      category: "Electronics",
      rating: 4.5,
      inStock: true,
      badges: ["New"],
    },
    {
      id: 3,
      name: "Minimalist Smart Watch",
      price: 179.99,
      originalPrice: 249.99,
      description:
        "Sleek smartwatch with health tracking, GPS, and long battery life.",
      images: [
        "https://ae-pic-a1.aliexpress-media.com/kf/S0855088d8b7b45ad828624c44c0cbf0am.jpg_480x480.jpg_.webp",
      ],
      category: "Electronics",
      rating: 4.8,
      inStock: true,
      badges: ["Limited Edition"],
    },
    {
      id: 4,
      name: "Ergonomic Home Office Chair",
      price: 299.99,
      originalPrice: 449.99,
      description:
        "Comfortable and adjustable chair perfect for long working hours.",
      images: [
        "https://ae-pic-a1.aliexpress-media.com/kf/S0855088d8b7b45ad828624c44c0cbf0am.jpg_480x480.jpg_.webp",
      ],
      category: "Home & Living",
      rating: 4.6,
      inStock: true,
      badges: ["Best Seller"],
    },
  ];
  console.log(products);
  return (
    <section className="mt-4">
      {/* Responsive Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6  cursor-pointer">
        {products.map((product, index) => {
          const discount =
            product.prixPromo && product.prix
              ? Math.round(
                  ((product.prix - product.prixPromo) / product.prix) * 100
                )
              : 0;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl  shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              {/* Product Card */}

              <div className="relative transform hover:-translate-y-1 transition-all duration-300">
                {/* Product Badges */}
                <div className="absolute top-2 left-2 z-10 flex space-x-1">
                  {/* {product.badges.map((badge) => ( */}

                  {discount > 0 && (
                    <span
                      className="text-xs px-2 py-1 text-white text-xs font-bold py-1 px-2 rounded-full"
                      style={{
                        backgroundColor: "#62aca2bb",
                        color: "white",
                      }}
                    >
                      -{discount}%
                    </span>
                  )}
                  {/* ))} */}
                </div>

                {/* Product Image */}
                <img
                  src={product?.image1}
                  alt={product?.name}
                  className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform"
                />
                <div
                  onClick={() => navigation(`/ProduitDétail/${product?._id}`)}
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-[#30A08B] opacity-30 group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Product Details */}
              <div className="p-4 ">
                {/* Product Name */}
                <h3
                  className="font-semibold truncate"
                  style={{ color: "#B17236" }}
                >
                  {product?.name}
                </h3>

                {/* Price */}
                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <span
                      className="text-lg font-bold"
                      style={{ color: "#B2905F" }}
                    >
                      {product.prix?.toFixed(2)} FCFA
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button
                    // onClick={() => handleAddToCart(product)}
                    onClick={() => navigation(`/ProduitDétail/${product?._id}`)}
                    className="p-2 rounded-full hover:opacity-75 transition"
                    style={{
                      backgroundColor: "#30A08B",
                      color: "white",
                    }}
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Products Found */}
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-xl" style={{ color: "#B17236" }}>
            No products found matching your filters.
          </p>
        </div>
      )}
    </section>
  );
}
