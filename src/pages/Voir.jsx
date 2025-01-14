import React from "react";
import VoirPlus from "../components/voirPlusPage/VoirPlus";
import HomeHeader from "../components/homePage/HomeHeader";
export default function Voir({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader
        acces={acces}
        paniernbr={paniernbr}
        style={StyleSheet.contenu}
      />
      <VoirPlus />
    </>
  );
}
