import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Heart,
  Search,
  Truck,
  Award,
  Shield,
  MessageCircle,
  Globe,
  Phone,
  CreditCard,
  Mail,
} from "lucide-react";
import MasterCard from "../paementPage/paiementPhoto/masterCard.jpeg";
import VisaCard from "../paementPage/paiementPhoto/VisaCard.png";
import DomicileCard from "../paementPage/paiementPhoto/domicile.jpeg";
import MobileMoney from "../paementPage/paiementPhoto/MobileMoney.png";

import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import BoutiqueProduits from "./BoutiqueProduits";
import BoutiquierProfile from "./BoutiquierProfile";
// import CategorieMobile from '../homePage/CategorieMobile';

const AdvancedECommercePage = ({ isOpen, acces }) => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const swiperRef = useRef(null);
  const navigation = useNavigate();

  const [filteredProducts, setFilteredProducts] = useState([]);

  const categories = [
    "All",
    "New Arrivals",
    "Best Sellers",
    "Fashion",
    "Electronics",
    "Home & Living",
  ];
  // création des page à corriger :  user massagerie
  useEffect(() => {
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

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const categoriesSideBar = [
    { id: 1, name: "All", icon: "🏠", onClick: () => navigation("/Homme") },
    {
      id: 2,
      name: "New Arrivals",
      icon: "📱",
      onClick: () => navigation("/Homme"),
    },
    {
      id: 3,
      name: "Best Sellers",
      icon: "💄",
      onClick: () => navigation("/Homme"),
    },
    {
      id: 4,
      name: "Best Sellers",
      icon: "🍳",
      onClick: () => navigation("/Homme"),
    },
    { id: 5, name: "Fashion", icon: "🔌", onClick: () => navigation("/Homme") },
    {
      id: 6,
      name: "Electronics",
      icon: "➡️",
      onClick: () => navigation("/Voir-plus"),
    },
    {
      id: 7,
      name: "Home & Living",
      icon: "➡️",
      onClick: () => navigation("/Voir-plus"),
    },
  ];

  const carouselImages = [
    "https://media.istockphoto.com/id/1357529194/fr/photo/rendu-3d-dun-salon-de-style-moderne-avec-chemin%C3%A9e.jpg?s=612x612&w=0&k=20&c=KZBiX2zyVuyoKRuzM95892W7Fr0Rb2vX9qUAN1phS10=",
    "https://media.istockphoto.com/id/1040810144/photo/unknown-woman-cutting-a-paprika.jpg?s=612x612&w=0&k=20&c=e6t5CL5zrpioK3uJ-TPkEpbWhbKvZPW8cC-y26HtBr8=",
    // Ajoute d'autres images ici
  ];
  const productVedettes = [
    {
      id: 1,
      name: "Produit 1",
      price: "19,99 ",
      image:
        "https://cc-prod.scene7.com/is/image/CCProdAuthor/product-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
    },
    {
      id: 2,
      name: "Produit 2",
      price: "29,99",
      image:
        "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
    },
    {
      id: 3,
      name: "Produit 3",
      price: "39,99 ",
      image:
        "https://www.fontainebleau-blog.com/wp-content/uploads/2020/02/comment-reussir-belles-photos-de-paysage-660x248.jpg",
    },
    {
      id: 4,
      name: "Produit 4",
      price: "49,99",
      image:
        "https://img.freepik.com/photos-premium/photo-appareil-photo-noir-objectif-long-trepied-montagne-arriere-plan_978521-558.jpg?w=360",
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Responsive Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#B17236] via-[#B2905F] to-[#30A08B] shadow-lg">
        <div className="container mx-auto px-1 md:px-6 py-4  flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center space-x-6">
            <h1
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "#FFFFFF" }}
            >
              StyleHub
            </h1>

            {/* Desktop Categories */}
            <div className="hidden md:flex space-x-4 text-white">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`${
                    selectedCategory === category
                      ? "font-bold"
                      : "hover:opacity-75"
                  } transition-colors flex items-center text-sm`}
                  style={{
                    color:
                      selectedCategory === category ? "#30A08B" : "inherit",
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-64 lg:w-80 border-2 border-gray-200 rounded-full transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
            </div>

            <div className="flex items-center space-x-2 md:space-x-3">
              <button className="relative p-2 hover:bg-[#B2905F] rounded-full">
                <Heart className="text-white" size={20} />
                <span className="absolute -top-1 -right-1 bg-[#30A08B] text-white text-xs rounded-full px-2 py-0.5">
                  0
                </span>
              </button>

              <button
                className="relative p-2 hover:bg-[#B2905F] rounded-full"
                onClick={() => navigation("/Panier")}
              >
                <ShoppingCart className="text-white" size={20} />
                <span className="absolute -top-1 -right-1 bg-[#30A08B] text-white text-xs rounded-full px-2 py-0.5">
                  {cartItems.length}
                </span>
              </button>

              {/* Added Message Button */}
              <button
                className="relative p-2 hover:bg-[#B2905F] rounded-full"
                onClick={() => navigation("/Messagerie")}
              >
                <MessageCircle className="text-white" size={20} />
                <span className="absolute -top-1 -right-1 bg-[#30A08B] text-white text-xs rounded-full px-2 py-0.5">
                  2
                </span>
              </button>

              {/* Added Profile Section */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-1 hover:bg-[#B2905F] rounded-full"
                  onClick={() => navigation("/Profile d'un boutiquier")}
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"
                    alt="Profile"
                    className="w-8 h-8 object-cover rounded-full border-2 border-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white absolute w-full shadow-lg">
            <div className="flex flex-col p-4 space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${
                    selectedCategory === category
                      ? "font-semibold"
                      : "hover:opacity-75"
                  } text-left py-2 border-b`}
                  style={{
                    color:
                      selectedCategory === category ? "#B2905F" : "inherit",
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Flex grow to push footer down */}
      <main className="container mx-auto px- md:px-6 py-8 flex-grow">
        <div className="flex flex-col md:flex-row gap-8">
          <sidea
            className={`md:w-1/4 bg-white rounded-lg mt-4 shadow-md p-4 ${
              isOpen ? "block" : "hidden md:block"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-[#30A08B]">
              Catégories
            </h2>
            <ul>
              {categoriesSideBar.map((category) => (
                <li key={category.id} className="mb-2">
                  <button
                    onClick={category.onClick}
                    className="w-full text-left py-2 px-4 rounded hover:bg-[#FFE9CC] transition-colors duration-200 flex items-center space-x-2"
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                </li>
              ))}
              <div className="container py-8">
                <div className="card w-100 h-50 overflow-hidden">
                  {carouselImages.map((image, index) => {
                    return <img src={image} key={index} alt="" />;
                  })}
                </div>
              </div>
            </ul>
          </sidea>

          {/* Carousel and Products */}

          <div className="md:w-3/4">
            {/* Carousel */}
            <section className="my-6 relative">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="mb-8 rounded-lg overflow-hidden"
              >
                {carouselImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-[400px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Flèches personnalisées */}
              <div
                className="absolute z-1 top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
                onClick={() => swiperRef.current.swiper.slidePrev()}
              >
                <span className="text-lg">←</span>
              </div>
              <div
                className="absolute z-1 top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
                onClick={() => swiperRef.current.swiper.slideNext()}
              >
                <span className="text-lg">→</span>
              </div>
            </section>

            {/* <CategorieMobile/> */}

            {/* Featured Products */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#30A08B]">
                Produits vedettes
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {productVedettes.map((product) => (
                  <div
                    key={product.id}
                    className="flex flex-col rounded-lg group overflow-hidden transition-all duration-300 transform shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer relative"
                  >
                    <div className="relative flex-grow">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-[#62aca2bb] text-white text-xs font-bold px-2 rounded-full">
                        Nouveau
                      </span>

                      <div
                        onClick={() => navigation("/Produit détail")}
                        className="absolute inset-0 bg-gradient-to-b from-transparent to-[#30A08B] opacity-30 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-3">
                      <h3
                        className="font-semibold truncate"
                        style={{ color: "#B17236" }}
                      >
                        {product.name}
                      </h3>
                      <p
                        className="text-lg font-bold"
                        style={{ color: "#B2905F" }}
                      >
                        {product.price} FCFA
                      </p>
                      <button
                        //  onClick={() => handleAddToCart(product)}
                        className="mt-2 flex justify-around items-center w-full bg-[#30A08B] text-white py-2
                       rounded-full hover:bg-opacity-90 transition transition-colors duration-200 text-sm md:text-base shadow-md hover:shadow-lg"
                      >
                        Ajouter au panier
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "#B17236" }}
            >
              Our Collection
              <span className="text-sm ml-2 text-gray-500">
                ({filteredProducts.length} products)
              </span>
            </h2>
          </div>

          {/* Responsive Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6  cursor-pointer">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl  shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                {/* Product Card */}
                <div className="relative transform hover:-translate-y-1 transition-all duration-300">
                  {/* Product Badges */}
                  <div className="absolute top-2 left-2 z-10 flex space-x-1">
                    {product.badges.map((badge) => (
                      <span
                        key={badge}
                        className="text-xs px-2 py-1 text-white text-xs font-bold py-1 px-2 rounded-full"
                        style={{
                          backgroundColor: "#62aca2bb",
                          color: "white",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  {/* Product Image */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-48 md:h-64 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div
                    onClick={() => navigation("/Produit détail")}
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
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <span
                        className="text-lg font-bold"
                        style={{ color: "#B2905F" }}
                      >
                        {product.price.toFixed(2)} FCFA
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => handleAddToCart(product)}
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
            ))}
          </div>

          {/* No Products Found */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl" style={{ color: "#B17236" }}>
                No products found matching your filters.
              </p>
            </div>
          )}
        </section>
        <BoutiqueProduits />
      </main>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4
              className="text-xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #30A08B, #B2905F)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Customer Care
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center hover:opacity-75 cursor-pointer">
                <Truck className="mr-2" size={18} /> Free Shipping
              </li>
              <li className="flex items-center hover:opacity-75 cursor-pointer">
                <Award className="mr-2" size={18} /> Quality Guarantee
              </li>
              <li className="flex items-center hover:opacity-75 cursor-pointer">
                <Shield className="mr-2" size={18} /> Secure Payment
              </li>
              <li className="flex items-center hover:opacity-75 cursor-pointer">
                <MessageCircle className="mr-2" size={18} /> 24/7 Support
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #B2905F, #B17236)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li className="hover:opacity-75 cursor-pointer">About Us</li>
              <li className="hover:opacity-75 cursor-pointer">Collections</li>
              <li className="hover:opacity-75 cursor-pointer">Blog</li>
              <li className="hover:opacity-75 cursor-pointer">FAQ</li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #B17236, #30A08B)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Legal
            </h4>
            <ul className="space-y-2">
              <li className="hover:opacity-75 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:opacity-75 cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:opacity-75 cursor-pointer">Return Policy</li>
              <li className="hover:opacity-75 cursor-pointer">
                Cookie Settings
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #30A08B, #B2905F)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Connect With Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400" />
                <input
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  className="bg-gray-800 text-white px-3 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="px-4 py-2 rounded-full hover:opacity-75"
                  style={{
                    background: "linear-gradient(90deg, #B2905F, #30A08B)",
                    color: "white",
                  }}
                >
                  Send
                </button>
              </div>
              <div className="flex space-x-4 mt-4">
                <button className="hover:opacity-75">
                  <Globe size={24} style={{ color: "#30A08B" }} />
                </button>
                <button className="hover:opacity-75">
                  <Phone size={24} style={{ color: "#B2905F" }} />
                </button>
                <button
                  className="hover:opacity-75"
                  onClick={() => navigation("/Paement")}
                >
                  <CreditCard size={24} style={{ color: "#B17236" }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 border-t border-gray-700 mt-8 pt-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className="mb-2 md:mb-0"
              style={{
                background: "linear-gradient(90deg, #B17236, #30A08B)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              © 2024 StyleHub. All Rights Reserved
            </p>
            <div className="flex space-x-4">
              <img
                src={MasterCard}
                alt="Payment Method"
                className="h-6"
                style={{
                  borderColor: "#30A08B",
                  borderWidth: "2px",
                }}
              />
              <img
                src={VisaCard}
                alt="Payment Method"
                className="h-6"
                style={{
                  borderColor: "#B2905F",
                  borderWidth: "2px",
                }}
              />
              <img
                src={DomicileCard}
                alt="Payment Method"
                className="h-6"
                style={{
                  borderColor: "#B17236",
                  borderWidth: "2px",
                }}
              />
              <img
                src={MobileMoney}
                alt="Payment Method"
                className="h-6"
                style={{
                  borderColor: "#B17236",
                  borderWidth: "2px",
                }}
              />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdvancedECommercePage;
