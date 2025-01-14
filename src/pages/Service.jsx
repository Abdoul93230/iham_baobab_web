import React from "react";
import ServicePage from "../components/servicePage/ServicePage";
import HomeHeader from "../components/homePage/HomeHeader";
function Service({ paniernbr, acces }) {
  return (
    <div className="overflow-hidden">
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <ServicePage />
    </div>
  );
}

export default Service;
