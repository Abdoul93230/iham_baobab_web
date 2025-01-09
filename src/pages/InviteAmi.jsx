import React from "react";
import InviteAmiPage from "../components/inviteAmi/InviteAmiPage";
import HomeHeader from "../components/homePage/HomeHeader";
function InviteAmi({ paniernbr }) {
  return (
    <>
      <HomeHeader paniernbr={paniernbr} />
      <InviteAmiPage />
    </>
  );
}

export default InviteAmi;
