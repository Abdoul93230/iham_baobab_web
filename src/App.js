import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ResetPassword from "./pages/ResetPassword";
import Connexion from "../src/components/connexion/Connexion";
import Inscription from "./components/inscription/Inscription";
import Home from "./pages/Home";
import ProduitDetail from "./pages/ProduitDetail";
import Suggestion from "./pages/Suggestion";
import Compte from "./pages/Compte";
import CommandeSuivi from "./pages/Commande";
import InviteAmi from "./pages/InviteAmi";
import Informagtion from "./pages/Informagtion";
import Question from "./pages/Question";
import Confidentialite from "./pages/Confidentialite";
import Notification from "./pages/Notification";
import Paement from "./pages/Paement";
import Service from "./pages/Service";
import Livraison from "./pages/Livraison";
import SuiviCommand from "./pages/SuiviCommand";

import Boutique from "./pages/Boutique";
import Messagerie from "./pages/Messagerie";
import OrderConfirmationPaiement from "./pages/OrderConfirmationPaiement";
import BoutiquierProfile from "./components/boutiquePage/BoutiquierProfile";

import "./App.css";
import ForgetPassword from "./components/forgetPassword/ForgetPassword";
import Panier from "./pages/Panier";
import BellPage from "./pages/BellPage";
import ResusCommand from "./pages/ResusCommand";
import Homme from "./pages/Homme";
import Voir from "./pages/Voir";
import Nouveau from "./pages/Nouveau";
import Promotion from "./pages/Promotion";
import LikeProduit from "./pages/LikeProduit";
import IPayPayment from "./components/payment/IPayPayment";
import SuccessPage from "./components/payment/SuccessPage";
import ErrorPage from "./components/payment/ErrorPage";
import LoadingIndicator from "./pages/LoadingIndicator";
import axios from "axios";
import io from "socket.io-client";
import { Provider } from "react-redux";
import store from "./redux/store";

