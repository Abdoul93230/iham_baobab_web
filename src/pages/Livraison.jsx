import React from "react";
import LivraisonPage from "../components/livraisonPage/LivraisonPage";
import HomeHeader from "../components/homePage/HomeHeader";
function Livraison({ paniernbr }) {
  return (
    <>
      <HomeHeader paniernbr={paniernbr} />
      <LivraisonPage />
    </>
  );
}

export default Livraison;
