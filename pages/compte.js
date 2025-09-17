import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LoadingIndicator from "../src/pages/LoadingIndicator";
import Compte from "../src/pages/Compte";
import Connexion from "../src/components/connexion/Connexion";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function ComptePage({ loading }) {
  const router = useRouter();
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
    if (param === "oui") {
      // Refresh the page data
      window.location.reload();
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
        <title>Mon Compte - iham_baobab_web</title>
        <meta name="description" content="Gérez votre compte et vos informations personnelles" />
        <meta name="robots" content="noindex" />
      </Head>
      
      <LoadingIndicator loading={loading}>
        <Compte acces={acces} paniernbr={produits} />
      </LoadingIndicator>
    </>
  );
}

export default ComptePage;