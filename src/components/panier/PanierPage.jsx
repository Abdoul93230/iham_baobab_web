import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Minus,
  RefreshCw,
  ShoppingCart,
  CreditCard,
  Tag,Check, AlertCircle
} from "lucide-react";
import OrderConfirmation from './OrderConfirmation'; 

const PanierPage = ({ total = 0, onPaymentComplete }) => {
  const [articles, setArticles] = useState([]);
  const [codePromo, setCodePromo] = useState("");
  const [reduction, setReduction] = useState(0);
  const [modeExpedition, setModeExpedition] = useState("standard");
  const [fraisExpedition, setFraisExpedition] = useState(5.99);
  const [estAbonne, setEstAbonne] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setArticles([
        {
          id: 1,
          nom: "T-shirt Classic",
          description: "T-shirt en coton bio",
          prix: 19.99,
          prixOriginal: 29.99,
          quantite: 1,
          enPromo: true,
          image: "https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg",
        },
        {
          id: 2,
          nom: "Jeans Slim",
          description: "Jeans coupe moderne",
          prix: 49.99,
          quantite: 1,
          enPromo: false,
          image: "https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg",
        },
        {
          id: 3,
          nom: "T-shirt Classic",
          description: "T-shirt en coton bio",
          prix: 19.99,
          prixOriginal: 29.99,
          quantite: 1,
          enPromo: true,
          image: "https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg",
        },
      ]);
    }, 1000);
  }, []);

  const modifierQuantite = (id, delta) => {
    setArticles((prevArticles) =>
      prevArticles.map((article) =>
        article.id === id
          ? { ...article, quantite: Math.max(1, article.quantite + delta) }
          : article
      )
    );
  };

  const supprimerArticle = (id) => {
    setArticles((prevArticles) =>
      prevArticles.filter((article) => article.id !== id)
    );
    setMessage("Article supprimé avec succès !");
  };

  const appliquerCodePromo = () => {
    if (codePromo === "PROMO10") {
      setReduction(10);
      setMessage("Code promo appliqué avec succès !");
    } else {
      setReduction(0);
      setMessage("Code promo invalide.");
    }
  };

  const changerModeExpedition = (mode) => {
    setModeExpedition(mode);
    setFraisExpedition(mode === "express" ? 12.99 : 5.99);
  };

  const calculerSousTotal = () => {
    return articles.reduce(
      (total, article) => total + article.prix * article.quantite,
      0
    );
  };

  const calculerTotal = () => {
    const sousTotal = calculerSousTotal();
    const totalAvecReduction = sousTotal - (sousTotal * reduction) / 100;
    return (totalAvecReduction + fraisExpedition).toFixed(2);
  };
  // pour les button passer la commande 

    const [loading, setLoading] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false);
    
  
    const handlePayment = async () => {
      try {
        setLoading(true);
        // Simuler un appel API de paiement
        await new Promise(resolve => setTimeout(resolve, 2000));
  
        // Simuler un succès de paiement
        setShowConfirmation(true); // Affiche le composant de confirmation
        if (onPaymentComplete) {
          onPaymentComplete();
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixe */}
      <div className="top-0 z-50 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#30A08B]">
            Votre Panier
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        {message && (
          <div className="mb-4 p-3 bg-[#30A08B]/10 rounded-lg text-[#30A08B] text-sm">
            {message}
          </div>
        )}

        {articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-sm">
            <ShoppingCart className="h-12 w-12 text-[#30A08B] animate-bounce" />
            <p className="text-lg text-[#30A08B]">Votre panier est vide</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des articles */}
            <div className="lg:col-span-2 space-y-4">
              {articles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <div className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      {/* Image Container */}
                      <div className="relative w-full md:w-48 h-50 md:h-40">
                        <img
                          src={article.image}
                          alt={article.nom}
                          className="w-full h-full object-fit-cover rounded-lg"
                        />
                        {article.enPromo && (
                          <div className="absolute top-2 right-2 bg-[#30A08B] text-white px-2 py-1 text-xs rounded-md">
                            Promo
                          </div>
                        )}
                      </div>

                      {/* Info Container */}
                      <div className="flex-grow flex flex-col justify-between">
                        <div className="space-y-2">
                          <h2 className="text-lg md:text-xl font-semibold text-[#30A08B]">
                            {article.nom}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {article.description}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-[#30A08B]">
                              {article.prix.toFixed(2)} F CFA
                            </span>
                            {article.prixOriginal && (
                              <span className="text-sm line-through text-gray-500">
                                {article.prixOriginal.toFixed(2)} F CFA
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex- sm:flex-row sm:justify-between justify-between gap-4 mt-4">
                          <div className="flex items-center space-x-2">
                            <button
                              className="p-2 h-10 border border-[#30A08B] rounded-md hover:bg-gray-50"
                              onClick={() => modifierQuantite(article.id, -1)}
                            >
                              <Minus className="h-4 w-4 text-[#30A08B]" />
                            </button>
                            <input
                              className="w-16 text-center border rounded-md p-1 focus:ring-2 focus:ring-[#30A08B] focus:border-transparent"
                              type="number"
                              min="1"
                              value={article.quantite}
                              onChange={(e) =>
                                modifierQuantite(
                                  article.id,
                                  parseInt(e.target.value) - article.quantite
                                )
                              }
                            />
                            <button
                              className="p-2 h-10 border border-[#30A08B] rounded-md hover:bg-gray-50"
                              onClick={() => modifierQuantite(article.id, 1)}
                            >
                              <Plus className="h-4 w-4 text-[#30A08B]" />
                            </button>
                          </div>
                          <button
                            onClick={() => supprimerArticle(article.id)}
                            className="p-2 border border-[#30A08B] rounded-full hover:bg-red-50 transition-colors"
                          >
                            <Trash2 className="h-5 w-6 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Résumé de la commande */}
            <div className="lg:sticky lg:top-20 space-y-4 h-fit">
              {/* Résumé */}
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4 space-y-4">
                <h2 className="text-lg font-bold text-[#30A08B]">
                  Résumé de la commande
                </h2>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Sous-total</span>
                    <span>{calculerSousTotal().toFixed(2)} F CFA</span>
                  </div>
                  {reduction > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Réduction</span>
                      <span>
                        -{((calculerSousTotal() * reduction) / 100).toFixed(2)} €
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Frais d'expédition</span>
                    <span>{fraisExpedition.toFixed(2)} F CFA</span>
                  </div>
                  <div className="pt-2 border-t">
                    <div className="flex justify-between font-bold text-lg text-[#30A08B]">
                      <span>Total</span>
                      <span>{calculerTotal()} F CFA</span>
                    </div>
                  </div>
                </div>

                {/* Code promo */}
                <div className="pt-4">
                  <h3 className="text-sm font-semibold text-[#30A08B] mb-2">
                    Code promo
                  </h3>
                  <div className="flex space-x-2">
                    <input
                      className="flex-grow px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#30A08B] focus:border-transparent"
                      placeholder="Entrez votre code"
                      value={codePromo}
                      onChange={(e) => setCodePromo(e.target.value)}
                    />
                    <button
                      className="px-4 py-2 bg-[#30A08B] text-white rounded-lg hover:bg-[#30A08B]/90"
                      onClick={appliquerCodePromo}
                    >
                      <Tag className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Mode d'expédition */}
                <div className="pt-4">
                  <h3 className="text-sm font-semibold text-[#30A08B] mb-2">
                    Mode d'expédition
                  </h3>
                  <select
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-[#30A08B] focus:border-transparent"
                    value={modeExpedition}
                    onChange={(e) => changerModeExpedition(e.target.value)}
                  >
                    <option value="standard">Standard (5.99 €)</option>
                    <option value="express">Express (12.99 €)</option>
                  </select>
                </div>

                {/* Newsletter et réinitialisation */}
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`relative ${
                          estAbonne ? "bg-[#30A08B]" : "border"
                        } w-5 h-5 rounded flex items-center justify-center`}
                      >
                        <input
                          type="checkbox"
                          checked={estAbonne}
                          onChange={(e) => setEstAbonne(e.target.checked)}
                          className="opacity-0 absolute w-full h-full cursor-pointer"
                        />
                        {estAbonne && (
                          <span className="text-white text-xs">&#10003;</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-700">
                        S'abonner à la newsletter
                      </span>
                    </div>
                    <button
                      className="p-2 hover:bg-gray-100 rounded-full"
                      onClick={() =>
                        setArticles(articles.map((a) => ({ ...a, quantite: 1 })))
                      }
                    >
                      <RefreshCw className="h-4 w-4 text-[#30A08B]" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
  
      {/* Bouton Commander (fixe en bas sur mobile, dans le flux sur desktop) */}
      <div className="container mx-auto px-4 py-4">
      
      {showConfirmation && <OrderConfirmation />}
  



<div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg">
        <button
          onClick={handlePayment}
          disabled={loading || paymentStatus === 'success'}
        className="w-full bg-[#30A08B] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold hover:bg-[#30A08B]/90 flex items-center justify-center space-x-2">
          {loading ? (
          <div className="flex items-center space-x-2 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="animate-spin z-1 rounded-full h-5 w-5 border-b-2 border-white "></div>
            <span>Traitement en cours...</span>
          </div>
        ): (
          <>
            <CreditCard className="h-5 w-5" />
            <span>
              {paymentStatus === 'success' 
                ? 'Commande validée'
                : `Passer la commande ${calculerSousTotal()} F CFA`
              }
            </span>
          </>
        )}
        </button>
      </div>

      <div className="hidden lg:block">
        <div className="container mx-auto px-4 py-4">
        <button
          onClick={handlePayment}
          disabled={loading || paymentStatus === 'success'}
        className="w-full bg-[#30A08B] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold hover:bg-[#30A08B]/90 flex items-center justify-center space-x-2">
          {loading ? (
          <div className="flex items-center space-x-2 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="animate-spin z-1 rounded-full h-5 w-5 border-b-2 border-white "></div>
            <span>Traitement en cours...</span>
          </div>
        ): (
          <>
            <CreditCard className="h-5 w-5" />
            <span className="text-white">
              {paymentStatus === 'success' 
                ? 'Commande validée'
                : `Passer la commande ${calculerSousTotal()} F CFA`
              }
            </span>
          </>
        )}
        </button>
        </div>
      </div>




    </div>


      
    </div>
  );
};

export default PanierPage;