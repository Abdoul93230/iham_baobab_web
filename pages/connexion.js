import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LoadingIndicator from "../src/pages/LoadingIndicator";
import Connexion from "../src/components/connexion/Connexion";

function ConnexionPage({ loading }) {
  const router = useRouter();
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
    if (param === "oui") {
      router.push("/");
    }
  };

  useEffect(() => {
    panier();
  }, []);

  return (
    <>
      <Head>
        <title>Connexion - iham_baobab_web</title>
        <meta name="description" content="Connectez-vous à votre compte iham_baobab_web" />
        <meta name="robots" content="noindex" />
      </Head>
      
      <LoadingIndicator loading={loading}>
        <Connexion chg={changeA} panierchg={panier} />
      </LoadingIndicator>
    </>
  );
}

export default ConnexionPage;