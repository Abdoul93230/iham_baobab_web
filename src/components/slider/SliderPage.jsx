import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { ShoppingCart, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import axios from "axios";

const ProductCard = ({ product, onProductClick, isLiked, onLikeClick }) => {
  const calculateDiscount = (originalPrice, promoPrice) => {
    return Math.round(((originalPrice - promoPrice) / originalPrice) * 100);
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    onLikeClick(product);
  };

  return (
    <Card className="group relative border-none shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Promo Badge */}
      {product.prixPromo > 0 && (
        <Badge className="absolute z-10 right-3 top-3 bg-gradient-to-r from-emerald-500 to-emerald-600">
          -{calculateDiscount(product.prix, product.prixPromo)}%
        </Badge>
      )}

      {/* Image Section */}
      <div
        onClick={() => onProductClick(product._id)}
        className="relative aspect-square overflow-hidden rounded-t-xl cursor-pointer"
      >
        <img
          src={product.image1}
          alt={product.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />

        {/* Like Button - Always visible */}
        {/* Like Button - Always visible on the left */}
        <Button
          size="icon"
          variant="secondary"
          className={cn(
            "absolute top-3 left-3 w-8 h-8 rounded-full shadow-lg transition-all duration-300 z-20",
            isLiked
              ? "bg-red-50 hover:bg-red-100"
              : "bg-white hover:bg-emerald-50"
          )}
          onClick={handleLikeClick}
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-all duration-300",
              isLiked ? "text-red-500 fill-red-500" : "text-emerald-600"
            )}
          />
        </Button>

        {/* Overlay Actions - Only Cart button */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
            <Button
              size="icon"
              variant="secondary"
              className="bg-white hover:bg-emerald-50 w-10 h-10 rounded-full shadow-lg"
              onClick={(e) => {
                e.stopPropagation();
                // Ajoutez ici la logique du panier
              }}
            >
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <CardContent className="p-4">
        <h2 className="font-medium text-gray-800 line-clamp-1 text-sm md:text-base">
          {product.name}
        </h2>
        <div className="mt-2 space-y-1">
          {product.prixPromo > 0 ? (
            <>
              <div className="text-emerald-600 font-semibold text-base md:text-lg">
                {product.prixPromo.toLocaleString()} FCFA
              </div>
              <div className="text-sm text-gray-400 line-through">
                {product.prix.toLocaleString()} FCFA
              </div>
            </>
          ) : (
            <div className="text-emerald-600 font-semibold text-base md:text-lg">
              {product.prix.toLocaleString()} FCFA
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const SliderPage = ({ products, name }) => {
  const swiperRef = useRef(null);
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

  const handleLikeClick = async (product) => {
    if (!userId) {
      showToast("Veuillez vous connecter pour ajouter des favoris", "error");
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
        showToast("Produit retiré des favoris");
      } else {
        // Ajouter le like
        await axios.post(`${API_URL}/likes`, {
          userId,
          produitId: product._id,
        });
        setLikedProducts((prev) => new Set([...prev, product._id]));
        showToast("Produit ajouté aux favoris");
      }
    } catch (error) {
      showToast("Une erreur est survenue", "error");
      console.error("Erreur:", error);
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/ProduitDétail/${productId}`);
  };

  return (
    <div className="relative max-w-[98%] mx-auto my-12">
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

      <div className="flex items-center justify-between mb-6 px-4">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
          {name}
        </h2>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => swiperRef.current?.swiper.slidePrev()}
            className="rounded-full hover:bg-emerald-50 hover:text-emerald-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => swiperRef.current?.swiper.slideNext()}
            className="rounded-full hover:bg-emerald-50 hover:text-emerald-600"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation, EffectFade]}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        navigation={false}
        slidesPerView={2}
        spaceBetween={24}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="px-2"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard
              product={product}
              onProductClick={handleProductClick}
              isLiked={likedProducts.has(product._id)}
              onLikeClick={handleLikeClick}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderPage;
