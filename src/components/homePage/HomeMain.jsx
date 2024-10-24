import React, { useState, useRef } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProduitPage from "../produit/ProduitPage";
import SliderPage from "../slider/SliderPage";
import CategorieMobile from "./CategorieMobile";

const products = [
  {
    id: 1,
    name: "Produit 1",
    price: "19,99 €",
    image:
      "https://cc-prod.scene7.com/is/image/CCProdAuthor/product-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
  },
  {
    id: 2,
    name: "Produit 2",
    price: "29,99 €",
    image:
      "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
  },
  {
    id: 3,
    name: "Produit 3",
    price: "39,99 €",
    image:
      "https://www.fontainebleau-blog.com/wp-content/uploads/2020/02/comment-reussir-belles-photos-de-paysage-660x248.jpg",
  },
  {
    id: 4,
    name: "Produit 4",
    price: "49,99 €",
    image:
      "https://img.freepik.com/photos-premium/photo-appareil-photo-noir-objectif-long-trepied-montagne-arriere-plan_978521-558.jpg?w=360",
  },
];

const categories = [
  { id: 1, name: "Homme", icon: "🏠" },
  { id: 2, name: "Électronique", icon: "📱" },
  { id: 3, name: "Beauté", icon: "💄" },
  { id: 4, name: "Cuisine & Ustensiles", icon: "🍳" },
  { id: 5, name: "Électroménager", icon: "🔌" },
];

const carouselImages = [
  "https://media.istockphoto.com/id/1357529194/fr/photo/rendu-3d-dun-salon-de-style-moderne-avec-chemin%C3%A9e.jpg?s=612x612&w=0&k=20&c=KZBiX2zyVuyoKRuzM95892W7Fr0Rb2vX9qUAN1phS10=",
  "https://media.istockphoto.com/id/1040810144/photo/unknown-woman-cutting-a-paprika.jpg?s=612x612&w=0&k=20&c=e6t5CL5zrpioK3uJ-TPkEpbWhbKvZPW8cC-y26HtBr8=",
  // Ajoute d'autres images ici
];

const Home = ({isOpen}) => {
  const swiperRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-2 ">
        {" "}
        {/* Ajout d'un padding supérieur pour le contenu principal */}
        <div className="flex flex-col md:flex-row gap-8">
          <sidea
            className={`md:w-1/4 bg-white rounded-lg mt-4 shadow-md p-4 ${
              isOpen ? "block" : "hidden md:block"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-[#30A08B]">
              Catégories
            </h2>
            <ul>
              {categories.map((category) => (
                <li key={category.id} className="mb-2">
                  <button className="w-full text-left py-2 px-4 rounded hover:bg-[#FFE9CC] transition-colors duration-200 flex items-center space-x-2">
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                </li>
              ))}
              <div className="container py-20">
                <div className="card w-100 h-50 overflow-hidden">
                  {carouselImages.map((image, index) => {
                    return <img src={image} key={index} alt="" />;
                  })}
                </div>
              </div>
            </ul>
          </sidea>

          {/* Carousel and Products */}
          <div className="md:w-3/4">
            {/* Carousel */}
            <section className="my-6 relative">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="mb-8 rounded-lg overflow-hidden"
              >
                {carouselImages.map((image, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-[400px] object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Flèches personnalisées */}
              <div
                className="absolute z-1 top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
                onClick={() => swiperRef.current.swiper.slidePrev()}
              >
                <span className="text-lg">←</span>
              </div>
              <div
                className="absolute z-1 top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
                onClick={() => swiperRef.current.swiper.slideNext()}
              >
                <span className="text-lg">→</span>
              </div>
            </section>

            <CategorieMobile/>

            {/* Featured Products */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#30A08B]">
                Produits vedettes
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-200"
                      />
                      <span className="absolute top-2 right-2 bg-[#30A08B] text-white text-xs font-bold px-2 rounded-full">
                        Nouveau
                      </span>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {product.name}
                      </h3>
                      <p className="text-[#B17236] font-bold text-lg">
                        {product.price}
                      </p>
                      <button className="mt-2 w-full bg-[#30A08B] text-white py-2 rounded-md hover:bg-[#2a8f7d] transition-colors duration-200 text-sm md:text-base shadow-md hover:shadow-lg">
                        Ajouter au panier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <div className="flex overflow-x-auto mt-3" onInvalidCapture={false}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((card, index) => (
            <div key={index} className="mr-3">
              <div className="w-32 border border-gray-300 h-32 overflow-hidden rounded-lg ">
                <img
                  src="https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg"
                  alt={`Publication ${card}`}
                  className="w-full h-full object-cover transition-transform transform hover:scale-105"
                />
              </div>
              <p className="text-center">Flash Sale</p>
            </div>
          ))}
        </div>
        <ProduitPage name={"📱 Électroniques"} />
        <SliderPage />
        <ProduitPage name={"💄 Beauté"} />
        <SliderPage />
        <ProduitPage name={"🍳 Cuisine & Ustensiles"} />
        <SliderPage />
        <ProduitPage name={"🔌 Électroménager"} />
      </main>
    </div>
  );
};

export default Home;
