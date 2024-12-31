import React from "react";
import { useNavigate } from "react-router-dom";

const OrderPaymentHandler = ({ order }) => {
  const navigate = useNavigate();

  const handlePaymentRetry = () => {
    // Créer un nouvel objet panier à partir des produits de la commande
    const cartItems = order.nbrProduits.map((item) => {
      // Trouver le produit correspondant dans les détails
      const productDetails = item.details; // Assurez-vous que ces détails sont disponibles dans votre commande

      return {
        _id: item.produitId, // Assurez-vous que cet ID est disponible dans votre commande
        ClefType: productDetails?.ClefType || "",
        Clefournisseur: productDetails?.Clefournisseur || "",
        colors: item.couleurs || [],
        dateCreating: productDetails?.dateCreating || new Date().toISOString(),
        description: productDetails?.description || "",
        fraisExpedition: productDetails?.fraisExpedition || 0,
        imageUrl: productDetails?.imageUrl || "",
        image1: productDetails?.image1 || "",
        image2: productDetails?.image2 || "",
        image3: productDetails?.image3 || "",
        marque: productDetails?.marque || "",
        name: productDetails?.name || "",
        pictures: productDetails?.pictures || [],
        price: productDetails?.price || 0,
        prix: productDetails?.prix || 0,
        prixLivraison: productDetails?.prixLivraison || 0,
        prixPromo: productDetails?.prixPromo || 0,
        prixf: productDetails?.prixf || 0,
        quantite: productDetails?.quantite || 0,
        quantity: item.quantite || 1,
        shipping: productDetails?.shipping || {
          dimensions: {
            length: 0,
            width: 0,
            height: 0,
          },
          weight: 0,
          zones: [],
        },
        sizes: item.tailles || [],
        variants: productDetails?.variants || [],
        zoneExpeditionClient: productDetails?.zoneExpeditionClient || "",
      };
    });

    // Sauvegarder le nouveau panier dans le localStorage
    localStorage.setItem("panier", JSON.stringify(cartItems));

    // Rediriger vers la page panier
    navigate("/panier");
  };

  return (
    <button
      onClick={handlePaymentRetry}
      className="px-4 py-1 text-nowrap bg-teal hover:bg-teal-600 text-white rounded-full text-xs md:text-sm transition-colors duration-200"
    >
      Faire le paiement ?
    </button>
  );
};

export default OrderPaymentHandler;
