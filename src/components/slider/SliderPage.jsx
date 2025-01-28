import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { ShoppingCart, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ProductCard = ({ product, onProductClick }) => {
  const calculateDiscount = (originalPrice, promoPrice) => {
    return Math.round(((originalPrice - promoPrice) / originalPrice) * 100);
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

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <Button
              size="icon"
              variant="secondary"
              className="bg-white hover:bg-emerald-50 w-10 h-10 rounded-full shadow-lg"
            >
              <ShoppingCart className="w-5 h-5 text-emerald-600" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="bg-white hover:bg-emerald-50 w-10 h-10 rounded-full shadow-lg"
            >
              <Heart className="w-5 h-5 text-emerald-600" />
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

  const handleProductClick = (productId) => {
    navigate(`/ProduitDétail/${productId}`);
  };

  return (
    <div className="relative max-w-[98%] mx-auto my-12">
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderPage;
