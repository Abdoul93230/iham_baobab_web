import React from "react";
import InformationPage from "../components/legalInformationPage/InformationPage";
import HomeHeader from "../components/homePage/HomeHeader";
function Informagtion({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <InformationPage />
    </>
  );
}

export default Informagtion;
