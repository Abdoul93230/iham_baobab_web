import React from "react";
import BoutiqueMain from "../components/boutiquePage/BoutiqueMain";
import HomeFooter from "@/components/homePage/HomeFooter";
import HomeHeader from "@/components/homePage/HomeHeader";
export default function Boutique({ acces }) {
  return (
    <>
      <HomeHeader />
      <BoutiqueMain />
      <HomeFooter />
    </>
  );
}
