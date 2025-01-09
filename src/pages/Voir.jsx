import React from "react";
import VoirPlus from "../components/voirPlusPage/VoirPlus";
import HomeHeader from "../components/homePage/HomeHeader";
export default function Voir({ paniernbr }) {
  return (
    <>
      <HomeHeader paniernbr={paniernbr} style={StyleSheet.contenu} />
      <VoirPlus />
    </>
  );
}
