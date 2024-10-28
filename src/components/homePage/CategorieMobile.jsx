import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CategorieMobile = () => {
  const navigation = useNavigate()
  const [isHovering, setIsHovering] = useState(false);
  const categoriesRef = useRef(null);

  const categories = [
    { id: 1, name: 'Électronique', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#30A08B' },
    { id: 2, name: 'Extensions, perruques', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#B2905F' },
    { id: 3, name: 'Vêtements et accessoires sport', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#B17236' },
    { id: 4, name: 'Chaussures', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#30A08B' },
    { id: 5, name: 'Accessoires', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#B2905F' },
    { id: 6, name: 'Automobiles, pièces et accessoires', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#B17236' },
    { id: 7, name: 'Bijoux et accessoires', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#30A08B' },
    { id: 8, name: 'Bijoux et accessoires', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#30A08B' },
    { id: 9, name: 'Bijoux et accessoires', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#30A08B' },
    { id: 10, name: 'Bijoux et accessoires', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#30A08B' },
    { id: 11, name: 'Bijoux et accessoires', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#30A08B' },
    { id: 12, name: 'Bijoux et accessoires', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#30A08B' },
    { id: 13, name: 'Bijoux et accessoires', icon: 'https://res.cloudinary.com/mozillion/image/upload/f_auto,q_auto/v1662630077/bre0l08s9acswuaetx73.png', bgColor: '#30A08B' },
  ];

  const scrollLeft = () => {
    categoriesRef.current.scrollBy({ left: -200, behavior: 'smooth' });
  };

  const scrollRight = () => {
    categoriesRef.current.scrollBy({ left: 200, behavior: 'smooth' });
  };

  return (
    <div className=" w-full bg-gradient-to-b from-gray-50 to-white rounded-lg py-4 shadow-sm">
      <div className="relative">
        {/* Navigation buttons */}
        <button 
          onClick={scrollLeft} 
          className="absolute left-1 top-1/2 -translate-y-1/2 bg-[#30A08B] rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 z-10 text-white hover:bg-[#B2905F]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={scrollRight} 
          className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#30A08B] rounded-full p-1.5 shadow-lg hover:shadow-xl transition-all duration-300 z-10 text-white hover:bg-[#B2905F]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Categories container */}
        <div 
          ref={categoriesRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth custom-scrollbar"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
         <div className="flex space-x-4 px-8">
  {categories.map((category) => (
    <div
      key={category.id}
      onClick={() => navigation("/Homme")}
      className={`
       flex justify-between items-center border rounded-lg space-x-5 p-2
        transition-transform duration-300 ease-out
         active:scale-95 cursor-pointer
      `}
    >
      <div 
        className={`rounded w-[55px] mb-2 transform transition-all duration-300 hover:shadow-md hover:scale-105 group relative overflow-hidden`}
      >
        <img 
          src={category.icon}
          alt={category.name}
          className="object-cover w-full h-full
                   transition-transform duration-300
                   group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
      </div>

      <span className="text-xs text-nowrap font-medium text-gray-700 text-center group-hover:text-gray-900 transition-colors duration-300">
        {category.name}
      </span>
    </div>
  ))}
</div>

        </div>
        <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
  display: none; /* Pour les navigateurs WebKit (Chrome, Safari) */
}

.custom-scrollbar {
  -ms-overflow-style: none; /* Pour Internet Explorer et Edge */
  scrollbar-width: none; /* Pour Firefox */
}
        
        `} </style>
      </div>
      
      {/* Optional scroll indicator */}
      <div className="flex justify-center mt-2 space-x-1">
        <div 
          className={`h-1 w-12 rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
          style={{ background: 'linear-gradient(to right, #30A08B, #B2905F)' }}
        />
      </div>
    </div>
  );
};

export default CategorieMobile;