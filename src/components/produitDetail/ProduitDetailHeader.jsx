import React, { useRef } from "react";
import HomeHeader from "../homePage/HomeHeader";
function ProduitDetailHeader({ paniernbr }) {
  const swiperRef = useRef(null);

  return (
    <div ref={swiperRef}>
      <HomeHeader paniernbr={paniernbr} />
    </div>
  );
}

export default ProduitDetailHeader;
