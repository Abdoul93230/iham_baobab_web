import React, { useEffect, useState } from "react";
import Head from "next/head";
import LoadingIndicator from "../src/pages/LoadingIndicator";
import Voir from "../src/pages/Voir";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function VoirPlusPage({ loading }) {
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
        <title>Voir plus - iham_baobab_web</title>
        <meta name="description" content="Découvrez plus de produits" />
        <meta property="og:title" content="Voir plus - iham_baobab_web" />
        <meta property="og:description" content="Découvrez plus de produits" />
        <meta property="og:type" content="website" />
      </Head>
      
      <LoadingIndicator loading={loading}>
        <Voir acces={acces} paniernbr={produits} />
      </LoadingIndicator>
    </>
  );
}

export default VoirPlusPage;