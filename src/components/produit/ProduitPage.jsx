import React from "react";
import { useNavigate } from "react-router-dom";

const productss = [
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










const ProduitPage = ({ products,name }) => {
  const navigation = useNavigate();
  console.log(products)
  const handleAddToCart = (product) => {
    // Logique d'ajout au panier
    alert(`${product.name} a été ajouté au panier !`);
  };

  function getRandomIntBetween3and5() {
    return Math.floor(Math.random() * (5 - 3 + 1)) + 3;
}





  return (
    <div className="mx-auto">
      <div className="bg-gradient-to-r from-amber-200 to-amber-500 py-3 px-3 my-2 rounded-md">
        <h3 className="text-center font-bold text-amber-800">{name}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const discountedPrice = product.prixPromo
            ?  product.prixPromo
            : product.prix.toFixed(2);

          return (
            <div
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl cursor-pointer relative"
              key={product._id}
              onClick={() => navigation(`/ProduitDétail/${product._id}`)}
            >
              <div className="relative">
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                {product.prixPromo > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded">
                    - {Math.round(
                        ((product.prix - product.prixPromo) / product.prix) * 100
                      )}{" "}%
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#30A08B] opacity-30"></div>
              </div>
              <div className="p-4 flex flex-col">
                <h4 className="font-bold text-lg">{product.name.slice(0, 20)}...</h4>
                {/* <p className="text-gray-700 mb-2"
                
                dangerouslySetInnerHTML={{
                  __html: product.description.slice(0, 100),
                }}
                
                ></p> */}

                {/* Évaluation par étoiles */}
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-4 h-4 ${index < Math.floor(getRandomIntBetween3and5()) ? 'text-yellow-400' : 'text-gray-300'}`}
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
                  <p className="font-bold text-[#B17236]">
                    Cfa {product.prix.toFixed(2)}
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
