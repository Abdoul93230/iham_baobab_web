import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Connexion from '../src/components/connexion/Connexion';
import Inscription from './components/inscription/Inscription';
import Home from './pages/Home';
import ProduitDetail from './pages/ProduitDetail';
import Suggestion from './pages/Suggestion';
import Compte from './pages/Compte';
import CommandeSuivi from './pages/Commande';
import InviteAmi from './pages/InviteAmi';
import Informagtion from './pages/Informagtion';
import Question from './pages/Question';
import Confidentialite from './pages/Confidentialite'
import Notification from './pages/Notification'
import Paement from './pages/Paement';
import Service from './pages/Service';
import Livraison from './pages/Livraison';
import SuiviCommand from './pages/SuiviCommand';

import "./App.css"
import ForgetPassword from './components/forgetPassword/ForgetPassword';
import Panier from './pages/Panier';
import BellPage from './pages/BellPage';
import ResusCommand from './pages/ResusCommand';
import Homme from './pages/Homme';
import Voir from './pages/Voir';
import Nouveau from './pages/Nouveau';
import Promotion from './pages/Promotion';
import LikeProduit from './pages/LikeProduit';
import Boutique from './pages/Boutique';
import Messagerie from './pages/Messagerie';
import OrderConfirmationPaiement from './pages/OrderConfirmationPaiement';
import BoutiquierProfile from './components/boutiquePage/BoutiquierProfile';



function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path='/' element={<Connexion />} /> 
        {/* <Route path='/Connexion' element={<Connexion />} />  */}
        <Route path='/Inscription' element={<Inscription />} /> 
        <Route path='/Home' element={<Home />} /> 
        <Route path='/Forget Password' element={<ForgetPassword />} />
        <Route path='/Home' element={<Home/> } /> 
        <Route path='/Produit détail' element={<ProduitDetail/> } /> 
        <Route path='/Suggestion' element={<Suggestion/> } /> 
        <Route path='/Compte' element={<Compte/> } /> 
        <Route path='/Commande' element={<CommandeSuivi/> } /> 
        <Route path='/Inviter les amis' element={<InviteAmi/> } /> 
        <Route path='/Legal information' element={<Informagtion/> } /> 
        <Route path='/Question Fréquement possées' element={<Question/> } /> 
        <Route path='/Avis de confidentialité' element={<Confidentialite/> } /> 
        <Route path='/Paramètre de notification' element={<Notification/> } /> 
        <Route path='/Paement' element={<Paement/> } /> 
        <Route path='/Service' element={<Service/> } /> 
        <Route path='/Livraison' element={<Livraison/> } /> 
        <Route path='/Panier' element={<Panier/> } /> 
        <Route path='/Suivre la commande' element={<SuiviCommand/> } /> 
        <Route path='/Notification header' element={<BellPage/> } /> 
        <Route path='/Commande réisus' element={<ResusCommand/> } /> 
        <Route path='/Homme' element={<Homme/> } /> 
        <Route path='/Voir-plus' element={<Voir/> } /> 
        <Route path='/Nouveau produit' element={<Nouveau/> } /> 
        <Route path='/Produit promotions' element={<Promotion/> } /> 
        <Route path='/Like produit' element={<LikeProduit/> } /> 
        <Route path='/Boutique' element={<Boutique/> } /> 
        <Route path='/Messagerie' element={<Messagerie/> } /> 
        <Route path='/OrderConfirmation' element={<OrderConfirmationPaiement/> } /> 
        <Route path="/Profile d'un boutiquier" element={<BoutiquierProfile/> } /> 
       </Routes>
       </BrowserRouter>

    </div>
  );
}

export default App;
