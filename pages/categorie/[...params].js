import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LoadingIndicator from "../../src/pages/LoadingIndicator";
import Homme from "../../src/pages/Homme";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function CategoriePage({ loading }) {
  const router = useRouter();
  const { name, type } = router.query;
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

  const pageTitle = type ? `${name} - ${type}` : name || "Catégorie";

  return (
    <>
      <Head>
        <title>{pageTitle} - iham_baobab_web</title>
        <meta name="description" content={`Découvrez notre sélection de produits dans la catégorie ${name}`} />
        <meta property="og:title" content={`${pageTitle} - iham_baobab_web`} />
        <meta property="og:description" content={`Découvrez notre sélection de produits dans la catégorie ${name}`} />
        <meta property="og:type" content="website" />
      </Head>
      
      <LoadingIndicator loading={loading}>
        <Homme acces={acces} paniernbr={produits} />
      </LoadingIndicator>
    </>
  );
}

export default CategoriePage;