import React, { useState, useEffect } from 'react';
import { Heart, Trash2, Share2, Filter, SortDesc, ShoppingCart, ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LikeProduitPage = () => {
  const navigation = useNavigate()
  const [likedProducts, setLikedProducts] = useState([
    {
      id: 1,
      name: "Nike Air Max",
      price: 129.99,
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S6af9c502409f49f4ac50e1c4968b9b926.jpg_.webp",
      category: "Chaussures",
      dateAdded: "2024-10-20",
      description: "Chaussures de sport confortables et élégantes",
      stock: 8
    },
    {
      id: 2,
      name: "T-shirt Premium",
      price: 29.99,
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S6af9c502409f49f4ac50e1c4968b9b926.jpg_.webp",
      category: "Vêtements",
      dateAdded: "2024-10-19",
      description: "T-shirt en coton bio de haute qualité",
      stock: 15
    },
    {
      id: 3,
      name: "Montre Classic",
      price: 199.99,
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S6af9c502409f49f4ac50e1c4968b9b926.jpg_.webp",
      category: "Accessoires",
      dateAdded: "2024-10-18",
      description: "Montre élégante pour toutes occasions",
      stock: 5
    },
    {
      id: 4,
      name: "Montre Classic",
      price: 199.99,
      image: "https://ae-pic-a1.aliexpress-media.com/kf/S6af9c502409f49f4ac50e1c4968b9b926.jpg_.webp",
      category: "Accessoires",
      dateAdded: "2024-10-18",
      description: "Montre élégante pour toutes occasions",
      stock: 5
    }
  ]);

  const [sortBy, setSortBy] = useState('dateAdded');
  const [filterCategory, setFilterCategory] = useState('all');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Animation d'entrée des produits
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const showToast = (message) => {
    setNotificationMessage(message);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const removeFromLiked = (productId) => {
    setLikedProducts(prev => prev.filter(product => product.id !== productId));
    showToast('Produit retiré des favoris');
  };

  const shareProduct = (product) => {
    showToast(`${product.name} partagé avec succès !`);
  };

  const addToCart = (product) => {
    showToast(`${product.name} ajouté au panier !`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification Toast */}
      <div 
        className={`fixed top-4 right-4 bg-[#30A08B] text-white px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 z-50 ${
          showNotification ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        {notificationMessage}
      </div>

      {/* Header avec dégradé */}
      <div className="bg-gradient-to-r from-[#30A08B] via-[#B2905F] to-[#B17236] text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Mes Favoris
            <Heart className="inline-block ml-2 w-8 h-8 animate-pulse" />
          </h1>
          <p className="mt-2 text-lg opacity-90">{likedProducts.length} produits dans votre collection</p>
        </div>
      </div>

      {/* Filtres avec effet hover */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 group">
              <Filter className="w-5 h-5 text-[#30A08B] group-hover:rotate-180 transition-transform duration-300" />
              <select 
                className="border rounded-md py-2 px-3 focus:ring-2 focus:ring-[#30A08B] transition-all"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <option value="all">Toutes les catégories</option>
                <option value="clothes">Vêtements</option>
                <option value="shoes">Chaussures</option>
                <option value="accessories">Accessoires</option>
              </select>
            </div>

            <div className="flex items-center gap-2 group">
              <SortDesc className="w-5 h-5 text-[#B2905F] group-hover:-translate-y-1 transition-transform duration-300" />
              <select 
                className="border rounded-md py-2 px-3 focus:ring-2 focus:ring-[#B2905F] transition-all"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="dateAdded">Plus récents</option>
                <option value="priceLow">Prix croissant</option>
                <option value="priceHigh">Prix décroissant</option>
                <option value="name">Nom</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grille des produits avec animations */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {likedProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative group cursor-pointer">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-58 object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay avec actions */}
                <div className={`absolute inset-0 bg-black bg-opacity-50 transform transition-transform duration-700 group-hover:scale-110 flex items-center justify-center gap-4 transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button 
                    onClick={() => addToCart(product)}
                    className="p-2 bg-[#30A08B] text-white rounded-full hover:bg-opacity-90 transform hover:scale-110 transition-all"
                  >
                    <ShoppingCart className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => shareProduct(product)}
                    className="p-2 bg-[#B2905F] text-white rounded-full hover:bg-opacity-90 transform hover:scale-110 transition-all"
                  >
                    <Share2 className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={() => removeFromLiked(product.id)}
                    className="p-2 bg-red-500 text-white rounded-full hover:bg-opacity-90 transform hover:scale-110 transition-all"
                  >
                    <Trash2 className="w-6 h-6" />
                  </button>
                </div>

                {/* Badge stock */}
                <div className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full text-sm font-medium text-[#30A08B]">
                  Stock: {product.stock}
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-800 hover:text-[#30A08B] transition-colors">
                    {product.name}
                  </h3>
                  <Heart className="w-6 h-6 text-red-500 fill-current hover:scale-125 transition-transform" />
                </div>
                <p className="text-gray-600 mt-1 text-sm">{product.category}</p>
                <p className="text-gray-500 mt-2 text-sm line-clamp-2">{product.description}</p>
                
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-xl font-bold text-[#B17236]">{product.price} FCFA</span>
                  <button 
                  
                    className="flex items-center gap-1 text-sm text-[#30A08B] hover:underline group"
                    onClick={() => {
                      showToast('Redirection vers le produit...')
                      setTimeout(() => {
                        navigation("/Produit détail")
                        
                      }, 1000);
                    }
                      
                    }
                    
                  >
                    Voir détails
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/*  */}


      {/* Message si liste vide avec animation */}
      {likedProducts.length === 0 && (
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="transform transition-all duration-500 hover:scale-110">
            <Heart className="w-20 h-20 mx-auto text-[#30A08B] animate-pulse" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-gray-600">Aucun produit dans vos favoris</h2>
          <p className="mt-2 text-gray-500">Découvrez notre collection et commencez à créer votre liste de favoris</p>
          <button 
            className="mt-6 px-6 py-3 bg-gradient-to-r from-[#30A08B] to-[#B2905F] text-white rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            onClick={() => {
              showToast('Redirection vers la boutique...')
            setTimeout(() => {
              navigation("/Boutique")
            }, 1000);
            }

            }
              
          >
            Explorer les produits
          </button>
        </div>
      )}
    </div>
  );
};
export default LikeProduitPage;