import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Package,
  ShoppingCart,
  Tag,
  Truck,
} from "lucide-react";
import ShippingZonesDropdown from "../panier/ShippingZonesDropdown ";

const OrderedItems = ({ items, totalPrice }) => {
  const [expandedGroups, setExpandedGroups] = useState({});
  const [groupedArticles, setGroupedArticles] = useState({});
  const [articles, setArticles] = useState([]);
  const [reduction, setReduction] = useState(0);

  useEffect(() => {
    const panierItems = items?.prod || [];
    const detecterRegion = async () => {
      try {
        const region = items?.livraisonDetails.region || null;

        // Grouper les articles et calculer les frais d'expédition
        const grouped = groupArticles(panierItems);
        Object.keys(grouped).forEach((productId) => {
          const shippingFees = calculateGroupShipping(
            grouped[productId],
            region
          );
          grouped[productId] = {
            ...grouped[productId],
            ...shippingFees,
          };
        });

        setGroupedArticles(grouped);
        setArticles(panierItems);
        calculerTotal();

        // const articlesAvecFraisExpedition = calculerFraisExpedition(
        //   panierItems,
        //   region
        // );
        // setArticles(articlesAvecFraisExpedition);
        // // Calculer le total initial
        // calculerTotal();
      } catch (error) {
        // console.error("Erreur de détection de région", error);
        // setArticles(panierItems);
        // calculerTotal();
        console.error("Erreur de détection de région", error);
        const grouped = groupArticles(panierItems);
        setGroupedArticles(grouped);
        setArticles(panierItems);
        calculerTotal();
      }
    };

    detecterRegion();
  }, []);

  // Fonction pour regrouper les articles
  const groupArticles = (articlesArray) => {
    return articlesArray.reduce((groups, article) => {
      const productId = article._id;
      if (!groups[productId]) {
        groups[productId] = {
          productId,
          name: article.name,
          imageUrl: article.imageUrl,
          shipping: article.shipping,
          variants: [],
          totalQuantity: 0,
          baseShippingFee: 0,
          weightShippingFee: 0,
        };
      }

      groups[productId].variants.push(article);
      groups[productId].totalQuantity += article.quantity;
      return groups;
    }, {});
  };

  // Calculer les frais d'expédition pour un groupe
  const calculateGroupShipping = (group, region) => {
    const shippingInfo = group.shipping;
    if (
      !shippingInfo ||
      !shippingInfo.zones ||
      shippingInfo.zones.length === 0
    ) {
      return {
        baseShippingFee: 1000,
        weightShippingFee: 0,
      };
    }

    let zoneClient = shippingInfo.zones.find(
      (zone) => zone.name.toLowerCase() === region.toLowerCase()
    );

    if (!zoneClient && shippingInfo.zones.length > 0) {
      zoneClient = shippingInfo.zones[0];
    }

    if (zoneClient) {
      const baseShippingFee = zoneClient.baseFee || 0;
      let totalWeightFee = 0;

      // Calculer les frais de poids pour chaque variante
      group.variants.forEach((variant) => {
        const weightFee = shippingInfo.weight
          ? shippingInfo.weight * (zoneClient.weightFee || 0) * variant.quantity
          : 0;
        totalWeightFee += weightFee;
      });

      return {
        baseShippingFee,
        weightShippingFee: totalWeightFee,
      };
    }

    return {
      baseShippingFee: 1000,
      weightShippingFee: 0,
    };
  };

  const calculerTotalFraisExpedition = () => {
    return Object.values(groupedArticles).reduce((total, group) => {
      return total + group.baseShippingFee + group.weightShippingFee;
    }, 0);
  };

  const calculerSousTotal = () => {
    return articles.reduce(
      (total, article) => total + article.price * article.quantity,
      0
    );
  };

  const calculerTotal = () => {
    const sousTotal = calculerSousTotal();
    const totalAvecReduction = sousTotal - reduction;
    const totalFinal = totalAvecReduction + calculerTotalFraisExpedition();

    return totalFinal;
  };

  const renderArticleGroup = (group) => {
    const isExpanded = expandedGroups[group.productId];
    const totalShippingFee = group.baseShippingFee + group.weightShippingFee;

    return (
      <div
        key={group.productId}
        className="bg-white rounded-lg shadow-sm overflow-hidden mb-4"
      >
        {/* En-tête du groupe */}
        <div
          className="p-4 border-b cursor-pointer"
          onClick={() => toggleGroupExpansion(group.productId)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img
                src={group.imageUrl}
                alt={group.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-medium text-lg">{group.name}</h3>
                <p className="text-sm text-gray-500">
                  {group.variants.length} variante(s)
                </p>
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </div>
          <div className="mt-2">
            <div className="flex items-center text-sm text-gray-600">
              <Truck className="h-4 w-4 mr-2 text-[#30A08B]" />
              <span>
                Frais d'expédition de base: {group.baseShippingFee} F CFA
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Tag className="h-4 w-4 mr-2 text-[#30A08B]" />
              <span>Frais de poids total: {group.weightShippingFee} F CFA</span>
            </div>
            {/* Ajout du ShippingZonesDropdown */}
            <ShippingZonesDropdown zones={group.shipping?.zones} />
          </div>
        </div>

        {/* Liste des variantes */}
        {isExpanded && (
          <div className="p-4 space-y-4">
            {group?.variants?.map((variant, index) => (
              <div
                key={`${variant._id}-${index}`}
                className="flex items-center justify-between border-b pb-4"
              >
                {/* Image de la couleur si elle existe */}
                {variant?.imageUrl && (
                  <img
                    src={variant.imageUrl}
                    alt={`Couleur ${variant.colors[0]}`}
                    className="w-12 h-12 object-cover rounded-md border"
                  />
                )}
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 ml-3">
                      {variant.colors[0] && `Couleur: ${variant.colors[0]}`}
                    </span>
                    <span className="text-sm text-gray-600 ml-3">
                      {variant.sizes[0] && `Taille: ${variant.sizes[0]}`}
                    </span>
                    <div className="text-sm text-[#30A08B] font-medium ml-3">
                      {variant.quantity && `quantite: ${variant.quantity}`}
                    </div>
                  </div>
                  <div className="text-[#30A08B] font-medium ml-3">
                    {variant.price} F CFA
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Fonction pour gérer l'expansion/réduction des groupes
  const toggleGroupExpansion = (productId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Remplacer la section de rendu des articles par ceci dans le return
  const renderArticlesSection = () => {
    if (Object.keys(groupedArticles).length === 0) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-sm">
          <ShoppingCart className="h-12 w-12 text-[#30A08B] animate-bounce" />
          <p className="text-lg text-[#30A08B]">Votre Commande est vide</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {Object.values(groupedArticles).map((group) =>
          renderArticleGroup(group)
        )}
      </div>
    );
  };

  return (
    <div className="mb-8">
      <h2 className="font-semibold text-lg mb-4">Articles commandés</h2>
      {/* <div className="space-y-4">
        {items?.prod?.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-medium text-lg text-gray-800">
                  {item.produit}
                </h3>
                <p className="text-sm text-gray-500">
                  Quantité: {item.quantite}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3 border-t pt-3">
              {item.tailles && item.tailles.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Tailles sélectionnées
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item?.tailles?.map((taille, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {taille}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {item.couleurs && item.couleurs.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-1">
                    Couleurs sélectionnées
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item?.couleurs?.map((couleur, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                      >
                        {couleur}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div> */}

      {renderArticlesSection()}
      <div className="mt-6 flex justify-between items-center bg-white rounded-lg shadow p-4">
        <span className="text-gray-600 font-medium">Total de la commande</span>
        <span className="text-xl font-semibold text-gray-800">
          {totalPrice} F CFA
        </span>
      </div>
    </div>
  );
};

export default OrderedItems;
