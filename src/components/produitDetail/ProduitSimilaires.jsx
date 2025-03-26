import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserLikes, toggleLike } from "../../redux/likesSlice";

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProduitSimilaires = ({ titre, produits }) => {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");

  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likes.likedProducts);
  const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserLikes(userId));
    }
  }, [userId, dispatch]);

  const showToast = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLikeClick = async (product, e) => {
    e.stopPropagation();

    if (!userId) {
      showToast("Veuillez vous connecter pour ajouter des favoris", "error");
      return;
    }

    try {
      await dispatch(toggleLike({ userId, product })).unwrap();
      showToast(
        likedProducts.includes(product._id)
          ? "Produit retiré des favoris"
          : "Produit ajouté aux favoris"
      );
    } catch (error) {
      showToast("Une erreur est survenue", "error");
      console.error("Erreur:", error);
    }
  };

  return (
    <div className="mt-12">
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
              <button
                onClick={(e) => handleLikeClick(produit, e)}
                className={cn(
                  "absolute top-3 left-3 p-2 rounded-full shadow-lg transition-all duration-300 z-20",
                  likedProducts.includes(produit._id)
                    ? "bg-red-50 hover:bg-red-100"
                    : "bg-white hover:bg-emerald-50"
                )}
              >
                <Heart
                  className={cn(
                    "w-5 h-5 transition-colors duration-300",
                    likedProducts.includes(produit._id)
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
