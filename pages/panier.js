import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LoadingIndicator from "../src/pages/LoadingIndicator";
import Panier from "../src/pages/Panier";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function PanierPage({ loading }) {
  const router = useRouter();
  const [acces, setAcces] = useState("non");
  const [produits, setProduits] = useState(0);
  const [total, setTotal] = useState(0);
  const [codeP, setCodeP] = useState(null);

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
        <title>Panier - iham_baobab_web</title>
        <meta name="description" content="Consultez votre panier d'achats" />
        <meta name="robots" content="noindex" />
      </Head>
      
      <LoadingIndicator loading={loading}>
        <Panier
          acces={acces}
          total={total}
          setTotal={setTotal}
          codeP={codeP}
          setCodeP={setCodeP}
          panierchg={panier}
          paniernbr={produits}
        />
      </LoadingIndicator>
    </>
  );
}

export default PanierPage;