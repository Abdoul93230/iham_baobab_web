import React from "react";
import PaiementPage from "../components/paementPage/PaiementPage";
import HomeHeader from "../components/homePage/HomeHeader";
function Paement({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <div style={{ marginTop: 7 }}></div>
      <PaiementPage acces={acces} />;
    </>
  );
}

export default Paement;
