import React, { useEffect, useState } from "react";
import {
  X,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Bell,
  Heart,
  ShoppingCart,
  MessageCircle,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const HeaderMobile = ({ setIsMobileMenuOpen, navigate, nbr, paniernbr }) => {
  const [openSection, setOpenSection] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigation = useNavigate();
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const BackendUrl = process.env.REACT_APP_Backend_Url;
  const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;

  useEffect(() => {
    if (userId) {
      fetchUserLikes();
    }
  }, [userId]);

  const fetchUserLikes = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/likes/user/${userId}`);
      const likedIds = new Set(response.data.map((like) => like.produit._id));
      setLikedProducts(likedIds);
      // console.log(likedIds);
    } catch (error) {
      console.error("Erreur lors du chargement des likes:", error);
    }
  };

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  const handleItemClick = (item) => {
    console.log("Item clicked:", item);
  };
  const menuData = [
    {
      id: 1,
      question: "Catégories",
      // answers: [
      //   "Électronique",
      //   "Mode",
      //   "Maison & jardin"
      // ]
      answers: DATA_Categories.filter((item) => item.name !== "all").map(
        (item) => item.name
      ),
    },
    {
      id: 2,
      question: "Compte",
      answers: [
        "Mon compte",
        "Mes commandes",
        "Invité des amis",
        "Mes addresses",
        "Faire une Suggestions",
        "Se déconnecter",
      ],
      links: [
        "/Compte",
        "/Commande",
        "/Inviter les amis",
        "/Livraison",
        "/Suggestion",
        "/Home",
      ],
    },
    {
      id: 3,
      question: "Plus",
      answers: [
        "Centre d'aide",
        "Address de livraison",
        // "Mode de paeiment",
        "Paramètre de notification",
        "Avis de confidentialité",
        "Question fréquemment possées",
        "Information Legal",
      ],
      links: [
        "/service",
        "/Livraison",
        // "/Paement",
        "/Paramètre de notification",
        "/Avis de confidentialité",
        "/Question Fréquement possées",
        "/Legal information",
      ],
    },
  ];
  const bottomIcons = [
    // {
    //   icon: Bell,
    //   count: 3,
    //   bgColor: "from-green-400 to-green-600",
    //   countBg: "bg-red-500",
    //   label: "Notifications",
    //   onClick: () => navigate("/Notification header"),
    // },
    {
      icon: Heart,
      count: likedProducts?.size,
      bgColor: "from-red-400 to-red-600",
      countBg: "bg-emerald-500",
      label: "Wishlist",
      onClick: () => navigate("/Like produit"),
    },
    {
      icon: ShoppingCart,
      count: paniernbr ? paniernbr?.length : 0,
      bgColor: "from-blue-400 to-blue-600",
      countBg: "bg-emerald-600",
      label: "Panier",
      onClick: () => navigate("/Panier"),
    },
    {
      icon: MessageCircle,
      count: nbr,
      bgColor: "bg-green-500",
      countBg: "bg-emerald-600",
      label: "Panier",
      onClick: () => navigate("/Panier"),
    },
  ];

  return (
    <div className="md:hidden animate-fadeIn fixed inset-0 bg-white bg-opacity-20 z-50">
      {/* Fond avec animation de gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#30A08B] to-[#B2905F] animate-gradient-xy">
        <div className="absolute inset-0 backdrop-blur-sm bg-white/30" />
      </div>

      {/* En-tête */}
      <div className="relative flex justify-between p-4 animate-slideDown">
        <div className="flex items-center cursor-pointer space-x-2">
          <Sparkles className="h-6 w-6 text-white animate-pulse" />
          <h2 className="text-white text-xl font-bold animate-bounce">Menu</h2>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="text-white p-2 rounded-full hover:bg-white/20 transform hover:rotate-180 transition-all duration-500"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Contenu principal avec défilement */}
      <div className="relative flex flex-col space-y-4 p-4 overflow-y-auto h-[calc(100vh-180px)]">
        {/* Boutons fixes */}
        {[
          { name: "Promotions", link: "/Produit promotions" },
          { name: "Nouveautés", link: "/Nouveau produit" },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={() => navigation(item.link)}
            className="group relative w-full p-3 bg-white/10 backdrop-blur-md rounded-lg shadow-lg transform hover:scale-105 hover:translate-y-[-4px] transition-all duration-500"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#30A08B]/50 to-[#B2905F]/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <span className="relative text-white text-lg font-medium group-hover:tracking-wider transition-all duration-500">
              {item.name}
            </span>
          </button>
        ))}

        {/* Sections dépliables */}
        {menuData.map((section, sectionIndex) => (
          <div
            key={section.id}
            className="w-full"
            style={{
              animation: "slideIn 0.5s ease-out forwards",
              animationDelay: `${sectionIndex * 200}ms`,
            }}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className="relative w-full p-4 bg-[#30A08B] rounded-t-lg shadow-lg transform hover:translate-x-2 transition-all duration-500 group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#30A08B] to-[#B2905F] rounded-t-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative flex justify-between items-center">
                <span className="text-white font-medium group-hover:tracking-wider transition-all duration-500">
                  {section.question}
                </span>
                <div
                  className={`transform transition-all duration-500 ${
                    openSection === section.id ? "rotate-180" : ""
                  }`}
                >
                  {openSection === section.id ? (
                    <ChevronUp className="text-white animate-bounce" />
                  ) : (
                    <ChevronDown className="text-white" />
                  )}
                </div>
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-700 ease-in-out transform
                ${
                  openSection === section.id
                    ? "max-h-[500px] opacity-100 translate-y-0"
                    : "max-h-0 opacity-0 -translate-y-4"
                }`}
            >
              <div className="bg-white/95 backdrop-blur-md rounded-b-lg shadow-xl">
                {section.answers.map((answer, index) => (
                  <button
                    key={index}
                    onMouseEnter={() =>
                      setHoveredItem(`${section.id}-${index}`)
                    }
                    onMouseLeave={() => setHoveredItem(null)}
                    onClick={() => {
                      handleItemClick(answer);
                      if (section.question === "Catégories") {
                        navigation(`/Categorie/${answer}`);
                      } else if (section.question === "Compte") {
                        navigation(`${section.links[index]}`);
                      } else if (section.question === "Plus") {
                        navigation(`${section.links[index]}`);
                      }
                    }}
                    className="relative w-full p-3 text-start transition-all duration-500 hover:pl-6"
                    style={{
                      animation: "slideInRight 0.5s ease-out forwards",
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div
                      className={`absolute left-0 top-0 bottom-0 bg-gradient-to-r from-[#30A08B] to-[#B2905F] transition-all duration-500
                      ${
                        hoveredItem === `${section.id}-${index}` ? "w-1" : "w-0"
                      }`}
                    />
                    <span
                      className={`relative text-[#30A08B] transition-all duration-500
                      ${
                        hoveredItem === `${section.id}-${index}`
                          ? "text-[#B2905F] font-medium"
                          : ""
                      }`}
                    >
                      {answer}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Barre d'icônes du bas */}
      <div className="fixed bottom-8 left-0 right-0 px-4">
        <div className="flex justify-around items-center gap-4 animate-slideUp">
          {bottomIcons.map((item, index) => (
            <button
              key={index}
              onClick={item.onClick}
              className={`relative group w-14 h-14 rounded-full bg-gradient-to-r ${item.bgColor} 
                flex items-center justify-center shadow-lg 
                transform transition-all duration-500 
                hover:scale-110 hover:shadow-2xl
                active:scale-95`}
              style={{
                animation: "bounceIn 0.5s ease-out forwards",
                animationDelay: `${index * 150}ms`,
              }}
            >
              <div className="relative">
                <item.icon className="h-6 w-6 text-white transform transition-all duration-300 group-hover:scale-110" />
                <span
                  className={`absolute -top-2 -right-2 ${item.countBg} 
                    rounded-full min-w-5 h-5 px-1
                    text-xs text-white font-bold
                    flex items-center justify-center
                    transform transition-all duration-300
                    group-hover:scale-110 group-hover:animate-pulse`}
                >
                  {item.count}
                </span>
              </div>

              {/* Tooltip */}
              <span
                className="absolute -top-8 left-1/2 transform -translate-x-1/2 
                bg-black text-white text-xs py-1 px-2 rounded 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Styles et animations */}
      <style jsx>{`
        @keyframes gradient-xy {  0% { background-position: 0% 0%; }  50% { background-position: 100% 100%; }  100% { background-position: 0% 0%; }}
        @keyframes slideIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } 
        @keyframes slideInRight {  from { opacity: 0; transform: translateX(-20px); }  to { opacity: 1; transform: translateX(0)}
        .animate-gradient-xy { background-size: 200% 200%; animation: gradient-xy 15s ease infinite;}
        .animate-fadeIn { animation: fadeIn 0.5s ease-out forwards;}
        .animate-slideDown { animation: slideDown 0.5s ease-out forwards; }
        @keyframes fadeIn {  from { opacity: 0; }  to { opacity: 1; }}
        @keyframes slideDown {  from { transform: translateY(-20px); opacity: 0; }  to { transform: translateY(0); opacity: 1; }}
        @keyframes bounceIn {0% { transform: scale(0.3); opacity: 0; }50% { transform: scale(1.05); opacity: 0.8; }70% { transform: scale(0.9); opacity: 0.9; } 100% { transform: scale(1); opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-slideUp { animation: slideUp 0.5s ease-out forwards}
      `}</style>
    </div>
  );
};

export default HeaderMobile;
