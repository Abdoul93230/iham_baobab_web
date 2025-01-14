import React from "react";
import DetailHomme from "../components/categorieHommePage/DetailHomme";
export default function Homme({ paniernbr, acces }) {
  return (
    <>
      <DetailHomme acces={acces} paniernbr={paniernbr} />
    </>
  );
}
