import React, { useState, useEffect } from "react";
import {
  Heart,
  Trash2,
  Share2,
  Filter,
  SortDesc,
  ShoppingCart,
  ArrowUpRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LikeProduitPage = ({ acces }) => {
  const navigation = useNavigate();
  const [likedProducts, setLikedProducts] = useState([]);
  const [sortBy, setSortBy] = useState("dateAdded");
  const [filterCategory, setFilterCategory] = useState("all");
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_URL = process.env.REACT_APP_Backend_Url;
  const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id; // Assurez-vous d'avoir stocké l'ID de l'utilisateur

  // Charger les produits likés au montage du composant
  useEffect(() => {
    fetchLikedProducts();
  }, []);

  const fetchLikedProducts = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${API_URL}/likes/user/${userId}`);
      // console.log({data : response.data?.data});
      
      setLikedProducts(response.data?.data?.map((like) => like.produit));
      setIsLoading(false);
    } catch (err) {
      setError("Erreur lors du chargement des favoris");
      setIsLoading(false);
      console.error("Erreur:", err);
    }
  };

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const removeFromLiked = async (productId) => {
    try {
      await axios.delete(`${API_URL}/likes/${userId}/${productId}`);
      setLikedProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
      showToast("Produit retiré des favoris");
    } catch (err) {
      showToast("Erreur lors de la suppression du favori");
      console.error("Erreur:", err);
    }
  };

  const shareProduct = (product) => {
    // Implémentation du partage (vous pouvez utiliser l'API Web Share si disponible)
    if (navigator.share) {
      navigator
        .share({
          title: product.name,
          text: product.description,
          url: window.location.href,
        })
        .then(() => showToast("Produit partagé avec succès !"))
        .catch((err) => console.error("Erreur lors du partage:", err));
    } else {
      showToast("Le partage n'est pas disponible sur votre appareil");
    }
  };

  const addToCart = async (product) => {
    // Implémentez ici votre logique d'ajout au panier
    showToast(`${product.name} ajouté au panier !`);
  };

  // Fonction pour nettoyer le HTML et limiter le texte
  const formatDescription = (htmlString, maxLength = 100) => {
    // Supprimer toutes les balises HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = htmlString;
    let text = tempDiv.textContent || tempDiv.innerText || "";

    // Supprimer les espaces multiples et les retours à la ligne
    text = text.replace(/\s+/g, " ").trim();

    // Limiter la longueur et ajouter des points de suspension si nécessaire
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#30A08B]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Toast */}
      <div
        className={`fixed top-4 right-4 bg-[#30A08B] text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
          showNotification
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        }`}
      >
        {notificationMessage}
      </div>

      {/* En-tête */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-semibold text-gray-900">Mes Favoris</h1>
        </div>
      </div>

      {/* Filtres et tri */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="rounded-lg border-gray-300 focus:ring-[#30A08B] focus:border-[#30A08B]"
            >
              <option value="all">Toutes les catégories</option>
              <option value="Chaussures">Chaussures</option>
              <option value="Vêtements">Vêtements</option>
              <option value="Accessoires">Accessoires</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border-gray-300 focus:ring-[#30A08B] focus:border-[#30A08B]"
            >
              <option value="dateAdded">Date d'ajout</option>
              <option value="price">Prix</option>
              <option value="name">Nom</option>
            </select>
          </div>
        </div>

        {/* Liste des produits */}
        {likedProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Aucun produit dans vos favoris
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {likedProducts
              .filter(
                (product) =>
                  filterCategory === "all" ||
                  product.category === filterCategory
              )
              .sort((a, b) => {
                if (sortBy === "price") return a.price - b.price;
                if (sortBy === "name") return a.name.localeCompare(b.name);
                return new Date(b.dateAdded) - new Date(a.dateAdded);
              })
              .map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
                  onMouseEnter={() => setHoveredProduct(product._id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  <div className="relative">
                    <img
                      src={product.image1}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div
                      className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                        hoveredProduct === product._id
                          ? "opacity-100"
                          : "opacity-0"
                      }`}
                    >
                      <button
                        onClick={() => removeFromLiked(product._id)}
                        className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                      <button
                        onClick={() => shareProduct(product)}
                        className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 transition-colors"
                      >
                        <Share2 size={20} />
                      </button>
                      <button
                        onClick={() =>
                          navigation(`/ProduitDétail/${product._id}`)
                        }
                        className="p-2 bg-[#30A08B] rounded-full text-white hover:bg-[#268771] transition-colors"
                      >
                        <ShoppingCart size={20} />
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-[#30A08B] font-bold mt-2">
                      {product.prix?.toFixed(2)} €
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {product.category}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      {formatDescription(product.description || "")}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        Stock: {product?.quantite}
                      </span>
                      <button
                        onClick={() => {
                          // Naviguer vers la page du produit
                          navigation(`/ProduitDétail/${product._id}`);
                        }}
                        className="flex items-center text-[#30A08B] hover:text-[#268771]"
                      >
                        Voir plus
                        <ArrowUpRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikeProduitPage;
