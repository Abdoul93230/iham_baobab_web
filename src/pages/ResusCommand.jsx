import React from "react";
import ResusCommande from "../components/CommandeResus/ResusCommande";
import HomeHeader from "../components/homePage/HomeHeader";
export default function ResusCommand({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <ResusCommande />
    </>
  );
}
