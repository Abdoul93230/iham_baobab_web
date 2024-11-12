import React, { useEffect } from 'react'
import ProduitDetailHeader from '../components/produitDetail/ProduitDetailHeader'
import ProduitDetailMain from '../components/produitDetail/ProduitDetailMain'
import ProduitDetailFooter from '../components/produitDetail/ProduitDetailFooter'



function ProduitDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
        <ProduitDetailHeader />
        <ProduitDetailMain />
        <ProduitDetailFooter />
    </>
  )
}

export default ProduitDetail;