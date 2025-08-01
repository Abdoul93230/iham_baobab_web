import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LoadingIndicator from "../../src/pages/LoadingIndicator";
import ProduitDetail from "../../src/pages/ProduitDetail";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function ProduitDetailPage({ loading, productData }) {
  const router = useRouter();
  const { id } = router.query;
  const [acces, setAcces] = useState("non");
  const [produits, setProduits] = useState(0);

  const panier = () => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduits(JSON.parse(local));
    } else {
      setProduits(0);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userEcomme"));
    panier();

    if (user) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      axios
        .get(`${BackendUrl}/verify`, { withCredentials: true })
        .then((response) => {
          setAcces("oui");
        })
        .catch((error) => {
          setAcces("non");
        });
    }
  }, []);

  const productTitle = productData?.name || `Produit ${id}`;
  const productDescription = productData?.description || "Découvrez ce produit sur iham_baobab_web";

  return (
    <>
      <Head>
        <title>{productTitle} - iham_baobab_web</title>
        <meta name="description" content={productDescription} />
        <meta property="og:title" content={productTitle} />
        <meta property="og:description" content={productDescription} />
        <meta property="og:type" content="product" />
        {productData?.images?.[0] && (
          <meta property="og:image" content={productData.images[0]} />
        )}
      </Head>
      
      <LoadingIndicator loading={loading}>
        <ProduitDetail
          acces={acces}
          panierchg={panier}
          paniernbr={produits}
        />
      </LoadingIndicator>
    </>
  );
}

// This runs on the server side for SEO
export async function getServerSideProps(context) {
  const { id } = context.query;
  let productData = null;

  try {
    // Fetch product data for SEO
    if (BackendUrl) {
      const response = await axios.get(`${BackendUrl}/products/${id}`);
      productData = response.data;
    }
  } catch (error) {
    console.error("Error fetching product data:", error);
  }

  return {
    props: {
      productData,
    },
  };
}

export default ProduitDetailPage;