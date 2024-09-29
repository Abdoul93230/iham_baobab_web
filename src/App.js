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
import "./App.css"
import ForgetPassword from './components/forgetPassword/ForgetPassword';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        {/* <Route path='/Connexion' element={<Connexion />} />  */}
        <Route path='/' element={<Connexion />} /> 
        <Route path='/Inscription' element={<Inscription />} /> 
        <Route path='/Home' element={<Home />} /> 
        <Route path='/Forget Password' element={<ForgetPassword />} /> 
        <Route path='/Home' element={<Home/> } /> 
        <Route path='/Produit détail' element={<ProduitDetail/> } /> 
        <Route path='/Suggestion' element={<Suggestion/> } /> 
        <Route path='/Compte' element={<Compte/> } /> 
        <Route path='/Commande' element={<CommandeSuivi/> } /> 
        <Route path='/Inviter les amis' element={<InviteAmi/> } /> 
       </Routes>
       
       </BrowserRouter>

    </div>
  );
}

export default App;
