import React from "react";
import PanierPage from "../components/panier/PanierPage";
import HomeHeader from "../components/homePage/HomeHeader";
function Panier({
  acces,
  total,
  setTotal,
  codeP,
  setCodeP,
  panierchg,
  paniernbr,
}) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <PanierPage
        acces={acces}
        total={total}
        setTotal={setTotal}
        codeP={codeP}
        setCodeP={setCodeP}
        panierchg={panierchg}
      />
    </>
  );
}

export default Panier;
