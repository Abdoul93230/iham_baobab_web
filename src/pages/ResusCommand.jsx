import React from "react";
import ResusCommande from "../components/CommandeResus/ResusCommande";
import HomeHeader from "../components/homePage/HomeHeader";
export default function ResusCommand({ paniernbr }) {
  return (
    <>
      <HomeHeader paniernbr={paniernbr} />
      <ResusCommande />
    </>
  );
}
