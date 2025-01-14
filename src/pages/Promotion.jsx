import React from "react";
import ProduitPromotion from "../components/promotionProduit/ProduitPromotion";
export default function Promotion({ paniernbr, acces }) {
  return <ProduitPromotion acces={acces} paniernbr={paniernbr} />;
}
