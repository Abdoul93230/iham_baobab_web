import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// N'oubliez pas d'importer les styles CSS
import "swiper/css";
import "swiper/css/pagination";

const VerticalCarousel = ({ carouselImages }) => {
  return (
    <div className="container py-8">
      <div className="card w-full h-72">
        <Swiper
          direction="vertical"
          slidesPerView={1}
          spaceBetween={0}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          loop={true}
          modules={[Autoplay, Pagination]}
          className="h-full w-full"
        >
          {carouselImages.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt="" className="w-full h-full" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default VerticalCarousel;
