import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import {ShoppingCart} from 'lucide-react';
const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 39.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 19.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 49.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 5,
      name: 'Product 5',
      price: 25.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 6,
      name: 'Product 6',
      price: 15.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 7,
      name: 'Product 7',
      price: 35.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 8,
      name: 'Product 8',
      price: 45.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 9,
      name: 'Product 9',
      price: 55.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 10,
      name: 'Product 10',
      price: 65.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 11,
      name: 'Product 10',
      price: 65.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
    {
      id: 12,
      name: 'Product 10',
      price: 65.99,
      image: 'https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg',
    },
  ];


const SliderPage = () => {
  const swiperRef = React.useRef(null);
  
  return (
    <div className="mx-auto p-2 relative">
      <Swiper
        ref={swiperRef}
        autoplay={true}
        navigation={false} // Désactive la navigation intégrée
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
      <SwiperSlide key={product.id} className="flex justify-center border cursor-pointer overflow-hidden rounded-lg">
        <div className='absolute z-2 right-3 top-2 bg-[#62aca2bb] p-2 rounded-full h-5 text-sm  text-white justify-center items-center flex'>-10%</div>
      <div className="flex flex-col w-full h-auto transition-transform transform hover:scale-105">
        <img src={product.image} alt={product.name} className="w-full h-32 object-center " />
        <div className="mt-auto text-center shadow-sm bg-white">
          <h2 className="text-lg font-semibold text-[#30A08B]">{product.name}</h2>
          <p className="text-md text-[#B2905F]">${product.price.toFixed(2)}</p>
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
