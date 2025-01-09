import React from "react";
import ParaNotification from "../components/parametreNotification/ParaNotification";
import HomeHeader from "../components/homePage/HomeHeader";
function Notification({ paniernbr }) {
  return (
    <div>
      <HomeHeader paniernbr={paniernbr} />
      <ParaNotification />
    </div>
  );
}

export default Notification;
