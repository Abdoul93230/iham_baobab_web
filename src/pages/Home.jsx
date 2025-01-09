import React, { useState } from "react";
import HomeMain from "../components/homePage/HomeMain";
import HomeFooter from "../components/homePage/HomeFooter";
import HomeHeader from "../components/homePage/HomeHeader";
import { Info, Menu } from "lucide-react";

function Home({ paniernbr }) {
  const [isOpen, setIsOpen] = useState(false);

  const chg = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <button className="fixed bottom-4 right-4 p-3 z-2 rounded-full bg-[#30A08B] text-white shadow-lg hover:shadow-xl transition-all">
        <Info className="w-6 h-6 animate-pulse ease-in duration-300" />
      </button>
      <HomeHeader chg={chg} paniernbr={paniernbr} />
      <HomeMain isOpen={isOpen} />
      <HomeFooter />
    </>
  );
}

export default Home;
