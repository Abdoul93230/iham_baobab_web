import React from "react";
import DetailHomme from "../components/categorieHommePage/DetailHomme";
import HomeFooter from "@/components/homePage/HomeFooter";
export default function Homme({ paniernbr, acces }) {
  return (
    <>
      <DetailHomme acces={acces} paniernbr={paniernbr} />
      <HomeFooter />
    </>
  );
}
