import React from "react";
import CommandeSuivi from "../components/suivreCommande/CommandeSuivi";
import HomeHeader from "../components/homePage/HomeHeader";
export default function SuiviCommand({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <CommandeSuivi />
    </>
  );
}
