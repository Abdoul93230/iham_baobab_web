import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Sparkles,
  Trash2,
  Menu,
  User,
  ChevronDown,
  ChevronRight,
  Home,
  Smartphone,
  UtensilsCrossed,
  Plug,
  MoreHorizontal,
  ChevronUp,
  ShoppingCart,
  Camera,
  Search,
  Heart,
  Bell,
  Globe,
  Truck,
  Gift,
  Phone,
  X,
  FolderIcon,
  Package,
  LogOut,
  HelpCircle,
  CreditCard,
  Shield,
  Info,
  MessageCircle,
} from "lucide-react";
import LogoText from "../../image/LogoText.png";
import HeaderMobile from "./HeaderMobile";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import axios from "axios";
import SearchBar from "./SearchBar";
// import './style.css'

function HomeHeader({ paniernbr, acces }) {
  const navigate = useNavigate();
  const DATA_Categories = useSelector((state) => state.products.categories);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [produits, setProduits] = useState(0);
  const [nbr, setNbr] = useState(0);

  const a = JSON.parse(localStorage.getItem(`userEcomme`));
  const BackendUrl = process.env.REACT_APP_Backend_Url;
  const socket = io(BackendUrl);

  useEffect(() => {
    if (a) {
      axios
        .get(`${BackendUrl}/getUserMessagesByClefUser/${a?.id}`)
        .then((res) => {
          setNbr(
            res.data.filter(
              (item) => item.lusUser == false && item.provenance === false
            )?.length
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    // Écouter les nouveaux messages du serveur
    socket.on("new_message_user", (message) => {
      if (message) {
        console.log("oui");
        if (a) {
          axios
            .get(`${BackendUrl}/getUserMessagesByClefUser/${a?.id}`)
            .then((res) => {
              setNbr(
                res.data.filter(
                  (item) => item.lusUser == false && item.provenance === false
                )?.length
              );
            })
            .catch((error) => {
              console.log(error);
            });
        }
      }
    });
    return () => {
      // Nettoyer l'écouteur du socket lors du démontage du composant
      socket.off("new_message_user");
    };
  }, [socket]);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  };

  const closeAllDropdowns = () => {
    setActiveDropdown(null);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeAllDropdowns();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const CategoryButton = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#30A08B]/10 hover:to-transparent group transition-all duration-200"
    >
      <Icon className="w-5 h-5 text-[#30A08B] group-hover:scale-110 transition-transform duration-200" />
      <span className="ml-3 text-sm font-medium group-hover:text-[#30A08B]">
        {label}
      </span>
      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-[#30A08B] transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
    </button>
  );
  const AccountButton = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#30A08B]/10 hover:to-transparent group transition-all duration-200"
    >
      <Icon className="w-5 h-5 text-[#30A08B] group-hover:scale-110 transition-transform duration-200" />
      <span className="ml-3 text-sm font-medium group-hover:text-[#30A08B]">
        {label}
      </span>
      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-[#30A08B] transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
    </button>
  );
  const HelpButton = ({ icon: Icon, label, onClick }) => (
    <button
      onClick={onClick}
      className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#30A08B]/10 hover:to-transparent group transition-all duration-200"
    >
      <Icon className="w-5 h-5 text-[#30A08B] group-hover:scale-110 transition-transform duration-200" />
      <span className="ml-3 text-sm font-medium group-hover:text-[#30A08B]">
        {label}
      </span>
      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-[#30A08B] transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
    </button>
  );
  const renderDropdownContent = (dropdown) => {
    const categories = [
      { icon: Home, label: "Homme", onClick: () => navigate("/Homme") },
      {
        icon: Smartphone,
        label: "Électronique",
        onClick: () => navigate("/Homme"),
      },
      { icon: Sparkles, label: "Beauté", onClick: () => navigate("/Homme") },
      {
        icon: UtensilsCrossed,
        label: "Cuisine & Ustensiles",
        onClick: () => navigate("/Homme"),
      },
      {
        icon: Plug,
        label: "Électroménager",
        onClick: () => navigate("/Homme"),
      },
      {
        icon: MoreHorizontal,
        label: "Voir plus",
        onClick: () => navigate("/Voir-plus"),
      },
    ];
    const accountOptions = [
      ...(acces === "non"
        ? [
            {
              icon: User,
              label: "Se connecter",
              onClick: () => navigate("/Connexion"),
            },
          ]
        : []),

      { icon: Home, label: "Mon compte", onClick: () => navigate("/Compte") },
      {
        icon: Package,
        label: "Mes commandes",
        onClick: () => navigate("/Commande"),
      },
      {
        icon: Heart,
        label: "Inviter des amis",
        onClick: () => navigate("/Inviter les amis"),
      },
      {
        icon: Home,
        label: "Mon adresses",
        onClick: () => navigate("/Livraison"),
      },

      ...(acces === "oui"
        ? [
            {
              icon: LogOut,
              label: "Se déconnecter",
              onClick: () => {
                localStorage.removeItem("userEcomme");
                localStorage.removeItem("orderTotal");
                localStorage.removeItem("pendingOrder");
                navigate("/Home");
                window.location.reload();
              },
            },
          ]
        : []),
    ];
    const helpOptions = [
      {
        icon: HelpCircle,
        label: "Centre d'aide",
        onClick: () => navigate("/Service"),
      },
      {
        icon: Truck,
        label: "Adresse de livraison",
        onClick: () => navigate("/Livraison"),
      },
      {
        icon: CreditCard,
        label: "Mode de paiement",
        onClick: () => navigate("/Paement"),
      },
      {
        icon: Bell,
        label: "Paramètre de notification",
        onClick: () => navigate("/Paramètre de notification"),
      },
      {
        icon: Shield,
        label: "Avis de confidentialité",
        onClick: () => navigate("/Avis de confidentialité"),
      },
      {
        icon: HelpCircle,
        label: "Questions fréquemment posées",
        onClick: () => navigate("/Question Fréquement possées"),
      },
      {
        icon: Info,
        label: "Informations légales",
        onClick: () => navigate("/Legal information"),
      },
    ];
    switch (dropdown) {
      case "language":
        return (
          <div className="absolute top-8 right-4 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
            <button className="block px-4 py-2 text-gray-800 hover:bg-emerald-100 transition">
              English
            </button>
            <button className="block px-4 py-2 text-gray-800 hover:bg-emerald-100 transition">
              Deutsch
            </button>
            <button className="block px-4 py-2 text-gray-800 hover:bg-emerald-100 transition">
              Español
            </button>
          </div>
        );
      case "categories":
        return (
          <div className="absolute z-30 left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden backdrop-blur-sm backdrop-saturate-150 transition-all duration-300">
            <div className="py-2">
              {DATA_Categories?.map((category, index) => {
                if (category.name === "all") {
                  return null;
                }
                return (
                  <div key={category._id}>
                    <button
                      onClick={() => navigate(`/Categorie/${category.name}`)}
                      className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-[#30A08B]/10 hover:to-transparent group transition-all duration-200"
                    >
                      {/* <Icon className="w-5 h-5 text-[#30A08B] group-hover:scale-110 transition-transform duration-200" /> */}
                      <img
                        src={category?.image}
                        alt="loading"
                        style={{
                          width: 30,
                          height: 30,
                          objectFit: "contain",
                          borderRadius: "50%",
                        }}
                      />
                      <span className="ml-3 text-sm font-medium group-hover:text-[#30A08B]">
                        {category.name}
                      </span>
                      <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 text-[#30A08B] transform translate-x-0 group-hover:translate-x-1 transition-all duration-200" />
                    </button>
                    {index < DATA_Categories?.length - 1 && (
                      <div className="mx-4 border-b border-gray-100" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Footer avec dégradé */}
            <div className="bg-gradient-to-b from-[#30A08B]/5 to-[#30A08B]/10 px-4 py-3">
              <button
                onClick={() => navigate("/Voir-plus")}
                className="w-full text-center text-sm font-medium text-[#30A08B] hover:text-[#2a907d] transition-colors"
              >
                Découvrir toutes les catégories
              </button>
            </div>
          </div>
        );
      case "account":
        return (
          <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden backdrop-blur-sm backdrop-saturate-150 transition-all duration-300 z-10">
            <h3 className="px-4 py-2 text-lg font-semibold text-amber-800 border-b border-gray-200">
              Mon Compte
            </h3>
            <div className="py-2">
              {accountOptions.map((option, index) => (
                <React.Fragment key={option.label}>
                  <AccountButton
                    icon={option.icon}
                    label={option.label}
                    onClick={option.onClick}
                  />
                  {index < accountOptions.length - 1 && (
                    <div className="mx-4 border-b border-gray-100" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      case "help":
        return (
          <div className="absolute z-30 right-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden backdrop-blur-sm backdrop-saturate-150 transition-all duration-300">
            <h3 className="px-4 py-2 text-lg font-semibold text-amber-800 border-b border-gray-200">
              Plus
            </h3>
            <div className="py-2">
              {helpOptions.map((option, index) => (
                <React.Fragment key={option.label}>
                  <HelpButton
                    icon={option.icon}
                    label={option.label}
                    onClick={option.onClick}
                  />
                  {index < helpOptions.length - 1 && (
                    <div className="mx-4 border-b border-gray-100" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMobileMenu = () => (
    <HeaderMobile
      setIsMobileMenuOpen={setIsMobileMenuOpen}
      navigate={navigate}
      nbr={nbr}
      paniernbr={paniernbr}
    />
  );

  ///////////////////////

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduits(JSON.parse(local));
    } else {
      setProduits(0);
    }
  }, []);
  return (
    <div className="">
      {/*  fixed w-full  Top bar */}
      <div className="bg-emerald-700 text-white py-1 px-4 text-sm  flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Phone className="h-4 w-4 mr-1" /> Support: +227 87727501
          </span>
          <span className="flex items-center">
            <Truck className="h-4 w-4 mr-1" /> Livraison gratuite dès 30 000F
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center hover:text-emerald-200"
            onClick={() => toggleDropdown("language")}
          >
            <Globe className="h-4 w-4 mr-1" /> FR
            <ChevronDown
              className={`h-3 w-3 ml-1 transition-transform ${
                activeDropdown === "language" ? "transform rotate-180" : ""
              }`}
            />
          </button>
          {activeDropdown === "language" && renderDropdownContent("language")}
        </div>
      </div>

      {/* Main header */}
      <header
        className="bg-gradient-to-r from-amber-100 to-amber-300 text-gray-800 shadow-lg"
        ref={dropdownRef}
      >
        <div className="container mx-auto px-2 px-0 py-3 flex flex-wrap items-center justify-between">
          <div className="relative flex items-center space-x-9 p-1 bg-gradient-to-r from-amber-100 to-amber-300 shadow-md rounded-xl">
            <button
              onClick={toggleMenu}
              className="text-amber-800  hover:text-amber-900 md:hidden focus:outline-none transition-transform duration-300 transform hover:rotate-180"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-8 w-8 text-amber-800 hover:text-amber-900" />
              ) : (
                <Menu className="h-8 w-8 cursor-pointer" />
              )}
            </button>

            <span
              className="text-2xl w-24 h-16 font-extrabold text-amber-900 tracking-widest"
              onClick={() => navigate("/Home")}
            >
              <img
                src={LogoText}
                className="w-auto h-full object-contain cursor-pointer transition-opacity duration-300 hover:opacity-90"
                alt="Logo"
              />
            </span>

            {isMenuOpen && (
              <div className="absolute md:right-4 lg:right-8 mt-2 flex space-x-1 md:space-x-3 p-1 bg-white border border-gray-200 rounded-full shadow-xl transition-all duration-500 ease-out">
                {/* Menu Button - Hidden on larger screens */}
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="sm:hidden bg-green-900 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl"
                >
                  <Menu className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                {/* Notification Button */}
                <button className="bg-green-500 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
                  <div
                    className="relative text-amber-800 hover:text-amber-900"
                    aria-label="Notifications"
                    onClick={() => navigate("/NotificationHeader")}
                  >
                    <Bell className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 md:w-4 md:h-4 text-[10px] md:text-xs text-white flex items-center justify-center">
                      3
                    </span>
                  </div>
                </button>
                <button className="bg-red-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
                  <div
                    className="relative text-amber-800 hover:text-amber-900"
                    aria-label="Wishlist"
                    onClick={() => navigate("/Like produit")}
                  >
                    <Heart className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="absolute -top-1 -right-1 bg-emerald-500 rounded-full w-3 h-3 md:w-4 md:h-4 text-[10px] md:text-xs text-white flex items-center justify-center">
                      5
                    </span>
                  </div>
                </button>
                {/*  */}
                {/* Shopping Cart Button */}
                <button className="bg-blue-500 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
                  <div onClick={() => navigate("/Panier")} className="relative">
                    <div className="bg-emerald-600 rounded-full z-10 w-4 h-4 md:w-5 md:h-5 flex items-center justify-center text-white text-[10px] md:text-xs font-bold absolute -top-2 -right-2">
                      {paniernbr ? paniernbr.length : 0}{" "}
                    </div>
                    <ShoppingCart
                      className="h-5 w-5 md:h-6 md:w-6 text-amber-800 hover:text-amber-900 cursor-pointer transition-transform transform hover:scale-110"
                      aria-label="Panier"
                    />
                  </div>
                </button>
                {/* Message Button */}
                <button className="bg-green-500 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
                  <div
                    className="relative text-amber-800 hover:text-amber-900"
                    aria-label="Messages"
                    onClick={() => navigate("/Messagerie")}
                  >
                    <MessageCircle className="h-5 w-5 md:h-6 md:w-6" />
                    <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3 md:w-4 md:h-4 text-[10px] md:text-xs text-white flex items-center justify-center">
                      {nbr}
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Search bar */}
          {/* <div className="relative flex-grow max-w-xl mx-4 my-2 w-full">
            <input
              className="border-2 text-[#30A08B] border-emerald-600 p-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="text"
              placeholder="Rechercher des produits..."
              maxLength={45}
              aria-label="Search products"
            />
            <div className="flex items-center justify-center">
              <Camera
                className="absolute right-20 top-1/2 transform -translate-y-1/2 text-emerald-600 cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-emerald-700"
                aria-label="Camera"
              />
              <button
                className="absolute right-1 p-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 text-white rounded-full px-4 hover:bg-emerald-700 transition"
                type="submit"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div> */}
          <SearchBar />

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button
                className="flex items-center text-amber-800 hover:text-amber-900"
                onClick={() => toggleDropdown("categories")}
                aria-label="Categories"
              >
                <span>Catégories</span>
                <ChevronDown
                  className={`h-4 w-4 ml-1 transition-transform ${
                    activeDropdown === "categories"
                      ? "transform rotate-180"
                      : ""
                  }`}
                />
              </button>
              {activeDropdown === "categories" &&
                renderDropdownContent("categories")}
            </div>

            <button
              onClick={() => navigate("/Produit promotions")}
              className="text-amber-800 hover:text-amber-900"
            >
              Promotions
            </button>
            <button
              onClick={() => navigate("/Nouveau produit")}
              className="text-amber-800 hover:text-amber-900"
            >
              Nouveautés
            </button>

            <div className="relative">
              <button
                className="flex items-center text-amber-800 hover:text-amber-900"
                onClick={() => toggleDropdown("account")}
                aria-label="Account options"
              >
                <User className="h-6 w-6 mr-1" />
                <span>Compte</span>
                <ChevronDown
                  className={`h-4 w-4 ml-1 transition-transform ${
                    activeDropdown === "account" ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "account" && renderDropdownContent("account")}
            </div>

            <div className="relative">
              <button
                className="flex items-center text-amber-800 hover:text-amber-900"
                onClick={() => toggleDropdown("help")}
                aria-label="Help options"
              >
                <span>Plus</span>
                <ChevronDown
                  className={`h-4 w-4 ml-1 transition-transform ${
                    activeDropdown === "help" ? "transform rotate-180" : ""
                  }`}
                />
              </button>
              {activeDropdown === "help" && renderDropdownContent("help")}
            </div>

            <button
              onClick={() => navigate("/NotificationHeader")}
              className="relative text-amber-800 hover:text-amber-900"
              aria-label="Notifications"
            >
              {/* Je veux que tu me créer un contenu pour mon panier si une fois je clique sur cette button  */}
              <Bell className="h-6 w-6" />

              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                {5}
              </span>
            </button>

            <button
              className="relative text-amber-800 hover:text-amber-900"
              aria-label="Wishlist"
              onClick={() => navigate("/Like produit")}
            >
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-emerald-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                5
              </span>
            </button>
            <div onClick={() => navigate("/Panier")} className="relative">
              <div className="bg-emerald-600 rounded-full z-10 w-5 h-5 flex items-center justify-center text-white text-xs font-bold absolute -top-2 -right-2">
                {" "}
                {paniernbr ? paniernbr.length : 0}{" "}
              </div>
              <ShoppingCart
                className="h-6 w-6 text-amber-800 hover:text-amber-900 cursor-pointer transition-transform transform hover:scale-110"
                aria-label="Panier"
              />
            </div>

            <div onClick={() => navigate("/Messagerie")} className="relative">
              <div className="bg-emerald-600 rounded-full z-10 w-5 h-5 flex items-center justify-center text-white text-xs font-bold absolute -top-2 -right-2">
                {" "}
                {nbr}{" "}
              </div>
              <MessageCircle
                className="h-6 w-6 text-amber-800 hover:text-amber-900 cursor-pointer transition-transform transform hover:scale-110"
                aria-label="messages"
              />
            </div>

            {isCartOpen && (
              <div className="absolute right-0 w-full h-screen max-w-sm md:max-w-md lg:max-w-lg text-black top-5 rounded shadow-lg z-50 p-2">
                1
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Promo banner */}
      <div className="bg-amber-200 text-amber-800 py-2 px-4 text-sm flex justify-center items-center">
        <Gift className="h-4 w-4 mr-2" /> Offre spéciale : -20% sur votre
        première commande avec le code BIENVENUE20
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && renderMobileMenu()}
    </div>
  );
}

export default HomeHeader;