import {
  getCategories,
  getProducts,
  getProducts_Commentes,
  getProducts_Pubs,
  getTypes,
} from "./redux/ProductsActions";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function App() {
  const [acces, setAcces] = useState("non");
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [adminConnection, setAdminConnection] = useState(false);
  const [total, setTotal] = useState(0);
  const [codeP, setCodeP] = useState(null);
  const [produits, setProduits] = useState(0);
  const [loading, setLoading] = useState(true);
  const panier = () => {
    const local = localStorage.getItem("panier");
    if (local) {
      setProduits(JSON.parse(local));
    } else {
      setProduits(0);
    }
  };

  //////////////// verification d'hautentification de l'utilisateur
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

  /////////////////// recuperation des donnees avec redux toolkit////////////////
  useEffect(() => {
    store.dispatch(getProducts(setLoading));
    store.dispatch(getTypes());
    store.dispatch(getCategories(setLoading));
    store.dispatch(getProducts_Pubs());
    store.dispatch(getProducts_Commentes());
    const socket = io(BackendUrl);

    // socket.on("connect", () => {
    //   console.log("Connecté au serveur Socket.io");
    // });

    socket.on("new_message_user", (data) => {
      // console.log("Nouveau message reçu :");
    });

    // socket.on("disconnect", () => {
    //   console.log("Déconnecté du serveur Socket.io");
    // });
    // setLoading(false);

    return () => {
      socket.disconnect();
    };
  }, []);

  const changeA = (param) => {
    setAcces(param);
  };

  return (
    <Provider store={store}>
      <LoadingIndicator loading={loading}>
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Home acces={acces} paniernbr={produits} />}
              />
              <Route
                path="/Connexion"
                element={<Connexion chg={changeA} panierchg={panier} />}
              />
              <Route
                path="/Inscription"
                element={<Inscription chg={changeA} />}
              />
              <Route
                path="/Home"
                element={
                  <Home acces={acces} paniernbr={produits} panierchg={panier} />
                }
              />
              <Route path="/Forget Password" element={<ForgetPassword />} />
              <Route path="/ResetPassword/:email" element={<ResetPassword />} />
              <Route
                path="/ProduitDétail/:id"
                element={
                  <ProduitDetail
                    acces={acces}
                    panierchg={panier}
                    paniernbr={produits}
                  />
                }
              />
              <Route
                path="/Suggestion"
                element={
                  acces === "oui" ? (
                    <Suggestion acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/Compte"
                element={
                  acces === "oui" ? (
                    <Compte acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/Commande"
                element={
                  acces === "oui" ? (
                    <CommandeSuivi acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/Inviter les amis"
                element={
                  acces === "oui" ? (
                    <InviteAmi acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route path="/payment/ipay" element={<IPayPayment />} />
              <Route
                path="/Legal information"
                element={
                  // acces === "oui" ? (
                  <Informagtion acces={acces} paniernbr={produits} />
                  // ) : (
                  //   <Connexion chg={changeA} />
                  // )
                }
              />
              <Route
                path="/Question Fréquement possées"
                element={
                  // acces === "oui" ? (
                  <Question acces={acces} paniernbr={produits} />
                  // ) : (
                  //   <Connexion chg={changeA} />
                  // )
                }
              />
              <Route
                path="/Avis de confidentialité"
                element={
                  // acces === "oui" ? (
                  <Confidentialite acces={acces} paniernbr={produits} />
                  // ) : (
                  //   <Connexion chg={changeA} />
                  // )
                }
              />
              <Route
                path="/Paramètre de notification"
                element={
                  acces === "oui" ? (
                    <Notification acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/Paement"
                element={
                  acces === "oui" ? (
                    <Paement acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/Service"
                element={
                  // acces === "oui" ? (
                  <Service acces={acces} paniernbr={produits} />
                  // ) : (
                  //   <Connexion chg={changeA} />
                  // )
                }
              />
              <Route
                path="/Livraison"
                element={
                  acces === "oui" ? (
                    <Livraison acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/Panier"
                element={
                  // acces === "oui" ? (
                  <Panier
                    acces={acces}
                    total={total}
                    setTotal={setTotal}
                    codeP={codeP}
                    setCodeP={setCodeP}
                    panierchg={panier}
                    paniernbr={produits}
                  />
                  // ) : (
                  //   <Connexion chg={changeA} />
                  // )
                }
              />
              <Route
                path="/Suivre la commande/:id"
                element={
                  acces === "oui" ? (
                    <SuiviCommand acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/NotificationHeader"
                element={
                  acces === "oui" ? (
                    <BellPage acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/Commande réisus/:id"
                element={
                  acces === "oui" ? (
                    <ResusCommand acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/Categorie/:name"
                element={<Homme acces={acces} paniernbr={produits} />}
              />
              <Route
                path="/Categorie/:name/:type"
                element={<Homme acces={acces} paniernbr={produits} />}
              />
              <Route
                path="/Voir-plus"
                element={<Voir acces={acces} paniernbr={produits} />}
              />
              <Route
                path="/Nouveau produit"
                element={<Nouveau acces={acces} paniernbr={produits} />}
              />
              <Route
                path="/Produit promotions"
                element={<Promotion acces={acces} paniernbr={produits} />}
              />
              <Route
                path="/Like produit"
                element={
                  acces === "oui" ? (
                    <LikeProduit acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/Boutique"
                element={<Boutique acces={acces} paniernbr={produits} />}
              />
              <Route
                path="/Messagerie"
                element={
                  acces === "oui" ? (
                    <Messagerie acces={acces} paniernbr={produits} />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/OrderConfirmation"
                element={
                  acces === "oui" ? (
                    <OrderConfirmationPaiement
                      acces={acces}
                      paniernbr={produits}
                      total={total}
                      codeP={codeP}
                      setCodeP={setCodeP}
                    />
                  ) : (
                    <Connexion chg={changeA} />
                  )
                }
              />
              <Route
                path="/Profile d'un boutiquier"
                element={
                  <BoutiquierProfile acces={acces} paniernbr={produits} />
                }
              />
              <Route path="/success" element={<SuccessPage />} />
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </BrowserRouter>
        </div>
      </LoadingIndicator>
    </Provider>
  );
}

export default App;
