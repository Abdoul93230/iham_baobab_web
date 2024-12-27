import React from "react";
import PanierPage from "../components/panier/PanierPage";
import HomeHeader from "../components/homePage/HomeHeader";
function Panier({ acces, total, setTotal, codeP, setCodeP }) {
  return (
    <>
      <HomeHeader />
      <PanierPage
        acces={acces}
        total={total}
        setTotal={setTotal}
        codeP={codeP}
        setCodeP={setCodeP}
      />
    </>
  );
}

export default Panier;
