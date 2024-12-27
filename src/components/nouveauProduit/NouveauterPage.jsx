import React, { useState, useRef } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  Bell,
  Heart,
  MessageCircle,
  Star,
} from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaTiktok
} from "react-icons/fa";
import LogoText from "../../image/LogoText.png";
import { useNavigate } from "react-router-dom";
const comments = [
  {
    id: 1,
    name: "Acheteur Ihambaobab",
    date: "20 août 2024",
    color: "white",
    size: "45(27.5CM)",
    review:
      "Pour le prix qu'ils ont, un peu plus peut être commandé. Ils sont très légers; Maille, donc ils ne font pas mal et ne transpiration pas; Taille appropriée. Apparemment, ils sont à l'aise. Espérons qu'ils résistent suffisamment.",
    images: [
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
      "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
    ],
  },
];
export default function NouveauterPage() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState("all");
  const swiperRef = useRef(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
    { id: "all", name: "Tous les produits" },
    { id: "sandales", name: "Sandales" },
    { id: "claquettes", name: "Claquettes" },
    { id: "pantoufles", name: "Pantoufles" },
    { id: "chaussures", name: "Chaussures" },
  ];

  const products = [
    {
      id: 1,
      name: "Claquettes Nike Comfort",
      price: 3500,
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S6af9c502409f49f4ac50e1c4968b9b926.jpg_.webp",
      category: "claquettes",
      rating: 4.8,
      reviews: 256,
      isOnSale: true,
      salePrice: 2990,
      nouveau: "Nouveau",
    },
    {
      id: 2,
      name: "Pantoufles Designer Collection",
      price: 5500,
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S6af9c502409f49f4ac50e1c4968b9b926.jpg_.webp",
      category: "pantoufles",
      rating: 4.7,
      reviews: 167,
      nouveau: "Nouveau",
    },
    {
      id: 3,
      name: "Chaussures Luxe Signature",
      price: 10000,
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S6af9c502409f49f4ac50e1c4968b9b926.jpg_.webp",
      category: "chaussures",
      rating: 4.9,
      reviews: 324,
      nouveau: "Nouveau",
    },
    {
      id: 4,
      name: "Sandales",
      price: 10000,
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S6af9c502409f49f4ac50e1c4968b9b926.jpg_.webp",
      category: "Sandales",
      rating: 4.9,
      reviews: 324,
      isOnSale: true,
      salePrice: 2990,
      nouveau: "Nouveau",
    },
  ];

  const getFilteredProducts = () => {
    if (activeCategory === "all") {
      return products;
    }
    return products.filter(
      (product) =>
        product.category.toLowerCase() === activeCategory.toLowerCase()
    );
  };

  const filteredProducts = getFilteredProducts();

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setIsMenuOpen(false);
  };

  const handleReviewClick = (product) => {
    setSelectedProduct(product);
    setShowReviewForm(true);
  };

  const CommentCard = ({ comment }) => (
    <div className="p-2 border rounded-md" ref={swiperRef}>
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 bg-pink-100 rounded-full mr-2"></div>
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-gray-600 mb-2">
        Color: {comment.color} | Shoe Size: {comment.size}
      </p>
      <p className="text-gray-800 mb-4">{comment.review}</p>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {comment.images.map((image, index) => (
          <div
            key={index}
            className="bg-gray-200 h-22 border overflow-hidden rounded-md"
          >
            <img src={image} className="w-full h-full object-cover" alt="" />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {comment.name} | {comment.date}
        </span>
        <div className="flex text-nowrap cursor-pointer items-center">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
            />
          </svg>
          <span>Serviable (0)</span>
        </div>
      </div>
    </div>
  );
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-[#30A08B] text-white text-center py-2 text-sm lg:text-base">
        Livraison gratuite pour toute commande supérieure à 50000 F
      </div>

      {/* Header */}
      <header className="bg-gradient-to-r from-amber-100 to-amber-300 shadow-md sticky py-2 top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <span
              className="text-2xl w-24 h-16 font-extrabold text-amber-900 tracking-widest p-1
             bg-gradient-to-r from-amber-100 to-amber-300 shadow-md rounded-xl"
              onClick={() => navigate("/Home")}
            >
              <img
                src={LogoText}
                className="w-auto h-full object-contain cursor-pointer transition-opacity duration-300 hover:opacity-90"
                alt="Logo"
              />
            </span>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-4 lg:space-x-8">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`text-white-900  hover:text-[#30A08B] transition-colors text-sm lg:text-base ${
                    activeCategory === category.id
                      ? "font-bold text-[#30A08B]"
                      : "text-[#B17236]"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center">
              <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
                {/* <button className="text-gray-600 ">
                  <User className="w-5 h-5 lg:w-6 lg:h-6" />
                </button> */}
                <button className=" transition-colors rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
                  <div
                    className="relative text-amber-800 hover:text-[#30A08B]"
                    aria-label="Notifications"
                    onClick={() => navigate("/Notification header")}
                  >
                    <Bell className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1  bg-[#30A08B] rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                      0
                    </span>
                  </div>
                </button>
                <button className="transition-colors rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
                  <div className="relative text-amber-800 hover:text-[#30A08B]">
                    <Heart className="h-6 w-6" />
                    <span className="absolute -top-2 -right-1 bg-[#30A08B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      0
                    </span>
                  </div>
                </button>
                <button className="transition-colors rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-amber-800 hover:text-[#30A08B] transition-colors" />
                  {/* {cartCount > 0 && ( */}
                  <span className="absolute -top-2 -right-1 bg-[#30A08B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {/* {cartCount} */}0
                  </span>
                  {/* )} */}
                </button>
              </div>
              <button
                className="md:hidden ml-4"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-[#30A08B]" />
                ) : (
                  <Menu className="w-6 h-6 text-[#30A08B]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-2 space-y-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-base hover:bg-gray-50 hover:text-[#30A08B] transition-colors"
                >
                  {category.name}
                </button>
              ))}
              <div className="flex w-full  items-center justify-around gap-4 py-4 border-t">
                <button className="flex flex-col items-center text-gray-600">
                  <User className="w-6 h-6" />
                  <span className="text-xs mt-1">Compte</span>
                </button>
                <button className="flex flex-col items-center text-gray-600">
                  <Heart className="w-6 h-6" />
                  <span className="text-xs mt-1">Favoris</span>
                </button>
                <button className="flex flex-col items-center text-gray-600">
                  <ShoppingCart className="w-6 h-6" />
                  <span className="text-xs mt-1">Panier</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#30A08B] to-[#B2905F] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-4">
              Tous vos besoins en matière de mode sous un même toit
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Découvrez notre collection exclusive pour hommes
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="search"
                placeholder="Rechercher un produit..."
                className="w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 px-4 py-3 rounded-lg text-black text-sm md:text-base"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="fixed bottom-50 left-3 flex flex-col gap-2 z-2">
          <button
            className="p-3 bg-gradient-to-r from-[#30A08B] to-[#B2905F] rounded-full shadow-lg animate-bounce"
            onClick={() => handleReviewClick(selectedProduct)}
          >
            <MessageCircle className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Produits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="relative flex-grow">
                <img
                  onClick={() => navigate("/Produit détail")}
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  className="absolute top-2 right-4 py-1 px-2 text-white rounded-full shadow-md bg-[#62aca2bb] transition-colors text-xs font-bold"
                  onClick={() => setCartCount((prev) => prev + 1)}
                >
                  {product.nouveau}
                </button>
                <button
                  className="absolute hidden top-100 mt-3 right-4 p-2 bg-[#62aca2bb] rounded-full shadow-md  transition-colors"
                  onClick={() => setCartCount((prev) => prev + 1)}
                >
                  <Heart className="w-5 h-5 text-[#B17236] hover:animate-bounce" />
                </button>
                {product.isOnSale && (
                  <span className="absolute top-2 left-2 bg-[#62aca2bb] text-white text-xs font-bold py-1 px-2 rounded-full">
                    -10%
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-medium mb-2 text-gray-800">
                  {product.name}
                </h3>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {product.isOnSale ? (
                      <>
                        <p className="text-lg md:text-xl font-bold text-[#B17236] line-through">
                          F {product.price.toLocaleString()}
                        </p>
                        <p className="text-lg md:text-xl font-bold text-[#30A08B]">
                          F {product.salePrice.toLocaleString()}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg md:text-xl font-bold text-[#B17236]">
                        F {product.price.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#B2905F]">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setCartCount((prev) => prev + 1)}
                  className="w-full bg-[#30A08B] text-white py-2 rounded-md hover:bg-[#B2905F] transition-colors text-sm md:text-base"
                >
                  Ajouter au panier
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Formulaire de commentaire */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
              <div className="flex justify-between items-center p-6 border-b">
                <h2 className="text-2xl  font-bold text-[#B17236]">
                  Tous les avis
                </h2>
                <button
                  onClick={() => setShowReviewForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="overflow-y-auto flex-grow p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-[#30A08B] to-[#B17236] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Restez informé
          </h3>
          <p className="mb-6 text-white opacity-90">
            Inscrivez-vous à notre newsletter pour recevoir nos dernières offres
          </p>

          <div className="relative max-w-md mx-auto">
            <input
              type="email"
              placeholder="Votre email"
              className="w-full px-4 py-2 pr-16 rounded-lg text-sm md:text-base border border-white bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
            <button className="absolute right-0 top-0 h-full bg-[#30A08B] text-white px-4 rounded-r-lg hover:bg-[#B17236] transition-colors text-sm md:text-base">
              S'inscrire
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#B2905F] to-[#30A08B] bg-opacity-100 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h4 className="text-lg font-bold mb-4">À propos</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors">
                  Qui sommes-nous
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors">
                  Nos magasins
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors">
                  Carrières
                </li>
              </ul>
            </div>

            {/* Customer Service Section */}
            <div>
              <h4 className="text-lg font-bold mb-4">Service client</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors">
                  Contact
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors">
                  Livraison
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors">
                  Retours
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors">
                  FAQ
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div>
              <h4 className="text-lg font-bold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm md:text-base">
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors">
                  Conditions générales
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors">
                  Politique de confidentialité
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors">
                  Cookies
                </li>
              </ul>
            </div>

            {/* Follow Us Section */}
            <div>
              <h4 className="text-lg font-bold mb-4">Suivez-nous</h4>
              <ul className="flex flex-wrap space-x-4">
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors text-lg">
                  <FaWhatsapp />
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors text-lg">
                  <FaFacebook />
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors text-lg">
                  <FaInstagram />
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors text-lg">
                  <FaTwitter />
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors text-lg">
                  <FaLinkedin />
                </li>
                <li className="hover:text-[#B2905F] cursor-pointer transition-colors text-lg">
                  <FaTiktok />
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Text */}
          <div className="mt-8 text-center text-sm md:text-base">
            <p>
              &copy; {new Date().getFullYear()} IHAM Baobab Tous droits
              réservés.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
