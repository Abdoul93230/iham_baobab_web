import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Search,
  ShoppingBag,
  X,
  Home,
  User,
  ArrowRight,
  Grid,
  Rss,
  MessageCircle,
  Menu,
  MoreVertical,
  Star,
  Feather,
  Eye,
  Share2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Truck,
  Shield,
  Award
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

// Composants UI
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserLikes, toggleLike } from "../../redux/likesSlice";
import socialService from "./socialService";
const BackendUrl = process.env.REACT_APP_Backend_Url;
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
const AdvancedECommercePage = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // États principaux
  const [activeTab, setActiveTab] = useState("home");
  const [sortBy, setSortBy] = useState("best_match");
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Données du store
  const [sellerInfo, setSellerInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [banners, setBanners] = useState([]);
  const [socialStats, setSocialStats] = useState({
    followersCount: 0,
    likesCount: 0,
    reviewsCount: 0,
    rating: 0,
  });
  
  // Produits filtrés et triés
  const [hotDeals, setHotDeals] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [promoProducts, setPromoProducts] = useState([]);
  
  // État de suivi
  const [isFollowing, setIsFollowing] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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

  // Vérification de l'authentification
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userEcomme"))?.token;
    setIsAuthenticated(!!token);
  }, []);

  // Récupération des données au chargement
  useEffect(() => {
    if (sellerId) {
      fetchStoreData();
    }
  }, [sellerId]);

    const showToast = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };


   const handleLikeClick = async (product, e) => {
      e.stopPropagation();
    console.log({product});
    
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

  // Fonction principale de récupération des données
  const fetchStoreData = async () => {
    setIsLoading(true);
    try {
      await Promise.all([
        fetchSellerInfo(),
        fetchProducts(),
        fetchCategories(),
        fetchBanners(),
        fetchSuivi(),
      ]);
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de charger les données du magasin",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Récupération des informations du vendeur
  const fetchSellerInfo = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/getSeller/${sellerId}`);
      setSellerInfo(response.data.data);
      setSocialStats({
        followersCount: response.data.data?.followersCount,
        likesCount: response.data.data?.likesCount,
        reviewsCount: response.data.data?.reviewsCount,
        rating: response.data.data?.rating,
      });
    } catch (error) {
      console.error("Erreur lors de la récupération des infos vendeur:", error);
    }
  };

  // Récupération des produits
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/searchProductBySupplier/${sellerId}`);
      const publishedProducts = response.data.data.filter(
        product => product.isPublished === "Published"
      );
      
      setProducts(publishedProducts);
      setAllProducts(publishedProducts);
      
      // Traitement des différentes catégories de produits
      processProductCategories(publishedProducts);
    } catch (error) {
      console.error("Erreur lors de la récupération des produits:", error);
    }
  };

  // Traitement des catégories de produits
  const processProductCategories = (products) => {
    // Hot deals - produits avec le plus de ventes
    const sortedBySales = [...products]
      .sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0))
      .slice(0, 6);
    setHotDeals(sortedBySales);

    // Nouveaux arrivants - produits les plus récents
    const sortedByDate = [...products]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 6);
    setNewArrivals(sortedByDate);

    // Produits en promotion
    const promoItems = products.filter(product => 
      product.prix && product.prixPromo < product.prix
    ).slice(0, 6);
    setPromoProducts(promoItems);
  };

  // Récupération des catégories
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/getAllTypeBySeller/${sellerId}`);
      setCategories(response.data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des catégories:", error);
    }
  };

  // Récupération des bannières
  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${BackendUrl}/api/marketing/Bannerss/${sellerId}`, {
        withCredentials: true,
      });
      if (response.data.success) {
        setBanners(response.data.data);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des bannières:", error);
    }
  };
  const fetchSuivi = async () => {
    try {
       const followersResponse = await socialService.getSellerFollowers(
              sellerId
            );
       const isUserFollowing = followersResponse.data.followers.some(
              (follower) => follower._id === userId
            );
            setIsFollowing(isUserFollowing);
    } catch (error) {
      console.error("Erreur lors de la récupération de suivi:", error);
    }
  };
  // Gestion du suivi
  const handleFollowToggle = async () => {
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Connexion requise",
        description: "Veuillez vous connecter pour suivre ce vendeur",
      });
      return;
    }

    try {
      if (isFollowing) {
        // await axios.post(`${BackendUrl}/api/social/unfollow/${sellerId}`);
        await socialService.unfollowSeller(sellerId);
        setIsFollowing(false);
        // Mettre à jour les statistiques
        setSocialStats({
          ...socialStats,
          followersCount: socialStats.followersCount - 1,
        });
        showToast("Vous ne suivez plus ce vendeur", "success");
      } else {
        await socialService.followSeller(sellerId);
        setIsFollowing(true);
        // Mettre à jour les statistiques
        setSocialStats({
          ...socialStats,
          followersCount: socialStats.followersCount + 1,
        });
        showToast("Vous suivez maintenant ce vendeur", "success");
      }
    } catch (error) {
      showToast("Impossible de modifier le suivi", "error");
    }
  };

  // Navigation vers les détails du produit
  const handleProductClick = (productId) => {
    navigate(`/ProduitDétail/${productId}`);
  };

  // Filtrage par catégorie
  const handleCategoryFilter = async (categoryId, categoryName) => {
    setIsLoading(true);
    try {
      if (categoryName === "All") {
        setAllProducts(products);
      } else {
        const response = await axios.get(
          `${BackendUrl}/searchProductByTypeBySeller/${categoryId}/${sellerId}`
        );
        const publishedProducts = response.data.products.filter(
          product => product.isPublished === "Published"
        );
        setAllProducts(publishedProducts);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de filtrer par catégorie",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Recherche de produits
  const filteredProducts = allProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tri des produits
  const sortProducts = (products) => {
    switch (sortBy) {
      case "orders":
        return [...products].sort((a, b) => (b.soldCount || 0) - (a.soldCount || 0));
      case "prices":
        return [...products].sort((a, b) => a.prixPromo - b.prixPromo);
      default:
        return products;
    }
  };

  // Calcul du pourcentage de réduction
  const calculateDiscount = (prix, currentPrice) => {
    if (!prix || prix <= currentPrice) return 0;
    return Math.round(((prix - currentPrice) / prix) * 100);
  };

  // Formatage du prix
  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price);
  };

  // Composant bouton d'onglet
  const TabButton = ({ isActive, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
        isActive
          ? "border-slate-900 text-slate-900"
          : "border-transparent text-slate-500 hover:text-slate-700"
      }`}
    >
      {children}
    </button>
  );

  // Composant carte produit
  const ProductCard = ({ product, isCompact = false, showRanking = false }) => {
    const discount = calculateDiscount(product.prix, product.prixPromo);

    return (
      <Card 
        className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${isCompact ? 'w-full' : ''}`}
        onClick={() => handleProductClick(product._id)}
      >
        <CardContent className="p-3">
          <div className="relative">
            <img
              src={product.image1 || product.image}
              alt={product.name}
              className={`w-full object-cover rounded-md ${
                isCompact ? 'h-20' : 'h-40'
              }`}
            />
            {showRanking && (
              <Badge className="absolute top-2 left-2 bg-red-500">
                #{hotDeals.indexOf(product) + 1}
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="absolute top-2 right-2 bg-green-500">
                -{discount}%
              </Badge>
            )}
            {!isCompact && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute bottom-2 right-2 h-8 w-8 p-0 bg-white/80 hover:bg-white"
                 onClick={(e) => handleLikeClick(product, e)}
              >
                <Heart
                  className={`h-4 w-4 ${
                    likedProducts.includes(product._id) ? "fill-red-500 text-red-500" : ""
                  }`}
                />
              </Button>
            )}
          </div>
          <div className="mt-3 space-y-1">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-lg">
                XOF <span className="text-xl">{formatPrice(product.prixPromo)}</span>
              </p>
              {product.prix && product.prix > product.prixPromo && (
                <p className="text-sm text-slate-500 line-through">
                  XOF {formatPrice(product.prix)}
                </p>
              )}
            </div>
            {product.soldCount && (
              <p className="text-xs text-slate-500">{product.soldCount} vendus</p>
            )}
            <p className="text-sm text-slate-600 line-clamp-2">{product.name}</p>
            {product.shippingCost && (
              <p className="text-xs text-slate-500">+ Livraison: XOF {formatPrice(product.shippingCost)}</p>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Composant bouton de tri
  const SortButton = ({ isActive, onClick, children }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded-md transition-colors ${
        isActive
          ? "bg-red-500 text-white"
          : "text-slate-600 hover:bg-slate-100"
      }`}
    >
      {children}
    </button>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
          <p className="mt-4 text-gray-600">Chargement du magasin...</p>
        </div>
      </div>
    );
  }

  if (!sellerInfo) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Magasin introuvable</p>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
    {showNotification && (
        <div
          className={cn(
            "fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg transition-all duration-300",
            notificationType === "success"
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          )}
          style={{zIndex: 1000}}
        >
          <p className="text-sm">{notificationMessage}</p>
        </div>
      )}
    <div className="min-h-screen bg-white">
      
      {/* En-tête fixe */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b z-50 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Button variant="ghost" size="sm" className="p-2" onClick={() => navigate(-1)}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          
          <div className="flex-1 mx-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Rechercher dans ce magasin"
                className="pl-10 pr-4 bg-slate-50 border-none rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/")}>
                <Home className="mr-2 h-4 w-4" />
                Accueil
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Heart className="mr-2 h-4 w-4" />
                Liste de souhaits
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Compte
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Share2 className="mr-2 h-4 w-4" />
                Partager
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="pt-20 pb-20 px-4 max-w-4xl mx-auto">
        {/* Informations du magasin */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={sellerInfo.logo} alt={sellerInfo.storeName} />
              <AvatarFallback>
                {sellerInfo.userName2?.[0]}{sellerInfo.name?.[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-slate-800">
                {sellerInfo.storeName || `${sellerInfo.userName2} ${sellerInfo.name}`}
              </h1>
              <div className="flex items-center space-x-2 text-sm text-slate-500">
                <span>{socialStats.followersCount} abonnés</span>
                <span>•</span>
                <div className="flex items-center">
                  <Star className="h-3 w-3 text-yellow-400 mr-1" />
                  <span>{socialStats.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
          <Button 
            className={`rounded-full px-6 ${
              isFollowing 
                ? "bg-slate-200 text-slate-700 hover:bg-slate-300" 
                : "bg-red-500 hover:bg-red-600 text-white"
            }`}
            onClick={handleFollowToggle}
          >
            {isFollowing ? "Suivi" : "Suivre"}
          </Button>
        </div>

        {/* Évaluations */}
        <div className="flex items-center justify-between bg-slate-50 rounded-lg p-3 mb-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold">{Math.round(socialStats.rating * 20)}%</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(socialStats.rating) ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
          <div 
            className="flex items-center text-sm text-slate-600 cursor-pointer"
            onClick={() => navigate(`/Profile d'un boutiquier/${sellerId}`)}
          >
            Avis clients ({socialStats.reviewsCount})
            <ChevronRight className="ml-2 h-4 w-4" />
          </div>
        </div>

        {/* Informations supplémentaires */}
        {sellerInfo.address && (
          <div className="flex items-center space-x-2 text-sm text-slate-600 mb-2">
            <MapPin className="h-4 w-4" />
            <span>{sellerInfo.address}</span>
          </div>
        )}

        {/* Onglets */}
        <div className="flex border-b mb-6">
          <TabButton
            isActive={activeTab === "home"}
            onClick={() => setActiveTab("home")}
          >
            Accueil
          </TabButton>
          <TabButton
            isActive={activeTab === "all_items"}
            onClick={() => setActiveTab("all_items")}
          >
            Tous les articles
          </TabButton>
          <TabButton
            isActive={activeTab === "new_arrivals"}
            onClick={() => setActiveTab("new_arrivals")}
          >
            Nouveautés
          </TabButton>
        </div>

        {/* Contenu selon l'onglet actif */}
        {activeTab === "home" && (
          <div className="space-y-8">
            {/* Carrousel de bannières */}
            {banners.length > 0 && (
              <div className="relative rounded-lg overflow-hidden shadow-lg h-64">
                <img
                  src={banners[0]?.image}
                  alt="Bannière principale"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <div className="bg-white rounded-full px-4 py-2 flex items-center space-x-2">
                    <span className="text-sm font-medium">VOIR PLUS</span>
                    <div className="bg-red-500 text-white rounded-full p-1">
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section promotions */}
            {promoProducts.length > 0 && (
              <Card className="bg-red-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Offres spéciales</h3>
                      <p className="text-sm text-slate-600 mt-1">
                        Économisez jusqu'à {Math.max(...promoProducts.map(p => calculateDiscount(p.prix, p.prixPromo)))}% sur une sélection de produits
                      </p>
                    </div>
                    <Button size="sm" className="bg-red-500 hover:bg-red-600">
                      Voir tout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Hot deals */}
            {hotDeals.length > 0 && (
              <section>
                <div 
                  className="flex items-center mb-4 cursor-pointer group"
                  onClick={() => setActiveTab("all_items")}
                >
                  <h2 className="text-xl font-bold text-slate-800 border-b-2 border-red-500 pb-1 pr-2">
                    Meilleures ventes
                  </h2>
                  <ArrowRight className="ml-2 h-5 w-5 text-slate-600 group-hover:text-red-500 transition-colors" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {hotDeals.slice(0, 3).map((product, index) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      isCompact
                      showRanking
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Nouveautés */}
            {newArrivals.length > 0 && (
              <section>
                <div 
                  className="flex items-center mb-4 cursor-pointer group"
                  onClick={() => setActiveTab("new_arrivals")}
                >
                  <h2 className="text-xl font-bold text-slate-800 border-b-2 border-red-500 pb-1 pr-2">
                    Nouveautés
                  </h2>
                  <ArrowRight className="ml-2 h-5 w-5 text-slate-600 group-hover:text-red-500 transition-colors" />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {newArrivals.slice(0, 3).map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      isCompact
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Sélection pour vous */}
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-4">Sélectionné pour vous</h2>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {products.slice(0, 8).map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "all_items" && (
          <div className="space-y-6">
            {/* Tri */}
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <SortButton
                  isActive={sortBy === "best_match"}
                  onClick={() => setSortBy("best_match")}
                >
                  Pertinence
                </SortButton>
                <SortButton
                  isActive={sortBy === "orders"}
                  onClick={() => setSortBy("orders")}
                >
                  Ventes
                </SortButton>
                <SortButton
                  isActive={sortBy === "prices"}
                  onClick={() => setSortBy("prices")}
                >
                  Prix
                </SortButton>
              </div>
              <Badge variant="secondary">
                {filteredProducts.length} produits
              </Badge>
            </div>

            {/* Grille de produits */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {sortProducts(filteredProducts).map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === "new_arrivals" && (
          <div className="space-y-6">
            {/* Section promotions */}
            {promoProducts.length > 0 && (
              <section>
                <h3 className="text-lg font-semibold mb-4">En promotion</h3>
                <div className="grid grid-cols-3 gap-3">
                  {promoProducts.map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      isCompact
                    />
                  ))}
                </div>
              </section>
            )}

            {/* Produits récents */}
            <section>
              <h3 className="text-lg font-semibold mb-4">Ajoutés récemment</h3>
              <div className="space-y-4">
                {newArrivals.map((product) => (
                  <Card 
                    key={product._id} 
                    className="hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => handleProductClick(product._id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex space-x-4">
                        <img
                          src={product.image1 || product.image}
                          alt={product.name}
                          className="w-24 h-24 object-cover rounded-md"
                        />
                        {console.log(product)
                        }
                        <div className="flex-1 space-y-2">
                          <h4 className="text-sm text-slate-600 line-clamp-2">
                            {product.name}
                          </h4>
                          {product.soldCount && (
                            <p className="text-xs text-slate-500">{product.soldCount} vendus</p>
                          )}
                          <p className="font-semibold">
                            XOF <span className="text-lg">{formatPrice(product.prixPromo || product.prix)}</span>
                          </p>
                          {product.shippingCost && (
                            <p className="text-xs text-slate-500">+ Livraison: XOF {formatPrice(product.shippingCost)}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Navigation en bas */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t px-4 py-3">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="flex flex-col items-center space-y-1 p-2">
                <Grid className="h-5 w-5" />
                <span className="text-xs">Catégories</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold">Catégories</h2>
                <SheetClose asChild>
                  <Button variant="ghost" size="sm">
                    <X className="h-4 w-4" />
                  </Button>
                </SheetClose>
              </div>
              <div className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start hover:bg-red-50 hover:text-red-600 hover:border-l-4 hover:border-red-500 transition-all"
                  onClick={() => handleCategoryFilter(null, "All")}
                >
                  <Menu className="mr-3 h-4 w-4" />
                  Tous les produits
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category._id}
                    variant="ghost"
                    className="w-full justify-start hover:bg-red-50 hover:text-red-600 hover:border-l-4 hover:border-red-500 transition-all"
                    onClick={() => handleCategoryFilter(category._id, category.name)}
                  >
                    <Menu className="mr-3 h-4 w-4" />
                    {category.name}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          <Button 
            variant="ghost" 
            className="flex flex-col items-center space-y-1 p-2"
            onClick={() => navigate("/")}
          >
            <Rss className="h-5 w-5" />
            <span className="text-xs">Accueil</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2"
            onClick={() => navigate(`/ContactSeller/${sellerId}`)}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="text-xs">Contact</span>
          </Button>

          <Button
            variant="ghost"
            className="flex flex-col items-center space-y-1 p-2"
            onClick={() => navigate(`/Profile d'un boutiquier/${sellerId}`)}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">Profil</span>
          </Button>
        </div>
      </nav>

      {/* Bouton flottant pour les messages */}
      <Button
        className="fixed bottom-20 right-4 rounded-full w-12 h-12 bg-red-500 hover:bg-red-600 shadow-lg"
        onClick={() => navigate(`/ContactSeller/${sellerId}`)}
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
    </>
  );
};

export default AdvancedECommercePage;

