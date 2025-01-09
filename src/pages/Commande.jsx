import React from "react";
import CommandePage from "../components/CommandeSuivi/CommandePage";
import HomeHeader from "../components/homePage/HomeHeader";

function CommandeSuivi({ paniernbr }) {
  return (
    <>
      <HomeHeader paniernbr={paniernbr} />
      <CommandePage />
    </>
  );
}

export default CommandeSuivi;
