import React, { useState, useEffect } from "react";
import {
  Trash2,
  Plus,
  Minus,
  RefreshCw,
  ShoppingCart,
  CreditCard,
  Tag,
  Truck,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ShippingZonesDropdown from "./ShippingZonesDropdown ";
import Alert from "../../pages/Alert";

// const BackendUrl = process.env.REACT_APP_Backend_Url;
const BackendUrl = process.env.REACT_APP_Backend_Url;
// alert(BackendUrl);

const PanierPage = ({
  total,
  setTotal,
  codeP,
  setCodeP,
  onPaymentComplete,
  acces,
  panierchg,
}) => {
  const [articles, setArticles] = useState([]);
  const [codePromo, setCodePromo] = useState("");
  const [reduction, setReduction] = useState(0);
  const [estAbonne, setEstAbonne] = useState(false);
  const [message, setMessage] = useState("");
  const [regionClient, setRegionClient] = useState("Niamey");
  const [pays, setPays] = useState("Niger");
  const [rond, setRond] = useState(false);
  const [groupedArticles, setGroupedArticles] = useState({});
  const [expandedGroups, setExpandedGroups] = useState({});
  const [alert, setAlert] = useState({
    visible: false,
    type: "",
    message: "ds",
  });
  const navigation = useNavigate();

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

  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
    setTimeout(() => {
      setAlert({ visible: false, type: "", message: "" });
    }, 5000); // 3 secondes
  };
  const handleSuccess = (message) => {
    showAlert("success", message);
  };

  const handleWarning = (message) => {
    showAlert("warn", message);
  };
  // Charger les articles du localStorage au montage du composant

  // Fonction de détection et calcul des frais d'expédition
  const calculerFraisExpedition = (articles, regionClient) => {
    // Regrouper les articles par ID et caractéristiques
    const articlesParId = articles.reduce((acc, article) => {
      const key = `${article._id}-${article.colors[0]}-${article.sizes[0]}`;
      if (!acc[key]) {
        acc[key] = {
          articles: [],
          shippingInfo: null,
          totalQuantity: 0,
        };
      }
      acc[key].articles.push(article);
      acc[key].totalQuantity += article.quantity;

      // Conserver les informations de livraison du premier article avec des informations complètes
      if (
        !acc[key].shippingInfo &&
        article.shipping &&
        article.shipping.zones &&
        article.shipping.zones.length > 0
      ) {
        acc[key].shippingInfo = article.shipping;
      }

      return acc;
    }, {});

    // Calculer les frais d'expédition pour chaque groupe d'articles
    const articlesAvecFraisExpedition = articles.map((article) => {
      const key = `${article._id}-${article.colors[0]}-${article.sizes[0]}`;
      const groupeArticle = articlesParId[key];
      const shippingInfo = groupeArticle.shippingInfo;

      // Si pas d'informations de livraison, utiliser un montant par défaut
      if (
        !shippingInfo ||
        !shippingInfo.zones ||
        shippingInfo.zones.length === 0
      ) {
        return {
          ...article,
          fraisExpedition: 1000,
        };
      }

      // Trouver la zone correspondant à la région du client
      let zoneClient = shippingInfo.zones.find((zone) =>
        zone.name.toLowerCase() === regionClient.toLowerCase()
          ? regionClient.toLowerCase()
          : "niamey"
      );

      // Si aucune zone ne correspond, utiliser la première zone
      if (!zoneClient && shippingInfo.zones.length > 0) {
        zoneClient = shippingInfo.zones[0];
      }

      // Calculer les frais d'expédition
      if (zoneClient) {
        const fraisBase = zoneClient.baseFee || 0;
        const fraisPoids = shippingInfo.weight
          ? fraisBase +
            shippingInfo.weight * (zoneClient.weightFee || 0) * article.quantity
          : fraisBase;

        return {
          ...article,
          fraisExpedition: fraisPoids,
          zoneExpeditionClient: regionClient,
        };
      }

      // Fallback si aucune zone n'est trouvée
      return {
        ...article,
        fraisExpedition: 1000,
      };
    });

    return articlesAvecFraisExpedition;
  };

  useEffect(() => {
    const panierItems = JSON.parse(localStorage.getItem("panier")) || [];
    const detecterRegion = async () => {
      try {
        // const response = await axios.get("https://ipapi.co/json/");
        const response = await axios.get(`${BackendUrl}/proxy/ip-api`);
        // const region = response.data.region || "Niamey";
        // const pays = response.data.country_name || "Niger";
        const region = response.data.regionName || "Niamey";
        const pays = response.data.country || "Niger";
        setRegionClient(region.toLowerCase());
        setPays(pays);

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

  // Fonction pour gérer l'expansion/réduction des groupes
  const toggleGroupExpansion = (productId) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Calculer le total des frais d'expédition
  // const calculerTotalFraisExpedition = () => {
  //   return articles.reduce(
  //     (total, article) => total + (article.fraisExpedition || 0),
  //     0
  //   );
  // };

  // const calculerTotal = () => {
  //   const sousTotal = calculerSousTotal();
  //   const totalAvecReduction = sousTotal - reduction;
  //   const totalFinal = totalAvecReduction + calculerTotalFraisExpedition();
  //   setTotal(totalFinal);
  //   // Sauvegarder dans localStorage
  //   localStorage.setItem("orderTotal", totalFinal.toString());
  //   return totalFinal;
  // };

  // Modification de la quantité avec mise à jour des frais d'expédition
  // const modifierQuantite = (id, colors, sizes, delta) => {
  //   setArticles((prevArticles) => {
  //     const updatedArticles = prevArticles.map((article) => {
  //       // Vérifier si l'article correspond à l'ID, à la couleur et à la taille
  //       if (
  //         article._id === id &&
  //         article.colors[0] === colors[0] &&
  //         article.sizes[0] === sizes[0]
  //       ) {
  //         // Mettre à jour la quantité (minimum 1)
  //         const nouvelleQuantite = Math.max(1, article.quantity + delta);

  //         return { ...article, quantity: nouvelleQuantite };
  //       }
  //       return article;
  //     });

  //     // Recalculer les frais d'expédition
  //     const articlesAvecFraisExpedition = calculerFraisExpedition(
  //       updatedArticles,
  //       regionClient || "Niamey" // Utiliser une valeur par défaut si regionClient est null
  //     );

  //     // Mettre à jour le localStorage
  //     localStorage.setItem(
  //       "panier",
  //       JSON.stringify(articlesAvecFraisExpedition)
  //     );

  //     return articlesAvecFraisExpedition;
  //   });
  // };

  const supprimerArticle = (id, colors, sizes) => {
    // Filtrer pour supprimer l'article spécifique avec ses détails

    const updatedArticles = articles.filter(
      (article) =>
        !(
          article._id === id &&
          article.colors[0] === colors[0] &&
          article.sizes[0] === sizes[0]
        )
    );

    // Mettre à jour l'état et le localStorage
    setArticles(updatedArticles);
    localStorage.setItem("panier", JSON.stringify(updatedArticles));

    // Mettre à jour groupedArticles
    const newGrouped = groupArticles(updatedArticles);

    setGroupedArticles(newGrouped);
    panierchg();
    setMessage("Article supprimé avec succès !");
  };

  // const calculerSousTotal = () => {
  //   return articles.reduce(
  //     (total, article) => total + article.price * article.quantity,
  //     0
  //   );
  // };

  const ValidCode = () => {
    if (acces === "non") {
      handleWarning("Veuiller Vous connecter d'abord");
      setTimeout(() => {
        navigation("/Connexion");
      }, 500);
      return;
    }
    if (codePromo.length === 0) {
      handleWarning("code invalide.");
      return;
    }
    setRond(true);

    axios
      .get(`${BackendUrl}/getCodePromoByHashedCode`, {
        params: {
          hashedCode: codePromo,
        },
      })
      .then((code) => {
        setRond(false);
        if (code.data.data.isValide) {
          setReduction(code.data.data?.prixReduiction);
          setCodeP(code.data.data);
          // Sauvegarder le code promo dans localStorage
          localStorage.setItem("orderCodeP", JSON.stringify(code.data.data));
          setMessage("Code promo appliqué avec succès !");
          // Recalculer le total après application du code promo
          calculerTotal();
        } else {
          handleWarning("ce code la a expire.");
          setReduction(0);
          localStorage.removeItem("orderCodeP");
          calculerTotal();
        }
      })
      .catch((error) => {
        console.error(error);
        handleWarning("ce code de promo n'exite pas");
        setReduction(0);
        localStorage.removeItem("orderCodeP");
        calculerTotal();
        setRond(false);
      });
  };

  const spinnerStyle = {
    border: "4px solid rgba(0, 0, 0, 0.1)",
    borderTop: "4px solid #FFF",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    animation: "spin 1s linear infinite",
    margin: "auto",
  };

  // Rendu du groupe d'articles
  // Modification du rendu du groupe d'articles pour inclure ShippingZonesDropdown
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
            {group.variants.map((variant, index) => (
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
                  </div>
                  <div className="text-[#30A08B] font-medium ml-3">
                    {variant.price} F CFA
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      className="p-1 border border-[#30A08B] rounded-md hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        modifierQuantite(
                          variant._id,
                          variant.colors,
                          variant.sizes,
                          -1
                        );
                      }}
                    >
                      <Minus className="h-4 w-4 text-[#30A08B]" />
                    </button>
                    <input
                      className="w-16 text-center border rounded-md p-1"
                      type="number"
                      min="1"
                      value={variant.quantity}
                      onChange={(e) => {
                        e.stopPropagation();
                        const newQuantity = parseInt(e.target.value) || 1;
                        modifierQuantite(
                          variant._id,
                          variant.colors,
                          variant.sizes,
                          newQuantity - variant.quantity
                        );
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                    <button
                      className="p-1 border border-[#30A08B] rounded-md hover:bg-gray-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        modifierQuantite(
                          variant._id,
                          variant.colors,
                          variant.sizes,
                          1
                        );
                      }}
                    >
                      <Plus className="h-4 w-4 text-[#30A08B]" />
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      supprimerArticle(
                        variant._id,
                        variant.colors,
                        variant.sizes
                      );
                    }}
                    className="p-2 border border-[#30A08B] rounded-full hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Remplacer la section de rendu des articles par ceci dans le return
  const renderArticlesSection = () => {
    if (Object.keys(groupedArticles).length === 0) {
      return (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-sm">
          <ShoppingCart className="h-12 w-12 text-[#30A08B] animate-bounce" />
          <p className="text-lg text-[#30A08B]">Votre panier est vide</p>
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

  // Mettre à jour les autres fonctions existantes pour prendre en compte le groupement
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
    setTotal(totalFinal);
    localStorage.setItem("orderTotal", totalFinal.toString());
    return totalFinal;
  };

  // Modification de la fonction de mise à jour de la quantité
  const modifierQuantite = (id, colors, sizes, delta) => {
    setArticles((prevArticles) => {
      const updatedArticles = prevArticles.map((article) => {
        if (
          article._id === id &&
          article.colors[0] === colors[0] &&
          article.sizes[0] === sizes[0]
        ) {
          const nouvelleQuantite = Math.max(1, article.quantity + delta);
          return { ...article, quantity: nouvelleQuantite };
        }
        return article;
      });

      // Mettre à jour le localStorage
      localStorage.setItem("panier", JSON.stringify(updatedArticles));

      // Mettre à jour groupedArticles
      const newGrouped = groupArticles(updatedArticles);
      Object.keys(newGrouped).forEach((productId) => {
        const shippingFees = calculateGroupShipping(
          newGrouped[productId],
          regionClient || "Niamey"
        );
        newGrouped[productId] = {
          ...newGrouped[productId],
          ...shippingFees,
        };
      });
      setGroupedArticles(newGrouped);

      return updatedArticles;
    });
  };

  // Ajoutez cette fonction pour générer le résumé des modes d'expédition
  const renderShippingModes = () => {
    // Regrouper les transporteurs par groupe de produits
    const shippingInfo = Object.values(groupedArticles).map((group) => {
      const zone = group.shipping?.zones?.find(
        (zone) => zone.name.toLowerCase() === regionClient?.toLowerCase()
      );

      return {
        productName: group.name,
        transporteurName: zone?.transporteurName || "IhamBaobab",
        transporteurContact: zone?.transporteurContact || "+227 87727501",
      };
    });

    return (
      <div className="pt-4">
        <h3 className="text-sm font-semibold text-[#30A08B] mb-2">
          Mode d'expédition
        </h3>
        <div className="space-y-2 bg-gray-50 p-3 rounded-md">
          {shippingInfo.map((info, index) => (
            <div key={index} className="text-sm">
              <span className="font-medium">{info.productName}</span>
              <div className="ml-2 text-gray-600">
                Transporteur: {info.transporteurName}
                <br />
                Contact: {info.transporteurContact}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
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
              {renderArticlesSection()}
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
                    <span>{calculerSousTotal()} F CFA</span>
                  </div>
                  {reduction > 0 && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Réduction</span>
                      <span>-{reduction} F cfa</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Frais d'expédition total</span>
                    <span>{calculerTotalFraisExpedition()} F CFA</span>
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
                      onClick={ValidCode}
                    >
                      {rond ? (
                        <div style={spinnerStyle}></div>
                      ) : (
                        <Tag className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Mode d'expédition */}
                {/* <div className="pt-4">
                  <h3 className="text-sm font-semibold text-[#30A08B] mb-2">
                    Mode d'expédition
                  </h3>

                  {articles?.map((article, index) => {
                    const transporteurName = article.shipping?.zones.find(
                      (item) => item.name.toLowerCase() === regionClient
                    )?.transporteurName;
                    const transporteurContact = article.shipping?.zones.find(
                      (item) => item.name.toLowerCase() === regionClient
                    )?.transporteurContact;
                    if (transporteurName && transporteurContact) {
                      return (
                        <div key={index}>
                          {article.name} ({transporteurName} :{" "}
                          {transporteurContact})
                        </div>
                      );
                    } else {
                      return (
                        <div key={index}>
                          {article.name} (IhamBaobab : +227 87727501)
                        </div>
                      );
                    }
                  })}
                </div> */}
                {renderShippingModes()}

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
                        setArticles(
                          articles.map((a) => ({ ...a, quantite: 1 }))
                        )
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
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg">
          {calculerTotal() !== 0 ? (
            <button
              onClick={() => {
                if (calculerTotal() === 0) {
                  return;
                }
                if (acces === "non") {
                  handleWarning("Veuiller Vous connecter d'abord");
                  setTimeout(() => {
                    navigation("/OrderConfirmation");
                  }, 1000);
                } else {
                  navigation("/OrderConfirmation");
                }
              }}
              // onClick={handlePayment}
              // disabled={loading || paymentStatus === "success"}
              className="w-full bg-[#30A08B] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold hover:bg-[#30A08B]/90 flex items-center justify-center space-x-2"
            >
              Passer la commande {calculerTotal()} F CFA
              {/* {loading ? (
              <div className="flex items-center space-x-2 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="animate-spin z-1 rounded-full h-5 w-5 border-b-2 border-white "></div>
                <span>Traitement en cours...</span>
              </div>
            ) : (
              <></>
            )} */}
            </button>
          ) : (
            <></>
          )}
        </div>
        <div className="hidden lg:block">
          <div className="container mx-auto px-4 py-4">
            {calculerTotal() !== 0 ? (
              <button
                onClick={() => {
                  if (calculerTotal() === 0) {
                    return;
                  }
                  if (acces === "non") {
                    handleWarning("Veuiller Vous connecter d'abord");
                    setTimeout(() => {
                      navigation("/OrderConfirmation");
                    }, 1000);
                  } else {
                    navigation("/OrderConfirmation");
                  }
                }}
                // onClick={handlePayment}
                // disabled={loading || paymentStatus === "success"}
                className="w-full bg-[#30A08B] disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold hover:bg-[#30A08B]/90 flex items-center justify-center space-x-2"
              >
                Passer la commande {calculerTotal()} F CFA
              </button>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      {alert.visible && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ visible: false })}
        />
      )}
    </div>
  );
};

export default PanierPage;
