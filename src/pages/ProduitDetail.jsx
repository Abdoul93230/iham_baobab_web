import React, { useEffect } from "react";
import ProduitDetailHeader from "../components/produitDetail/ProduitDetailHeader";
import ProduitDetailMain from "../components/produitDetail/ProduitDetailMain";
import ProduitDetailFooter from "../components/produitDetail/ProduitDetailFooter";
import { useParams } from "react-router-dom";

function ProduitDetail() {
  const params = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.id]);
  return (
    <>
      <ProduitDetailHeader />
      <ProduitDetailMain />
      <ProduitDetailFooter />
    </>
  );
}

export default ProduitDetail;
