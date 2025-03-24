import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import axios from "axios";

// Fonction utilitaire pour combiner les classes CSS
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProduitSimilaires = ({ titre, produits }) => {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  const API_URL = process.env.REACT_APP_Backend_Url;
  const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;

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

  const handleLikeClick = async (productId, e) => {
    e.stopPropagation();

    if (!userId) {
      showToast("Veuillez vous connecter pour ajouter des favoris", "error");
      return;
    }

    try {
      if (likedProducts.has(productId)) {
        // Supprimer le like
        await axios.delete(`${API_URL}/likes/${userId}/${productId}`);
        setLikedProducts((prev) => {
          const newSet = new Set(prev);
          newSet.delete(productId);
          return newSet;
        });
        showToast("Produit retiré des favoris");
      } else {
        // Ajouter le like
        await axios.post(`${API_URL}/likes`, {
          userId,
          produitId: productId,
        });
        setLikedProducts((prev) => new Set([...prev, productId]));
        showToast("Produit ajouté aux favoris");
      }
    } catch (error) {
      showToast("Une erreur est survenue", "error");
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="mt-12">
      {/* Notification Toast */}
      {showNotification && (
        <div
          className={cn(
            "fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg transition-all duration-300",
            notificationType === "success"
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          )}
        >
          <p className="text-sm">{notificationMessage}</p>
        </div>
      )}

      <h2 className="text-2xl font-semibold mb-6">{titre}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {produits?.map((produit) => (
          <div
            key={produit._id}
            onClick={() => navigate(`/ProduitDétail/${produit._id}`)}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer relative group"
          >
            <div className="relative aspect-square overflow-hidden rounded-t-lg">
              <img
                src={produit.image1}
                alt={produit.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Like Button */}
              <button
                onClick={(e) => handleLikeClick(produit._id, e)}
                className={cn(
                  "absolute top-3 left-3 p-2 rounded-full shadow-lg transition-all duration-300 z-20",
                  likedProducts.has(produit._id)
                    ? "bg-red-50 hover:bg-red-100"
                    : "bg-white hover:bg-emerald-50"
                )}
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    likedProducts.has(produit._id)
                      ? "text-red-500 fill-red-500"
                      : "text-emerald-600"
                  )}
                />
              </button>
            </div>

            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                {produit.name}
              </h3>
              <div className="mt-2 flex justify-between items-center">
                <p className="text-sm font-semibold text-emerald-600">
                  {produit.prix?.toLocaleString()} FCFA
                </p>
                {produit.prixPromo > 0 && (
                  <p className="text-xs text-gray-500 line-through">
                    {produit.prixPromo?.toLocaleString()} FCFA
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProduitSimilaires;
