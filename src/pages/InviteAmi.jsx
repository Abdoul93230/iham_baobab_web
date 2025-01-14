import React from "react";
import InviteAmiPage from "../components/inviteAmi/InviteAmiPage";
import HomeHeader from "../components/homePage/HomeHeader";
function InviteAmi({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <InviteAmiPage />
    </>
  );
}

export default InviteAmi;
