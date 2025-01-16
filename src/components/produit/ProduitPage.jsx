import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";

const ProduitPage = ({ name, products }) => {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState(new Set());
  const [showAlert, setShowAlert] = useState(false);
  const [alertProduct, setAlertProduct] = useState(null);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    setAlertProduct(product);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 2000);
  };

  const handleLikeClick = (productId, e) => {
    e.stopPropagation();
    setLikedProducts((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(productId)) {
        newSet.add(productId);
      }
      return newSet;
    });
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

      {showAlert && alertProduct && (
        <div className="fixed top-4 right-4 z-50 max-w-md bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded shadow-lg">
          <p className="text-sm">
            {alertProduct.name} a été ajouté au panier !
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
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
                      likedProducts.has(index + 1)
                        ? "bg-white cursor-not-allowed"
                        : "bg-white hover:bg-gray-100"
                    }
                    transition-all duration-300`}
                  onClick={(e) => handleLikeClick(index + 1, e)}
                  disabled={likedProducts.has(index + 1)}
                  title={
                    likedProducts.has(index + 1)
                      ? "Déjà liké"
                      : "Liker ce produit"
                  }
                >
                  <Heart
                    className={`w-5 h-5 transition-all duration-300 
                      ${
                        likedProducts.has(index + 1)
                          ? "text-[#30A08B] scale-125 fill-current"
                          : "text-[#B17236]"
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
                  onClick={() => navigate(`/ProduitDétail/${product._id}`)}
                  // onClick={(e) => handleAddToCart(product, e)}
                  className="w-full bg-[#30A08B] hover:bg-opacity-90 text-white py-2 px-4 rounded-full
                    transition-all duration-200 flex items-center justify-center space-x-2
                    shadow-md hover:shadow-lg"
                >
                  <span>Ajouter au panier</span>
                  <ShoppingCart className="w-4 h-4" />
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
