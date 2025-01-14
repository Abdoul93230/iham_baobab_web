import React from "react";
import NotificationBellIcon from "../components/pageNotificationheade/NotificationBellIcon";
import HomeHeader from "../components/homePage/HomeHeader";
export default function BellPage({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <NotificationBellIcon />
    </>
  );
}
