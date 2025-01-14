import React, { useRef } from "react";
import HomeHeader from "../homePage/HomeHeader";
function ProduitDetailHeader({ paniernbr, acces }) {
  const swiperRef = useRef(null);

  return (
    <div ref={swiperRef}>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
    </div>
  );
}

export default ProduitDetailHeader;
