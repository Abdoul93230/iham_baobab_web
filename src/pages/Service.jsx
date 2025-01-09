import React from "react";
import ServicePage from "../components/servicePage/ServicePage";
import HomeHeader from "../components/homePage/HomeHeader";
function Service({ paniernbr }) {
  return (
    <div className="overflow-hidden">
      <HomeHeader paniernbr={paniernbr} />
      <ServicePage />
    </div>
  );
}

export default Service;
