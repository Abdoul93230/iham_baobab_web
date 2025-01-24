import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SliderPage = ({ products, name }) => {
  const swiperRef = useRef(null);
  const navigate = useNavigate();

  const handleProductClick = (productId) => {
    navigate(`/ProduitDétail/${productId}`);
  };

  const calculateDiscount = (originalPrice, promoPrice) => {
    return Math.round(((originalPrice - promoPrice) / originalPrice) * 100);
  };

  return (
    <div className="relative max-w-[95%] mx-auto my-8">
      <Swiper
        ref={swiperRef}
        modules={[Autoplay, Navigation, EffectFade]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={false}
        slidesPerView={2}
        spaceBetween={24}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
          1280: { slidesPerView: 8 },
        }}
        className="!px-2"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id} className="group relative">
            <div
              onClick={() => handleProductClick(product._id)}
              className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden cursor-pointer h-full"
            >
              {/* Badge Promo */}
              {product.prixPromo > 0 && (
                <div className="absolute z-10 right-2 top-2 bg-emerald-500/90 backdrop-blur-sm py-1 px-2 rounded-full">
                  <span className="text-xs font-semibold text-white">
                    -{calculateDiscount(product.prix, product.prixPromo)}%
                  </span>
                </div>
              )}

              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={product.image1}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Quick Add Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <ShoppingCart className="w-5 h-5 text-emerald-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-3 text-center">
                <h2 className="font-medium text-gray-800 line-clamp-1">
                  {product.name}
                </h2>
                <div className="mt-1.5 flex items-center justify-center gap-2">
                  <span className="text-emerald-600 font-semibold">
                    {product.prixPromo > 0 ? (
                      <>
                        <span>{product.prixPromo.toLocaleString()} FCFA</span>
                        <span className="ml-2 text-sm text-gray-400 line-through">
                          {product.prix.toLocaleString()} FCFA
                        </span>
                      </>
                    ) : (
                      <span>{product.prix.toLocaleString()} FCFA</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button
        onClick={() => swiperRef.current?.swiper.slidePrev()}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-emerald-50 transition-colors duration-200"
      >
        <ChevronLeft className="w-5 h-5 text-emerald-600" />
      </button>
      <button
        onClick={() => swiperRef.current?.swiper.slideNext()}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-emerald-50 transition-colors duration-200"
      >
        <ChevronRight className="w-5 h-5 text-emerald-600" />
      </button>
    </div>
  );
};

export default SliderPage;
