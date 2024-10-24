import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {ShoppingCart} from 'lucide-react';
import { useNavigate } from "react-router-dom";



const SliderPage = ({products, name}) => {
  const swiperRef = React.useRef(null);
  
  const navigation = useNavigate();


  return (
    <div className="mx-auto p-2 relative">
      <Swiper
        ref={swiperRef}
        autoplay={true}
        navigation={false} 
        slidesPerView={2}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 8,
          },
        }}
        className="my-8"
      >
        {products.map((product) => (
      <SwiperSlide key={product._id}
      onClick={() => navigation(`/ProduitDétail/${product._id}`)}
      className="flex justify-center border cursor-pointer overflow-hidden rounded-lg">

{product.prixPromo > 0 ? (

<div className='absolute z-2 right-3 top-2 bg-[#62aca2bb] p-2 rounded-full h-5 text-sm  text-white justify-center items-center flex'>- {Math.round(
                        ((product.prix - product.prixPromo) / product.prix) * 100
                      )}{" "}
                      %</div>

                   
                  ) : (
                    <></>
                  )}




        
      <div className="flex flex-col w-full h-auto transition-transform transform hover:scale-105">
        <img src={product.image1} alt={product.name} className="w-full h-32 object-center " />
        <div className="mt-auto text-center shadow-sm bg-white">
          <h2 className="text-lg font-semibold text-[#30A08B]">{product.name.slice(0, 10)}...</h2>
          <p className="text-md text-[#B2905F]">Cfa {product.prix.toFixed(2)}</p>
            <div className="absolute z-2 right-2 bottom-2 transform opacity-0  hover:opacity-100">
            <ShoppingCart />
            </div>
            {/* <div >
        <ShoppingCart className="text-[#0000] h-6 w-6" />
      </div> */}
        </div>
      </div>
    </SwiperSlide>
    
        ))}
      </Swiper>
      <div 
        className="absolute z-10 top-1/2 left-0 transform -translate-y-1/2 transition-transform transform hover:scale-105 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
        onClick={() => swiperRef.current.swiper.slidePrev()}
      >
        <span className="text-lg">←</span>
      </div>
      <div 
        className="absolute z-10 top-1/2 right-0 transform -translate-y-1/2 w-10 transition-transform transform hover:scale-105 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
        onClick={() => swiperRef.current.swiper.slideNext()}
      >
        <span className="text-lg">→</span>
      </div>
    </div>
  );
};

export default SliderPage;
