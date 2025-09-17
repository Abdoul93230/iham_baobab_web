import React, { useEffect, useState } from "react";
import Head from "next/head";
import LoadingIndicator from "../src/pages/LoadingIndicator";
import Nouveau from "../src/pages/Nouveau";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function NouveauProduitPage({ loading }) {
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

  return (
    <>
      <Head>
        <title>Nouveaux Produits - iham_baobab_web</title>
        <meta name="description" content="Découvrez nos derniers produits" />
        <meta property="og:title" content="Nouveaux Produits - iham_baobab_web" />
        <meta property="og:description" content="Découvrez nos derniers produits" />
        <meta property="og:type" content="website" />
      </Head>
      
      <LoadingIndicator loading={loading}>
        <Nouveau acces={acces} paniernbr={produits} />
      </LoadingIndicator>
    </>
  );
}

export default NouveauProduitPage;