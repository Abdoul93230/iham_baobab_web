import React from "react";
import InformationPage from "../components/legalInformationPage/InformationPage";
import HomeHeader from "../components/homePage/HomeHeader";
function Informagtion({ paniernbr }) {
  return (
    <>
      <HomeHeader paniernbr={paniernbr} />
      <InformationPage />
    </>
  );
}

export default Informagtion;
