import React from "react";
import ParaNotification from "../components/parametreNotification/ParaNotification";
import HomeHeader from "../components/homePage/HomeHeader";
function Notification({ paniernbr, acces }) {
  return (
    <div>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <ParaNotification />
    </div>
  );
}

export default Notification;
