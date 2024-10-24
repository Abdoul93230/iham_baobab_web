import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Sparkles, Trash2, Menu, User, ChevronDown, ChevronUp, ShoppingCart, Camera, Search, Heart, Bell, Globe, Truck, Gift, Phone, X, FolderIcon  } from "lucide-react";
import LogoText from "../../image/LogoText.png";
import HeaderMobile from "./HeaderMobile";
// import './style.css'


function HomeHeader() {
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [openSection, setOpenSection] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

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
            <button onClick={() => navigate("/Inviter les amis")} className="block col-12 px-4 text-start py-2 text-gray-800 hover:bg-amber-100 transition">Invité des amis</button>
            <button className="block col-12 px-4 text-start py-2 text-gray-800 hover:bg-amber-100 transition">Mes adresses</button>
            <button onClick={() => navigate("/Suggestion")} className="block col-12 text-start px-4 py-2 text-gray-800 hover:bg-amber-100 transition">Faire une suggestions</button>
            <button className="block col-12 text-start px-4 py-2 text-gray-800 hover:bg-amber-100 transition">Se déconnecter</button>
          </div>
        );
      case 'help':
        return (
          <div className="absolute z-2 right-0 mt-2 w-72 bg-white border border-gray-200 rounded shadow-lg">
            <button onClick={() => navigate('/Service')} className="block col-md-12 col-12 text-start p-2 text-gray-800 hover:bg-amber-100 transition">Centre d'aide</button>
            <button onClick={() => navigate("/Livraison")} className="block p-2 col-md-12 text-start col-12 text-gray-800 hover:bg-amber-100 transition">Address de livraison</button>
            <button onClick={() => navigate("/Paement")} className="block p-2 col-md-12 text-start col-12 text-gray-800 hover:bg-amber-100 transition">Mode de paiement</button>
            <button onClick={() => navigate("/Paramètre de notification")} className="block p-2 col-12 col-md-12 text-start  text-gray-800 hover:bg-amber-100 transition">Paramètre de notification</button>
            <button onClick={() => navigate("/Avis de confidentialité")} className="block p-2 col-12 col-md-12 text-start  text-gray-800 hover:bg-amber-100 transition">Avis de confidentialité</button>
            <button onClick={() => navigate("/Question Fréquement possées")} className="block col-12 p-2 col-md-12 text-start  text-gray-800 hover:bg-amber-100 transition">Questions fréquemment possées</button>
            <button onClick={() => navigate('/Legal information')} className="block p-2 col-12 col-md-12 text-start  text-gray-800 hover:bg-amber-100 transition">Information legal</button>
          </div>
        );
      default:
        return null;
    }
  };


  const renderMobileMenu = () => (
    <HeaderMobile
    setIsMobileMenuOpen={setIsMobileMenuOpen}
    navigate={navigate}/>
  );



  // panier code 
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Smartphone XYZ", price: 499.99, quantity: 1, image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/product-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900" },
    { id: 2, name: "Casque audio ABC", price: 129.99, quantity: 2, image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/product-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900" },
    { id: 3, name: "Chargeur portable", price: 39.99, quantity: 1, image: "https://cc-prod.scene7.com/is/image/CCProdAuthor/product-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900" },
  ]);
  



  
  
  
  ///////////////////////

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  return (
    <div className="">
      {/*  fixed w-full  Top bar */}
      <div className="bg-emerald-700 text-white py-1 px-4 text-sm  flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            <Phone className="h-4 w-4 mr-1" /> Support: +227 85822480
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

          {/* <div className="flex items-center space-x-4">
            <button */}
            
        
  


              <div className="relative flex items-center space-x-9 p-1 bg-gradient-to-r from-amber-100 to-amber-300 shadow-md rounded-xl">
 
    <button
    onClick={toggleMenu}
    className="text-amber-800  hover:text-amber-900 md:hidden focus:outline-none transition-transform duration-300 transform hover:rotate-180"
    aria-label="Toggle menu"
  >
     {isMenuOpen ? (
<X className="h-8 w-8 text-amber-800 hover:text-amber-900" />
): 
<Menu className="h-8 w-8 cursor-pointer" />
}
</button>


  <span className="text-2xl w-24 h-16 font-extrabold text-amber-900 tracking-widest" onClick={() => navigate("/Home")}>
    <img
      src={LogoText}
      className="w-auto h-full object-contain cursor-pointer transition-opacity duration-300 hover:opacity-90"
      alt="Logo"
    />
  </span>

  {isMenuOpen && (
    <div className="absolute top-0  flex space-x-4 p-1 bg-white border border-gray-200 rounded-full shadow-xl transition-all duration-500 ease-out">
      <button onClick={() => setIsMobileMenuOpen(true)} className="bg-green-900 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
        <Menu className="w-8 h-8" />
      </button>
      <button className="bg-green-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
      <div className="relative text-amber-800 hover:text-amber-900" aria-label="Notifications" onClick={() => navigate("/Notification header")}>
        <Bell className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">3</span>
      </div>
      </button>
      <button className="bg-red-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
      <div className="relative text-amber-800 hover:text-amber-900" aria-label="Wishlist">
          <Heart className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-emerald-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">5</span>
        </div>
      </button>
      <button className="bg-blue-500 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl">
      <div onClick={() => navigate("/Panier")} className="relative">
            <div className="bg-emerald-600 rounded-full z-10 w-5 h-5 flex items-center justify-center text-white text-xs font-bold absolute -top-2 -right-2"> 10 </div>
            <ShoppingCart className="h-6 w-6 text-amber-800 hover:text-amber-900 cursor-pointer transition-transform transform hover:scale-110" aria-label="Panier" />
        </div>
      </button>
    </div>
  )}
</div>









          {/* Search bar */}
          <div className="relative flex-grow max-w-xl mx-4 my-2 w-full">
            <input
              className="border-2 text-[#30A08B] border-emerald-600 p-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-emerald-500"
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

            <button onClick={() => navigate("/Notification header")} className="relative text-amber-800 hover:text-amber-900" aria-label="Notifications">
              {/* Je veux que tu me créer un contenu pour mon panier si une fois je clique sur cette button  */}
              <Bell className="h-6 w-6" />

          
        <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
          {/* {unreadCount} */}
          2
        </span>


            </button>
     
        <button className="relative text-amber-800 hover:text-amber-900" aria-label="Wishlist">
          <Heart className="h-6 w-6" />
          <span className="absolute -top-1 -right-1 bg-emerald-500 rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">5</span>
        </button>
        <div onClick={() => navigate("/Panier")} className="relative">
            <div className="bg-emerald-600 rounded-full z-10 w-5 h-5 flex items-center justify-center text-white text-xs font-bold absolute -top-2 -right-2"> 2 </div>
            <ShoppingCart className="h-6 w-6 text-amber-800 hover:text-amber-900 cursor-pointer transition-transform transform hover:scale-110" aria-label="Panier" />
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
        <Gift className="h-4 w-4 mr-2" /> Offre spéciale : -20% sur votre première commande avec le code BIENVENUE20
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && renderMobileMenu()}
    </div>
  );
}

export default HomeHeader;




