import React from "react";
import ConfidentialitePage from "../components/avisConfidentialite/ConfidentialitePage";
import HomeHeader from "../components/homePage/HomeHeader";
function Confidentialite({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <ConfidentialitePage />
    </>
  );
}

export default Confidentialite;
