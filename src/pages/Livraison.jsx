import React from "react";
import LivraisonPage from "../components/livraisonPage/LivraisonPage";
import HomeHeader from "../components/homePage/HomeHeader";
function Livraison({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <LivraisonPage />
    </>
  );
}

export default Livraison;
