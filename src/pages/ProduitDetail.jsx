import React, { useEffect } from "react";
import ProduitDetailHeader from "../components/produitDetail/ProduitDetailHeader";
import ProduitDetailMain from "../components/produitDetail/ProduitDetailMain";
import ProduitDetailFooter from "../components/produitDetail/ProduitDetailFooter";
import { useParams } from "react-router-dom";

function ProduitDetail({ panierchg, paniernbr }) {
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);
  return (
    <>
      <ProduitDetailHeader paniernbr={paniernbr} />
      <ProduitDetailMain panierchg={panierchg} />
      <ProduitDetailFooter />
    </>
  );
}

export default ProduitDetail;
