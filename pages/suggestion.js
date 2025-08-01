import React, { useEffect, useState } from "react";
import Head from "next/head";
import LoadingIndicator from "../src/pages/LoadingIndicator";
import Suggestion from "../src/pages/Suggestion";
import Connexion from "../src/components/connexion/Connexion";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function SuggestionPage({ loading }) {
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

  const changeA = (param) => {
    setAcces(param);
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

  if (acces === "non") {
    return (
      <>
        <Head>
          <title>Connexion requise - iham_baobab_web</title>
          <meta name="robots" content="noindex" />
        </Head>
        <LoadingIndicator loading={loading}>
          <Connexion chg={changeA} />
        </LoadingIndicator>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Suggestions - iham_baobab_web</title>
        <meta name="description" content="Découvrez nos suggestions de produits personnalisées" />
        <meta name="robots" content="noindex" />
      </Head>
      
      <LoadingIndicator loading={loading}>
        <Suggestion acces={acces} paniernbr={produits} />
      </LoadingIndicator>
    </>
  );
}

export default SuggestionPage;