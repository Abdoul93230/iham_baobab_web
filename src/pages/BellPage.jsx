import React from "react";
import NotificationBellIcon from "../components/pageNotificationheade/NotificationBellIcon";
import HomeHeader from "../components/homePage/HomeHeader";
export default function BellPage({ paniernbr }) {
  return (
    <>
      <HomeHeader paniernbr={paniernbr} />
      <NotificationBellIcon />
    </>
  );
}
