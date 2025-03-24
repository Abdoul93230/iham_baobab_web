import React from "react";
import LikeProduitPage from "../components/likeProduit/LikeProduitPage";
import HomeHeader from "@/components/homePage/HomeHeader";
export default function LikeProduit({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <LikeProduitPage />
    </>
  );
}
