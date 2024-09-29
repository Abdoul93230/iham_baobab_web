import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Produit 1",
    description: "Description courte du produit 1.",
    price: 199.99,
    discount: 10,
    rating: 4,
    image: "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
  },
  {
    id: 2,
    name: "Produit 2",
    description: "Description courte du produit 2.",
    price: 299.99,
    discount: 0,
    rating: 5,
    image: "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
  },
  {
    id: 3,
    name: "Produit 3",
    description: "Description courte du produit 3.",
    price: 399.99,
    discount: 15,
    rating: 3,
    image: "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
  },
  {
    id: 4,
    name: "Produit 4",
    description: "Description courte du produit 4.",
    price: 499.99,
    discount: 20,
    rating: 4.5,
    image: "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
  },
];

const ProduitPage = ({ name }) => {
  const navigation = useNavigate();

  const handleAddToCart = (product) => {
    // Logique d'ajout au panier
    alert(`${product.name} a été ajouté au panier !`);
  };

  return (
    <div className="mx-auto">
      <div className="bg-gradient-to-r from-amber-200 to-amber-500 py-3 px-3 my-2 rounded-md">
        <h3 className="text-center font-bold text-amber-800">{name}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const discountedPrice = product.discount
            ? (product.price * (1 - product.discount / 100)).toFixed(2)
            : product.price.toFixed(2);

          return (
            <div
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer relative"
              key={product.id}
              onClick={() => navigation("/Produit détail")}
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                    -{product.discount}%
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#30A08B] opacity-30"></div>
              </div>
              <div className="p-4 flex flex-col">
                <h4 className="font-bold text-lg">{product.name}</h4>
                <p className="text-gray-700 mb-2">{product.description}</p>

                {/* Évaluation par étoiles */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M10 15.27L16.18 18 15.64 11.97 20 7.24 13.81 6.63 10 1 6.19 6.63 0 7.24 4.36 11.97 3.82 18 10 15.27z" />
                    </svg>
                  ))}
                </div>

                {product.discount > 0 ? (
                  <>
                    <p className="font-bold text-red-600 line-through">
                      ${product.price.toFixed(2)}
                    </p>
                    <p className="font-bold text-[#B17236]">
                      ${discountedPrice}
                    </p>
                  </>
                ) : (
                  <p className="font-bold text-[#B17236]">
                    ${product.price.toFixed(2)}
                  </p>
                )}

                <div className="mt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Empêche le clic d'aller à la page de détails
                      handleAddToCart(product);
                    }}
                    className="w-full bg-[#30A08B] text-white py-2 rounded-md hover:bg-[#2a8f7d] transition-colors duration-200"
                  >
                    Ajouter au panier
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
