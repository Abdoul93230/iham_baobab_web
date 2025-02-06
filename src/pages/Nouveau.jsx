import React from "react";
import NouveauterPage from "../components/nouveauProduit/NouveauterPage";
import HomeFooter from "@/components/homePage/HomeFooter";
export default function Nouveau({ paniernbr, acces }) {
  return (
    <>
      <NouveauterPage paniernbr={paniernbr} />;
      <HomeFooter />
    </>
  );
}
