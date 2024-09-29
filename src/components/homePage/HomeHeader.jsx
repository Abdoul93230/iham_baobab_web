import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, User, ChevronDown, ShoppingCart, Camera, Search, Heart, Bell, Globe, Truck, Gift, Phone, X } from "lucide-react";
import LogoText from "../../image/LogoText.png";

function HomeHeader({chg}) {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(prevDropdown => prevDropdown === dropdown ? null : dropdown);
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

  const renderDropdownContent = (dropdown) => {
    switch (dropdown) {
      case 'language':
        return (
          <div className="absolute top-8 right-4 mt-2 w-32 bg-white border border-gray-200 rounded shadow-lg z-50">
            <button className="block px-4 py-2 text-gray-800 hover:bg-emerald-100 transition">English</button>
            <button className="block px-4 py-2 text-gray-800 hover:bg-emerald-100 transition">Deutsch</button>
            <button className="block px-4 py-2 text-gray-800 hover:bg-emerald-100 transition">Español</button>
          </div>
        );
      case 'categories':
        return (
          <div className="absolute z-3 left-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg">
            <button className="block px-4 py-2 text-gray-800 col-12 text-start hover:bg-amber-100 transition">Électronique</button>
            <button className="block px-4 py-2 col-12 text-start text-gray-800 hover:bg-amber-100 transition">Mode</button>
            <button className="block px-4 py-2 col-12 text-start text-gray-800 hover:bg-amber-100 transition">Maison & Jardin</button>
            <button className="block px-4 py-2 col-12 text-start text-gray-800 hover:bg-amber-100 transition">Sports & Loisirs</button>
          </div>
        );
      case 'account':
        return (
          <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg z-2">
            <button className="block w-full text-left p-2 bg-emerald-600 text-white hover:bg-emerald-700 transition">Se connecter</button>
            <button onClick={() => navigate("/Compte")} className="block col-12 px-4 text-start py-2 text-gray-800 hover:bg-amber-100 transition">Mon compte</button>
            <button onClick={() => navigate('/Commande')} className="block col-12 text-start px-4  py-2 text-gray-800 hover:bg-amber-100 transition">Mes commandes</button>
            <button onClick={() => navigate("/Inviter les amis")} className="block col-12 px-4 text-start py-2 text-gray-800 hover:bg-amber-100 transition">Mes avis</button>
            <button className="block col-12 px-4 text-start py-2 text-gray-800 hover:bg-amber-100 transition">Mes adresses</button>
            <button onClick={() => navigate("/Suggestion")} className="block col-12 text-start px-4 py-2 text-gray-800 hover:bg-amber-100 transition">Faire une suggestions</button>
            <button className="block col-12 text-start px-4 py-2 text-gray-800 hover:bg-amber-100 transition">Se déconnecter</button>
          </div>
        );
      case 'help':
        return (
          <div className="absolute z-2 right-0 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg">
            <button onClick={() => navigate("/Suggestion")} className="block col-md-12 text-start p-2 text-gray-800 hover:bg-amber-100 transition">Centre d'aide</button>
            <button className="block p-2 col-md-12 text-start  text-gray-800 hover:bg-amber-100 transition">Address de livraison</button>
            <button className="block p-2 col-md-12 text-start  text-gray-800 hover:bg-amber-100 transition">Mode de paiement</button>
            <button className="block p-2 col-md-12 text-start  text-gray-800 hover:bg-amber-100 transition">Paramètre de notification</button>
            <button className="block p-2 col-md-12 text-start  text-gray-800 hover:bg-amber-100 transition">Avis de confidentialité</button>
            <button className="block p-2 col-md-12 text-start  text-gray-800 hover:bg-amber-100 transition">Questions fréquemment possées</button>
            <button className="block p-2 col-md-12 text-start  text-gray-800 hover:bg-amber-100 transition">Information legal</button>
          </div>
        );
      default:
        return null;
    }
  };

  const renderMobileMenu = () => (
    <div className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50">
      <div className="flex justify-end p-4">
        <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-col items-center space-y-4 p-4">
        <button onClick={() => toggleDropdown('categories')} className="text-white">Catégories</button>
        {activeDropdown === 'categories' && renderDropdownContent('categories')}
        
        <button className="text-white">Promotions</button>
        <button className="text-white">Nouveautés</button>
        
        <button onClick={() => toggleDropdown('account')} className="text-white">Compte</button>
        {activeDropdown === 'account' && renderDropdownContent('account')}
        
        <button onClick={() => toggleDropdown('help')} className="text-white">Plus</button>
        {activeDropdown === 'help' && renderDropdownContent('help')}
        
        <button className="text-white">Notifications</button>
        <button className="text-white">Liste de souhaits</button>
        <button className="text-white">Panier</button>
      </div>
    </div>
  );

  return (
    <>
      {/* Top bar */}
      <div className="bg-emerald-700 text-white py-1 px-4 text-sm flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Phone className="h-4 w-4 mr-1" /> Support: +33 1 23 45 67 89
          </span>
          <span className="flex items-center">
            <Truck className="h-4 w-4 mr-1" /> Livraison gratuite dès 50€
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center hover:text-emerald-200"
            onClick={() => toggleDropdown('language')}
          >
            <Globe className="h-4 w-4 mr-1" /> FR
            <ChevronDown className={`h-3 w-3 ml-1 transition-transform ${activeDropdown === 'language' ? "transform rotate-180" : ""}`} />
          </button>
          {activeDropdown === 'language' && renderDropdownContent('language')}
        </div>
      </div>

      {/* Main header */}
      <header className="bg-gradient-to-r from-amber-100 to-amber-300 text-gray-800 shadow-lg" ref={dropdownRef}>
        <div className="container mx-auto px-2 px-0 py-3 flex flex-wrap items-center justify-between">
          {/* Logo and menu button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-amber-700 hover:text-amber-900 md:hidden"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 cursor-pointer" />
            </button>
            <span className="text-2xl w-20 h-15 font-bold text-amber-800">
              <img src={LogoText} className="w-auto h-auto cursor-pointer" alt="" />
            </span>
          </div>

          {/* Search bar */}
          <div className="relative flex-grow max-w-xl mx-4 my-2 w-full">
            <input
              className="border-2 border-emerald-600 p-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
              type="text"
              placeholder="Rechercher des produits..."
              maxLength={35}
              aria-label="Search products"
            />
            <div className="flex items-center justify-center">
              <Camera className="absolute right-20 top-1/2 transform -translate-y-1/2 text-emerald-600 cursor-pointer transition-transform duration-200 hover:scale-110 hover:text-emerald-700" aria-label="Camera" />
              <button
                className="absolute right-1 p-2 top-1/2 transform -translate-y-1/2 bg-emerald-600 text-white rounded-full px-4 hover:bg-emerald-700 transition"
                type="submit"
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <div className="relative">
              <button
                className="flex items-center text-amber-800 hover:text-amber-900"
                onClick={() => toggleDropdown('categories')}
                aria-label="Categories"
              >
                <span>Catégories</span>
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${activeDropdown === 'categories' ? "transform rotate-180" : ""}`} />
              </button>
              {activeDropdown === 'categories' && renderDropdownContent('categories')}
            </div>

            <button className="text-amber-800 hover:text-amber-900">Promotions</button>
            <button className="text-amber-800 hover:text-amber-900">Nouveautés</button>

            <div className="relative">
              <button
                className="flex items-center text-amber-800 hover:text-amber-900"
                onClick={() => toggleDropdown('account')}
                aria-label="Account options"
              >
                <User className="h-6 w-6 mr-1" />
                <span>Compte</span>
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${activeDropdown === 'account' ? "transform rotate-180" : ""}`} />
              </button>
              {activeDropdown === 'account' && renderDropdownContent('account')}
            </div>

            <div className="relative">
              <button
                className="flex items-center text-amber-800 hover:text-amber-900"
                onClick={() => toggleDropdown('help')}
                aria-label="Help options"
              >
                <span>Plus</span>
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform ${activeDropdown === 'help' ? "transform rotate-180" : ""}`} />
              </button>
              {activeDropdown === 'help' && renderDropdownContent('help')}
            </div>

            <button className="relative text-amber-800 hover:text-amber-900" aria-label="Notifications">
              <Bell className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">3</span>
            </button>

            <button className="relative text-amber-800 hover:text-amber-900" aria-label="Wishlist">
              <Heart className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 bg-emerald-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">5</span>
            </button>

            <div className="relative">
              <div className="bg-emerald-600 rounded-full z-10 w-5 h-5 flex items-center justify-center text-white text-xs font-bold absolute -top-2 -right-2">3</div>
              <ShoppingCart className="h-6 w-6 text-amber-800 hover:text-amber-900 cursor-pointer transition-transform transform hover:scale-110" aria-label="Panier" />
            </div>
          </nav>
        </div>
      </header>

      {/* Promo banner */}
      <div className="bg-amber-200 text-amber-800 py-2 px-4 text-sm flex justify-center items-center">
        <Gift className="h-4 w-4 mr-2" /> Offre spéciale : -20% sur votre première commande avec le code BIENVENUE20
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && renderMobileMenu()}
    </>
  );
}

export default HomeHeader;