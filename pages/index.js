import React, { useState, useEffect } from "react";
import Head from "next/head";
import axios from "axios";
import LoadingIndicator from "../src/pages/LoadingIndicator";
import HomeMain from "../src/components/homePage/HomeMain";
import HomeFooter from "../src/components/homePage/HomeFooter";
import HomeHeader from "../src/components/homePage/HomeHeader";
import { Info } from "lucide-react";
import AppPromo from "../src/components/produitDetail/AppPromo ";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function Home({ loading }) {
  const [acces, setAcces] = useState("non");
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [produits, setProduits] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const panier = () => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduits(JSON.parse(local));
    } else {
      setProduits(0);
    }
  };

  const chg = () => {
    setIsOpen(!isOpen);
  };

  const changeA = (param) => {
    setAcces(param);
  };

  // Authentication verification
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
          console.log(error.response);
          setVerificationComplete(true);
        })
        .finally(() => {
          setVerificationComplete(true);
        });
    } else {
      setVerificationComplete(true);
    }
  }, []);

  return (
    <>
      <Head>
        <title>iham_baobab_web - Accueil</title>
        <meta name="description" content="Bienvenue sur iham_baobab_web - Votre plateforme e-commerce de confiance" />
        <meta name="keywords" content="e-commerce, shopping, produits, achats en ligne" />
        <meta property="og:title" content="iham_baobab_web - Accueil" />
        <meta property="og:description" content="Bienvenue sur iham_baobab_web - Votre plateforme e-commerce de confiance" />
        <meta property="og:type" content="website" />
      </Head>
      
      <LoadingIndicator loading={loading}>
        <div className="bg-gray-100">
          <button className="fixed bottom-4 right-4 p-3 z-2 rounded-full bg-[#30A08B] text-white shadow-lg hover:shadow-xl transition-all">
            <Info className="w-6 h-6 animate-pulse ease-in duration-300" />
          </button>
          <HomeHeader acces={acces} chg={chg} paniernbr={produits} />
          <HomeMain isOpen={isOpen} />
          <AppPromo />
          <HomeFooter />
        </div>
      </LoadingIndicator>
    </>
  );
}

export default Home;