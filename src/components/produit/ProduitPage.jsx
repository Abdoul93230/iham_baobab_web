import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
const productss = [
  {
    id: 1,
    name: "Produit 1",
    description: "Description courte du produit 1.",
    price: 199.99,
    discount: 10,
    rating: 4,
    image:
      "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
    likedBy: "Alice",
  },
  {
    id: 2,
    name: "Produit 2",
    description: "Description courte du produit 2.",
    price: 299.99,
    discount: 0,
    rating: 5,
    image:
      "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
    likedBy: "Bob",
  },
  {
    id: 3,
    name: "Produit 3",
    description: "Description courte du produit 3.",
    price: 399.99,
    discount: 15,
    rating: 3,
    image:
      "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
    likedBy: "Charlie",
  },
  {
    id: 4,
    name: "Produit 4",
    description: "Description courte du produit 4.",
    price: 499.99,
    discount: 20,
    rating: 4.5,
    image:
      "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
    likedBy: "Dana",
  },
];

const ProduitPage = ({ name, products }) => {
  const navigation = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [likedProducts, setLikedProducts] = useState(new Set());

  const handleAddToCart = (product) => {
    // Logique d'ajout au panier
    alert(`${product.name} a été ajouté au panier !`);
  };
  //  Pour les likes
  const handleLikeClick = (e, productId) => {
    e.stopPropagation(); // Empêche la navigation
    if (!likedProducts.has(productId)) {
      setLikedProducts((prevLiked) => {
        const newLiked = new Set(prevLiked);
        newLiked.add(productId);
        return newLiked;
      });
    }
  };

  function getRandomIntBetween3and5() {
    return Math.floor(Math.random() * (5 - 3 + 1)) + 3;
  }

  return (
    <div className="mx-auto">
      <div
        className="bg-gradient-to-r from-amber-200 to-amber-500 py-3 px-3 my-2 rounded-md"
        onClick={() => navigation(`/Categorie/${name}`)}
      >
        <h3 className="text-center font-bold text-amber-800">{name}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => {
          const discountedPrice = product.prixPromo
            ? product.prixPromo
            : product.prix.toFixed(2);

          return (
            <div
              key={product._id}
              onClick={() => navigation(`/ProduitDétail/${product._id}`)}
              className="flex flex-col rounded-lg group overflow-hidden transition-all duration-300 transform shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer relative"
            >
              <div className="relative flex-grow">
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.prixPromo > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                    -{" "}
                    {Math.round(
                      ((product.prix - product.prixPromo) / product.prix) * 100
                    )}{" "}
                    %
                  </span>
                )}
                <button
                  className={`absolute z-2 p-2 rounded-full top-3 right-3 shadow-md transition-colors duration-300
                  ${
                    likedProducts.has(+index + 1)
                      ? "transition-transform duration-300 hover:scale-105 cursor-not-allowed"
                      : "bg-white hover:bg-gray-500"
                  }`}
                  onClick={(e) => handleLikeClick(e, +index + 1)}
                  disabled={likedProducts.has(+index + 1)}
                  title={
                    likedProducts.has(+index + 1)
                      ? "Déjà liké"
                      : "Liker ce produit"
                  }
                >
                  <Heart
                    className={`w-5 h-5 transition-transform duration-300
                    ${
                      likedProducts.has(+index + 1)
                        ? "text-[#30A08B] scale-125"
                        : "text-[#B17236] scale-100"
                    }`}
                  />
                </button>
                {
                  // product.name.slice(0, 24).length < 24 ?
                }
                {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#30A08B] opacity-30 group-hover:scale-105 transition-transform duration-300"></div> */}
              </div>
              <div className="p-4 flex flex-col">
                <h4 className="font-bold text-lg">
                  {product.name.slice(0, 25)}...
                </h4>
                {product.name.slice(0, 25).length < 24 ? (
                  <p className="font-bold mb-4 text-[#B17236]"> </p>
                ) : (
                  <></>
                )}
                {product.name.slice(0, 12).length < 12 ? (
                  <p className="font-bold mb-4 text-[#B17236]"> </p>
                ) : (
                  <></>
                )}
                {/* <p className="text-gray-700 mb-2" 
              dangerouslySetInnerHTML={{
                __html: product.description.slice(0, 10),
              }}
              >
                
              </p> */}

                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.floor(getRandomIntBetween3and5())
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15.27L16.18 18 15.64 11.97 20 7.24 13.81 6.63 10 1 6.19 6.63 0 7.24 4.36 11.97 3.82 18 10 15.27z" />
                    </svg>
                  ))}
                </div>

                {product.prixPromo > 0 ? (
                  <>
                    <p className="font-bold text-red-600 line-through">
                      Cfa {product.prix.toFixed(2)}
                    </p>
                    <p className="font-bold text-[#B17236]">
                      Cfa {discountedPrice}
                    </p>
                  </>
                ) : (
                  <>
                    <p className="font-bold text-[#B17236]">
                      Cfa {product.prix.toFixed(2)}
                    </p>
                    <p className="font-bold mb-4 text-[#B17236]"> </p>
                  </>
                )}

                <div className="mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                    className="mt-2 flex justify-around items-center w-full bg-[#30A08B] text-white py-2
                       rounded-full hover:bg-opacity-90 transition transition-colors duration-200 text-sm md:text-base shadow-md hover:shadow-lg"
                  >
                    Ajouter au panier
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProduitPage;
