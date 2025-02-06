import React, { useState, useRef } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  X,
  User,
  Bell,
  Heart,
  Star,
} from "lucide-react";
import {
  FaWhatsapp,
  FaInstagram,
  FaTwitter,
  FaFacebook,
  FaLinkedin,
  FaTiktok,
} from "react-icons/fa";
import LogoText from "../../image/LogoText.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function NouveauterPage({ paniernbr }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tous les produits");
  const swiperRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryName, setCategoryName] = useState(
    "mode et divers sous un même toit"
  );

  const DATA_Products = useSelector((state) => state.products.data);
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);

  const filteredCategories = DATA_Categories.filter((c) => c.name !== "all");
  // console.log(DATA_Products?.reverse());
  const getFilteredProducts = () => {
    if (activeCategory === "Tous les produits") {
      return (
        [...DATA_Products]
          .reverse()
          .filter((prod) =>
            prod?.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .slice(0, 10) || []
      );
    }

    return (
      DATA_Products?.filter(
        (item) =>
          item.ClefType ===
          DATA_Types?.find((type) => type.clefCategories === activeCategory)
            ?._id
      )
        .reverse()
        .filter((prod) =>
          prod?.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        ?.slice(0, 10) || []
    );
  };

  const filteredProducts = getFilteredProducts();

  const handleCategoryClick = (categoryId, name) => {
    setActiveCategory(categoryId);
    setCategoryName(name);
    setIsMenuOpen(false);
  };

  function getRandomIntBetween3and5() {
    return Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  }

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
              <button
                key={1}
                onClick={() => {
                  handleCategoryClick(
                    "Tous les produits",
                    "mode et divers sous un même toit"
                  );
                  window.scrollTo(0, 0);
                }}
                className={`text-white-900  hover:text-[#30A08B] transition-colors text-sm lg:text-base ${
                  activeCategory === "Tous les produits"
                    ? "font-bold text-[#30A08B]"
                    : "text-[#B17236]"
                }`}
              >
                Tous les produits
              </button>

              {filteredCategories?.slice(0, 4)?.map((category) => (
                <button
                  key={category._id}
                  onClick={() => {
                    handleCategoryClick(category._id, category?.name);
                    window.scrollTo(0, 0);
                  }}
                  className={`text-white-900  hover:text-[#30A08B] transition-colors text-sm lg:text-base ${
                    activeCategory === category._id
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
                    {paniernbr ? paniernbr.length : 0}
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
              <button
                key={1}
                onClick={() => {
                  handleCategoryClick(
                    "Tous les produits",
                    "mode et divers sous un même toit"
                  );
                  setActiveCategory("Tous les produits");
                  setIsMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`text-white-900  hover:text-[#30A08B] transition-colors text-sm lg:text-base ${
                  activeCategory === "Tous les produits"
                    ? "font-bold text-[#30A08B]"
                    : "text-[#B17236]"
                }`}
              >
                Tous les produits
              </button>

              {filteredCategories?.slice(0, 4)?.map((category) => (
                <button
                  key={category._id}
                  onClick={() => {
                    // setActiveCategory(category._id);
                    handleCategoryClick(category._id, category?.name);
                    setIsMenuOpen(false);
                    window.scrollTo(0, 0);
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
              Tous vos besoins en matière de {categoryName}
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Découvrez notre collection exclusive pour {categoryName}
            </p>
            <div className="relative max-w-xl mx-auto">
              <input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
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
        {/* Produits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts?.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative flex-grow">
                  <img
                    onClick={() => navigate(`/ProduitDétail/${product?._id}`)}
                    src={product?.image1}
                    alt={product?.name}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <button className="absolute top-2 right-4 py-1 px-2 text-white rounded-full shadow-md bg-[#62aca2bb] transition-colors text-xs font-bold">
                    nouveau
                  </button>

                  <button className="absolute hidden top-100 mt-3 right-4 p-2 bg-[#62aca2bb] rounded-full shadow-md  transition-colors">
                    <Heart className="w-5 h-5 text-[#B17236] hover:animate-bounce" />
                  </button>
                  <span className="absolute top-2 left-2 bg-[#62aca2bb] text-white text-xs font-bold py-1 px-2 rounded-full">
                    -{" "}
                    {Math.round(
                      ((product.prix - product.prixPromo) / product.prix) * 100
                    )}{" "}
                    %
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="text-base md:text-lg font-medium mb-2 text-gray-800">
                    {product?.name}
                  </h3>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      {product?.prixPromo && product?.prixPromo > 0 ? (
                        <>
                          <p className="text-lg md:text-xl font-bold text-[#B17236] line-through">
                            F {product?.prix?.toLocaleString()}
                          </p>
                          <p className="text-lg md:text-xl font-bold text-[#30A08B]">
                            F {product?.prixPromo?.toLocaleString()}
                          </p>
                        </>
                      ) : (
                        <p className="text-lg md:text-xl font-bold text-[#B17236]">
                          F {product?.prix?.toLocaleString()}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="text-[#B2905F]">★</span>
                      <span className="ml-1 text-sm text-gray-600">
                        ({getRandomIntBetween3and5()})
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => navigate(`/ProduitDétail/${product?._id}`)}
                    className="w-full bg-[#30A08B] text-white py-2 rounded-md hover:bg-[#B2905F] transition-colors text-sm md:text-base"
                  >
                    Ajouter au panier
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                width: "100%",

                color: "#333",
                fontSize: "1.2em",
              }}
            >
              <p>
                Aucun produit correspondant trouvé pour ce type. Veuillez
                essayer un autre type.
              </p>
            </div>
          )}
        </div>

        {/* Formulaire de commentaire */}
      </main>
    </div>
  );
}
