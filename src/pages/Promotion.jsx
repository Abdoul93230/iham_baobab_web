import React from "react";
import ProduitPromotion from "../components/promotionProduit/ProduitPromotion";
import HomeFooter from "@/components/homePage/HomeFooter";
export default function Promotion({ paniernbr, acces }) {
  return (
    <>
      <ProduitPromotion acces={acces} paniernbr={paniernbr} />;
      <HomeFooter />
    </>
  );
}
