import React, { useState, useRef, useEffect } from "react";
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
} from "react-icons/fa";
import LogoText from "../../image/LogoText.png";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const DetailHomme = ({ setCartCount, paniernbr }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const swiperRef = useRef(null);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [testSearch, setTextSearch] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  const [likedProducts, setLikedProducts] = useState(new Set());
  const [ptAll, setPtAll] = useState([]);
  const params = useParams();

  const API_URL = process.env.REACT_APP_Backend_Url;
  const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;
  const navigation = useNavigate();
  ////////////////////////////////recuperation des donnees /////////////////////////////////////////////////////
  const DATA_Products = useSelector((state) => state.products.data);
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const DATA_Commentes = useSelector(
    (state) => state.products.products_Commentes
  );
  const DATA_Products_pubs = useSelector(
    (state) => state.products.products_Pubs
  );
  ////////////////////////////////recuperation des donnees ////////////////////////////////////////////////////

  //////////////////////////////// la clef de la categorie //////////////////////////////////////////////////
  const ClefCate = DATA_Categories
    ? DATA_Categories.find((item) => item.name === params?.name)
    : null;
  //////////////////////////////// la clef de la categorie //////////////////////////////////////////////////

  // la clef du type //////////////////////////////////////////////////
  const ClefTypes = DATA_Types
    ? DATA_Types.find((item) => item.name === params?.type)
    : null;

  ////////////////////////////// categorie comments

  const typeesInCategory = DATA_Types?.filter(
    (type) => type.clefCategories === ClefCate?._id
  );

  const filterComments =
    DATA_Commentes.filter((comments) =>
      typeesInCategory.some((type) => type._id === comments.clefType)
    ) || [];

  // console.log( filterComments)

  // Charger les likes au montage du composant
  useEffect(() => {
    if (userId) {
      fetchUserLikes();
    }
  }, [userId]);

  const fetchUserLikes = async () => {
    try {
      const response = await axios.get(`${API_URL}/likes/user/${userId}`);
      const likedIds = new Set(response.data.map((like) => like.produit._id));
      setLikedProducts(likedIds);
    } catch (error) {
      console.error("Erreur lors du chargement des likes:", error);
    }
  };

  const showToast = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLikeClick = async (product) => {
    if (!userId) {
      showToast("Veuillez vous connecter pour ajouter des favoris", "error");
      return;
    }

    try {
      if (likedProducts.has(product._id)) {
        // Supprimer le like
        await axios.delete(`${API_URL}/likes/${userId}/${product._id}`);
        setLikedProducts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(product._id);
          return newSet;
        });
        showToast("Produit retiré des favoris");
      } else {
        // Ajouter le like
        await axios.post(`${API_URL}/likes`, {
          userId,
          produitId: product._id,
        });
        setLikedProducts((prev) => new Set([...prev, product._id]));
        showToast("Produit ajouté aux favoris");
      }
    } catch (error) {
      showToast("Une erreur est survenue", "error");
      console.error("Erreur:", error);
    }
  };
  // Fonction utilitaire pour combiner les classes CSS
  function cn(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params.type) {
      setPtAll(
        DATA_Products.filter((item) =>
          DATA_Types.some(
            (type) => type.name === params.type && item.ClefType === type._id
          )
        )
      );
    } else {
      setPtAll(
        DATA_Products.filter((item) =>
          DATA_Types.some(
            (type) =>
              type.clefCategories === ClefCate?._id &&
              item.ClefType === type._id
          )
        )
      );
    }
  }, [params.name, params.type, activeCategory]);

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
      likedBy: "Alice",
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
      likedBy: "Bob",
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
      likedBy: "Charlie",
    },
    {
      id: 4,
      name: "Sandales",
      price: 10000,
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S6af9c502409f49f4ac50e1c4968b9b926.jpg_.webp",
      category: "sandales",
      rating: 4.9,
      reviews: 324,
      isOnSale: true,
      salePrice: 2990,
      likedBy: "Dana",
    },
  ];

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    setIsMenuOpen(false);
  };
  const handleReviewClick = (product) => {
    setSelectedProduct(product);
    setShowReviewForm(true);
  };
  const getFilteredProducts = () => {
    if (activeCategory === "all") {
      return (
        ptAll?.filter((prod) =>
          prod?.name.toLowerCase().includes(testSearch.toLowerCase())
        ) || []
      );
    }
    return (
      ptAll
        .filter((product) => product.ClefType === activeCategory)
        ?.filter((prod) =>
          prod?.name.toLowerCase().includes(testSearch.toLowerCase())
        ) || []
    );
  };

  // const handleLikeClick = (productId) => {
  //   setLikedProducts((prevLiked) => {
  //     const newLiked = new Set(prevLiked);
  //     if (newLiked.has(productId)) {
  //       newLiked.delete(productId);
  //     } else {
  //       newLiked.add(productId);
  //     }
  //     return newLiked;
  //   });
  // };
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = (id) => {
    setIsAnimating(true);
    handleLikeClick(id);
    setTimeout(() => setIsAnimating(false), 300);
  };
  const filteredProducts = getFilteredProducts();

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const CommentCard = ({ comment, product }) => (
    <div className="p-2 border rounded-md" ref={swiperRef}>
      <div className="flex items-center mb-2">
        <div
          style={{
            textAlign: "center",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
          }}
          className="w-10 h-10 bg-pink-100 rounded-full mr-2"
        >
          {comment.userName
            ?.split(" ")
            .map((word) => word.charAt(0))
            .join("")}
        </div>
        <div className="flex">
          {[...Array(comment.etoil)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
      </div>
      <p className="text-gray-600 mb-2">
        {/* Color: {comment.color} | Shoe Size: {comment.size} */}
        {comment.userName ? comment.userName : ""}
      </p>
      <p className="text-gray-800 mb-4">{comment.description}</p>
      <div className="grid grid-cols-6 gap-2 mb-4">
        {[product.image1, product.image2, product.image3].map(
          (image, index) => (
            <div
              key={index}
              className="bg-gray-200 h-22 border overflow-hidden rounded-md"
            >
              <img src={image} className="w-full h-full object-cover" alt="" />
            </div>
          )
        )}
      </div>
      <div className="flex justify-between items-center text-sm text-gray-500">
        <span>
          {product.name.slice(0, 20)}... | {formatDate(comment.date)}
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
      {/* Notification Toast */}
      {showNotification && (
        <div
          className={cn(
            "fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg transition-all duration-300",
            notificationType === "success"
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          )}
          style={{ zIndex: 100 }}
        >
          <p className="text-sm">{notificationMessage}</p>
        </div>
      )}
      {/* Top Banner */}
      <div className="bg-[#30A08B] text-white text-center py-2 text-sm lg:text-base">
        Livraison gratuite pour toute commande supérieure ou égale à 30 000 F
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
                onClick={() => handleCategoryClick("all")}
                className={`text-white-900  hover:text-[#30A08B] transition-colors text-sm lg:text-base ${
                  activeCategory === "all"
                    ? "font-bold text-[#30A08B]"
                    : "text-[#B17236]"
                }`}
              >
                {"Tous les produits"}
              </button>

              {DATA_Types?.filter(
                (para) => para.clefCategories === ClefCate?._id
              ).map((category) => (
                <button
                  key={category._id}
                  onClick={() => handleCategoryClick(category._id)}
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
                    onClick={() => navigate("/NotificationHeader")}
                  >
                    <Bell className="h-6 w-6" />
                    <span className="absolute -top-1 -right-1  bg-[#30A08B] rounded-full w-4 h-4 text-xs text-white flex items-center justify-center">
                      0
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => navigate("/Like produit")}
                  className="transition-colors rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl"
                >
                  <div className="relative text-amber-800 hover:text-[#30A08B]">
                    <Heart className="h-6 w-6" />
                    <span className="absolute -top-2 -right-1 bg-[#30A08B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      0
                    </span>
                  </div>
                </button>
                <button
                  onClick={() => navigate("/Panier")}
                  className="transition-colors rounded-full flex items-center justify-center text-white shadow-lg transform transition-transform duration-300 hover:scale-125 hover:shadow-2xl"
                >
                  <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-amber-800 hover:text-[#30A08B] transition-colors" />
                  {/* {cartCount > 0 && ( */}
                  <span className="absolute -top-2 -right-1 bg-[#30A08B] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                    {paniernbr ? paniernbr?.length : 0}
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
                onClick={() => {
                  handleCategoryClick("all");
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 text-base hover:bg-gray-50 hover:text-[#30A08B] transition-colors"
              >
                {"Tous les produits"}
              </button>
              {DATA_Types?.filter(
                (para) => para.clefCategories === ClefCate?._id
              ).map((category) => (
                <button
                  key={category._id}
                  onClick={() => {
                    setActiveCategory(category._id);
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
                value={testSearch}
                onChange={(e) => setTextSearch(e.target.value)}
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
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden group flex flex-col transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            >
              <div className="relative flex-grow">
                <img
                  onClick={() => navigation(`/ProduitDétail/${product._id}`)}
                  src={product.image1}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {/* <button
                  className={`absolute top-4 right-4 p-2 bg-white rounded-full shadow-md transition-colors duration-300 
        ${
          likedProducts.has(product._id)
            ? "bg-red-500 cursor-not-allowed"
            : "hover:bg-gray-100"
        }`}
                  onClick={() =>
                    !likedProducts.has(product._id) && handleClick(product._id)
                  }
                  disabled={likedProducts.has(product._id)}
                  title={
                    likedProducts.has(product._id)
                      ? "Déjà liké"
                      : "Liker ce produit"
                  }
                >
                  <Heart
                    className={`w-5 h-5 transition-transform duration-300 
          ${
            likedProducts.has(product._id)
              ? "text-[#62aca2bb] scale-110"
              : "text-[#B17236]"
          }
          ${isAnimating ? "scale-100" : "scale-100"}`}
                  />
                </button> */}
                {/* Like Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLikeClick(product);
                  }}
                  className={cn(
                    "absolute top-3 left-3 p-2 rounded-full shadow-lg transition-all duration-300 z-20",
                    likedProducts.has(product._id)
                      ? "bg-red-50 hover:bg-red-100"
                      : "bg-white hover:bg-emerald-50"
                  )}
                >
                  <Heart
                    className={cn(
                      "w-5 h-5 transition-colors duration-300",
                      likedProducts.has(product._id)
                        ? "text-red-500 fill-red-500"
                        : "text-emerald-600"
                    )}
                  />
                </button>

                {product.prixPromo > 0 && (
                  <span className="absolute top-2 left-2 bg-[#62aca2bb] text-white text-xs font-bold py-1 px-2 rounded-full">
                    -{" "}
                    {Math.round(
                      ((product.prix - product.prixPromo) / product.prix) * 100
                    )}{" "}
                    %
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-base md:text-lg font-medium mb-2 text-gray-800">
                  {product.name.slice(0, 30)}...
                </h3>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {product.prixPromo > 0 ? (
                      <>
                        <p className="text-lg md:text-xl font-bold text-[#B17236] line-through">
                          F {product.prix.toLocaleString()}
                        </p>
                        <p className="text-lg md:text-xl font-bold text-[#30A08B]">
                          F {product.prixPromo.toLocaleString()}
                        </p>
                      </>
                    ) : (
                      <p className="text-lg md:text-xl font-bold text-[#B17236]">
                        F {product.prix.toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="text-[#B2905F]">★</span>
                    <span className="ml-1 text-sm text-gray-600">
                      {4.8} (
                      {
                        DATA_Commentes.filter(
                          (item) => item.clefProduct === product._id
                        ).length
                      }
                      )
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigation(`/ProduitDétail/${product._id}`)}
                  className="mt-2 flex justify-around items-center w-full bg-[#30A08B] text-white py-2
                       rounded-full hover:bg-opacity-90 transition transition-colors duration-200 text-sm md:text-base shadow-md hover:shadow-lg"
                >
                  Ajouter au panier
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          ))}

          {filteredProducts?.length <= 0 ? (
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
              Aucun produit correspondant trouvé pour ce type. Veuillez essayer
              un autre type.
            </div>
          ) : null}
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
                  {filterComments?.map((comment) => (
                    <CommentCard
                      key={comment._id}
                      product={DATA_Products?.find(
                        (item) => item._id === comment.clefProduct
                      )}
                      comment={comment}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DetailHomme;
