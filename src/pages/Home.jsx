import React, { useState } from 'react';
import HomeMain from "../components/homePage/HomeMain";
import HomeFooter from '../components/homePage/HomeFooter';
import HomeHeader from '../components/homePage/HomeHeader';
import { Menu } from 'lucide-react';

function Home() {
  const [isOpen,setIsOpen] = useState(false)
  const bounceIcon = () => (
        <svg className="animate-bounce w-6 h-6 z-2 absolute border border[#000] right-3">
        <Menu className="w-full h-full p-4" />
      </svg>
  )

  const chg = ()=>{
    setIsOpen(!isOpen)
  }
  return (
    <>
      <HomeHeader chg={chg} />
      <HomeMain isOpen={isOpen} />
      <HomeFooter />

  
    </>
  );
}

export default Home;
