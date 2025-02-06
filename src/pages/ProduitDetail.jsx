import React, { useEffect } from "react";
import ProduitDetailHeader from "../components/produitDetail/ProduitDetailHeader";
import ProduitDetailMain from "../components/produitDetail/ProduitDetailMain";
import ProduitDetailFooter from "../components/produitDetail/ProduitDetailFooter";
import { useParams } from "react-router-dom";
import HomeFooter from "@/components/homePage/HomeFooter";

function ProduitDetail({ panierchg, paniernbr, acces }) {
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);
  return (
    <>
      <ProduitDetailHeader acces={acces} paniernbr={paniernbr} />
      <ProduitDetailMain panierchg={panierchg} />
      {/* <ProduitDetailFooter /> */}
      <HomeFooter />
    </>
  );
}

export default ProduitDetail;
