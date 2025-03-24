import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import axios from "axios";

const ProduitPage = ({ name, products }) => {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("success"); // success ou error

  const API_URL = process.env.REACT_APP_Backend_Url;
  const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;

  // Charger les likes de l'utilisateur au montage du composant
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

  const showNotification = (message, type = "success") => {
    setAlertMessage(message);
    setAlertType(type);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    showNotification(`${product.name} a été ajouté au panier !`);
  };

  const handleLikeClick = async (product, e) => {
    e.stopPropagation();

    if (!userId) {
      showNotification(
        "Veuillez vous connecter pour ajouter des favoris",
        "error"
      );
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
        showNotification("Produit retiré des favoris");
      } else {
        // Ajouter le like
        await axios.post(`${API_URL}/likes`, {
          userId,
          produitId: product._id,
        });
        setLikedProducts((prev) => new Set([...prev, product._id]));
        showNotification("Produit ajouté aux favoris");
      }
    } catch (error) {
      showNotification("Une erreur est survenue", "error");
      console.error("Erreur:", error);
    }
  };

  const RatingStars = ({ rating = 4 }) => {
    return (
      <div className="flex space-x-0.5">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < rating
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mx-auto space-y-4">
      <div
        className="bg-gradient-to-r from-amber-200 to-amber-500 p-3 rounded-md cursor-pointer hover:shadow-lg transition-all duration-300"
        onClick={() => navigate(`/Categorie/${name}`)}
      >
        <h3 className="text-center font-bold text-amber-800">{name}</h3>
      </div>

      {showAlert && (
        <div
          className={`fixed top-4 right-4 z-50 max-w-md ${
            alertType === "success"
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          } border px-4 py-3 rounded shadow-lg transition-all duration-300`}
        >
          <p className="text-sm">{alertMessage}</p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const discountedPrice = product.prixPromo || product.prix?.toFixed(2);
          const discount =
            product.prixPromo && product.prix
              ? Math.round(
                  ((product.prix - product.prixPromo) / product.prix) * 100
                )
              : 0;

          return (
            <div
              key={product._id}
              onClick={() => navigate(`/ProduitDétail/${product._id}`)}
              className="bg-white rounded-lg shadow-md hover:shadow-xl group overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={product.image1 || "/api/placeholder/400/320"}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                    -{discount}%
                  </span>
                )}

                <button
                  className={`absolute z-10 p-2 rounded-full top-3 right-3 shadow-lg 
                    ${
                      !userId
                        ? "bg-gray-100 cursor-not-allowed"
                        : "bg-white hover:bg-gray-100"
                    }
                    transition-all duration-300`}
                  onClick={(e) => handleLikeClick(product, e)}
                  title={
                    !userId
                      ? "Connectez-vous pour liker"
                      : likedProducts.has(product._id)
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"
                  }
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 
                      ${
                        likedProducts.has(product._id)
                          ? "text-red-500 scale-125 fill-current"
                          : "text-gray-400"
                      }`}
                  />
                </button>
              </div>

              <div className="p-4 space-y-3">
                <h4 className="font-bold text-lg text-gray-800 line-clamp-2">
                  {product.name}
                </h4>

                <RatingStars rating={product.rating || 4} />

                <div className="space-y-1">
                  {product.prixPromo ? (
                    <>
                      <p className="text-sm text-red-600 line-through">
                        Cfa {product.prix?.toFixed(2)}
                      </p>
                      <p className="font-bold text-[#B17236]">
                        Cfa {discountedPrice}
                      </p>
                    </>
                  ) : (
                    <p className="font-bold text-[#B17236]">
                      Cfa {discountedPrice}
                    </p>
                  )}
                </div>

                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  className="mt-2 flex justify-around items-center w-full bg-[#30A08B] text-white py-2
                           rounded-full hover:bg-opacity-90 transition transition-colors duration-200 text-sm md:text-base shadow-md hover:shadow-lg"
                >
                  Ajouter au panier
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProduitPage;
