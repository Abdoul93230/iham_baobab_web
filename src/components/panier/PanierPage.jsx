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
  Store,
  MapPin,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ZoneSelector from "./ZoneSelector";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { formatCurrency } from "../../lib/utils";
import Alert from "../../pages/Alert";

const BackendUrl = process.env.REACT_APP_Backend_Url;

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
  const [selectedZone, setSelectedZone] = useState(null);
  const [rond, setRond] = useState(false);
  const [groupedByStore, setGroupedByStore] = useState({});
  const [expandedStores, setExpandedStores] = useState({});
  const [expandedProducts, setExpandedProducts] = useState({});
  const [loading, setLoading] = useState(false);
  const [shippingCalculations, setShippingCalculations] = useState({});
  const [unavailableProducts, setUnavailableProducts] = useState(new Set());
  const [alert, setAlert] = useState({
    visible: false,
    type: "",
    message: "",
  });

  const navigation = useNavigate();
  const DATA_Products = useSelector((state) => state.products.data);

  // Fonction pour regrouper les articles par boutique puis par produit
  const groupArticlesByStore = (articlesArray) => {
    console.log({articlesArray});
    
    return articlesArray.reduce((storeGroups, article) => {
      const storeId = article.Clefournisseur._id;
      const storeName = article.Clefournisseur.storeName;
      const productId = article._id;
      // console.log({article});
      // Créer le groupe boutique s'il n'existe pas
      if (!storeGroups[storeId]) {
        storeGroups[storeId] = {
          storeId,
          storeName,
          storeInfo: article.Clefournisseur,
          products: {},
          totalWeight: 0,
          totalValue: 0,
          shippingCost: 0,
          isAvailable: true,
        };
      }

      // Créer le groupe produit s'il n'existe pas
      if (!storeGroups[storeId].products[productId]) {
        storeGroups[storeId].products[productId] = {
          productId,
          name: article.name,
          imageUrl: article.image1,
          variants: [],
          totalQuantity: 0,
          totalValue: 0,
          totalWeight: 0,
        };
      }

      // Ajouter la variante au produit
      storeGroups[storeId].products[productId].variants.push(article);
      storeGroups[storeId].products[productId].totalQuantity += article.quantity;
      storeGroups[storeId].products[productId].totalValue += 
        (article.prixPromo || article.prix || article.price) * article.quantity;

      // Calculer le poids (estimation basée sur les dimensions ou poids par défaut)
      const estimatedWeight = calculateProductWeight(article) * article.quantity;
      storeGroups[storeId].products[productId].totalWeight += estimatedWeight;
      storeGroups[storeId].totalWeight += estimatedWeight;
      storeGroups[storeId].totalValue += 
        (article.prixPromo || article.prix || article.price) * article.quantity;

      return storeGroups;
    }, {});
  };

  // Fonction pour estimer le poids d'un produit
  const calculateProductWeight = (article) => {
    // Si le produit a des dimensions, calculer un poids estimé
    if (article.shipping?.dimensions) {
      const { length, width, height } = article.shipping.dimensions;
      if (length && width && height) {
        // Estimation basée sur le volume (densité moyenne de 0.5 kg/dm³)
        const volume = (length * width * height) / 1000; // cm³ vers dm³
        return Math.max(0.1, volume * 0.5); // Minimum 100g
      }
    }
    
    // Poids par défaut selon la catégorie
    const categoryWeights = {
      'mode': 0.5,
      'electronique': 1.5,
      'maison': 2.0,
      'sport': 1.0,
    };
    
    const category = article.ClefType || 'mode';
    return categoryWeights[category] || 0.5; // 500g par défaut
  };

  // Fonction pour calculer les frais d'expédition via l'API
  const calculateShippingForStore = async (storeId, storeInfo, totalWeight, customerZoneId) => {
    try {
      const response = await axios.post(`${BackendUrl}/api/shipping2/calculate`, {
        sellerId: storeId,
        customerZoneId: customerZoneId,
        weight: totalWeight
      });

      return {
        success: true,
        ...response.data.data
      };
    } catch (error) {
      console.error(`Erreur calcul expédition pour ${storeInfo.storeName}:`, error);
      
      // Si l'API échoue, utiliser l'ancien système comme fallback
      return {
        success: false,
        fixedCost: 1000,
        costPerKg: 500,
        totalCost: 1000 + (500 * totalWeight),
        appliedPolicy: {
          zone: 'Politique par défaut',
          type: 'fallback'
        }
      };
    }
  };

  // Fonction pour recalculer tous les frais d'expédition
  const recalculateAllShipping = async (grouped, customerZone) => {
    if (!customerZone) return;

    const calculations = {};
    const unavailable = new Set();

    for (const [storeId, storeGroup] of Object.entries(grouped)) {
      try {
        const shippingResult = await calculateShippingForStore(
          storeId,
          storeGroup.storeInfo,
          storeGroup.totalWeight,
          customerZone._id
        );

        calculations[storeId] = shippingResult;
        
        // Si le calcul échoue complètement, marquer les produits comme indisponibles
        if (!shippingResult.success && shippingResult.totalCost === 0) {
          Object.keys(storeGroup.products).forEach(productId => {
            unavailable.add(`${storeId}-${productId}`);
          });
        }
      } catch (error) {
        console.error(`Erreur pour la boutique ${storeGroup.storeName}:`, error);
        // Marquer tous les produits de cette boutique comme indisponibles
        Object.keys(storeGroup.products).forEach(productId => {
          unavailable.add(`${storeId}-${productId}`);
        });
      }
    }

    setShippingCalculations(calculations);
    setUnavailableProducts(unavailable);
  };

  const showAlert = (type, message) => {
    setAlert({ visible: true, type, message });
    setTimeout(() => {
      setAlert({ visible: false, type: "", message: "" });
    }, 5000);
  };

  const handleSuccess = (message) => {
    showAlert("success", message);
  };

  const handleWarning = (message) => {
    showAlert("warn", message);
  };

  // Charger les articles et détecter la zone du client
  useEffect(() => {
    const panierItems = JSON.parse(localStorage.getItem("panier")) || [];
    
    const detecterZoneClient = async () => {
      setLoading(true);
      try {
        // Détecter la localisation du client
        const response = await axios.get(`${BackendUrl}/proxy/ip-api`);
        const region = response.data.regionName || "Niamey";
        const country = response.data.country || "Niger";

        // Rechercher la zone correspondante dans votre système
        const zoneResponse = await axios.get(`${BackendUrl}/api/shipping2/zones/search`, {
          params: { q: region, limit: 1 }
        });

        let detectedZone = null;
        if (zoneResponse.data.success && zoneResponse.data.data.length > 0) {
          detectedZone = zoneResponse.data.data[0];
        } else {
          // Fallback: chercher par pays
          const countryResponse = await axios.get(`${BackendUrl}/api/shipping2/zones/search`, {
            params: { q: country, limit: 1 }
          });
          if (countryResponse.data.success && countryResponse.data.data.length > 0) {
            detectedZone = countryResponse.data.data[0];
          }
        }

        setSelectedZone(detectedZone);

        // Grouper les articles par boutique
        const grouped = groupArticlesByStore(panierItems);
        setGroupedByStore(grouped);
        setArticles(panierItems);

        // Calculer les frais d'expédition si une zone est détectée
        if (detectedZone) {
          await recalculateAllShipping(grouped, detectedZone);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur de détection de zone", error);
        setLoading(false);
        
        // Fallback: grouper sans calcul d'expédition
        const grouped = groupArticlesByStore(panierItems);
        setGroupedByStore(grouped);
        setArticles(panierItems);
      }
    };

    detecterZoneClient();
  }, []);

  // Recalculer quand la zone change
  useEffect(() => {
    if (selectedZone && Object.keys(groupedByStore).length > 0) {
      recalculateAllShipping(groupedByStore, selectedZone);
    }
  }, [selectedZone]);

  // Fonction pour gérer l'expansion des groupes
  const toggleStoreExpansion = (storeId) => {
    setExpandedStores((prev) => ({
      ...prev,
      [storeId]: !prev[storeId],
    }));
  };

  const toggleProductExpansion = (storeId, productId) => {
    const key = `${storeId}-${productId}`;
    setExpandedProducts((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const supprimerArticle = (id, colors, sizes) => {
    const updatedArticles = articles.filter(
      (article) =>
        !(
          article._id === id &&
          article.colors[0] === colors[0] &&
          article.sizes[0] === sizes[0]
        )
    );

    setArticles(updatedArticles);
    localStorage.setItem("panier", JSON.stringify(updatedArticles));

    // Regrouper à nouveau
    const newGrouped = groupArticlesByStore(updatedArticles);
    setGroupedByStore(newGrouped);
    
    // Recalculer les frais d'expédition
    if (selectedZone) {
      recalculateAllShipping(newGrouped, selectedZone);
    }
    
    panierchg();
    setMessage("Article supprimé avec succès !");
  };

  const getArticleStock = (article) => {
    const originalProduct = DATA_Products.find(p => p._id === article._id);
    if (!originalProduct) return 0;

    if (originalProduct.variants && originalProduct.variants.length > 0) {
      const variant = originalProduct.variants.find(v =>
        v.color === article.colors[0]
      );
      return variant ? variant.stock || 0 : 0;
    }

    return originalProduct.quantite || 0;
  };

  const modifierQuantite = (id, colors, sizes, delta) => {
    setArticles((prevArticles) => {
      const updatedArticles = prevArticles.map((article) => {
        if (
          article._id === id &&
          article.colors[0] === colors[0] &&
          article.sizes[0] === sizes[0]
        ) {
          if (delta < 0) {
            const nouvelleQuantite = Math.max(1, article.quantity + delta);
            return { ...article, quantity: nouvelleQuantite };
          }

          if (delta > 0) {
            const availableStock = getArticleStock(article);
            if (article.quantity >= availableStock) {
              console.warn(`Stock insuffisant. Maximum disponible: ${availableStock}`);
              return article;
            }
            const nouvelleQuantite = Math.min(availableStock, article.quantity + delta);
            return { ...article, quantity: nouvelleQuantite };
          }
        }
        return article;
      });

      localStorage.setItem("panier", JSON.stringify(updatedArticles));

      // Regrouper à nouveau
      const newGrouped = groupArticlesByStore(updatedArticles);
      setGroupedByStore(newGrouped);
      
      // Recalculer les frais d'expédition
      if (selectedZone) {
        recalculateAllShipping(newGrouped, selectedZone);
      }

      return updatedArticles;
    });
  };

  const ValidCode = () => {
    if (acces === "non") {
      handleWarning("Veuillez vous connecter d'abord");
      setTimeout(() => {
        navigation("/Connexion?fromCart=true");
      }, 500);
      return;
    }
    if (codePromo.length === 0) {
      handleWarning("Code invalide.");
      return;
    }
    setRond(true);
    const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;
    axios
      .get(`${BackendUrl}/getCodePromoByHashedCode`, {
        params: {
          hashedCode: codePromo,
          welcom: codePromo === "BIENVENUE20" ? true : false,
          id: userId,
        },
      })
      .then((code) => {
        setRond(false);

        if (code.data.data.isValide) {
          if (!codeP || codeP.code !== code.data.data.code) {
            if (code.data.data?.isWelcomeCode === true) {
              let reduction =
                (calculerTotal() * code.data.data?.prixReduiction) / 100;
              reduction = Math.min(reduction, 2000);
              setReduction(reduction);
            } else {
              setReduction(code.data.data?.prixReduiction);
            }

            setCodeP(code.data.data);
            localStorage.setItem("orderCodeP", JSON.stringify(code.data.data));
            setMessage("Code promo appliqué avec succès !");
            setTimeout(() => calculerTotal(), 100);
          } else {
            setMessage("Ce code promo est déjà appliqué.");
          }
        } else {
          handleWarning("Ce code a expiré.");
          setReduction(0);
          localStorage.removeItem("orderCodeP");
          calculerTotal();
        }
      })
      .catch((error) => {
        console.error(error);
        handleWarning("Ce code promo n'existe pas");
        setReduction(0);
        localStorage.removeItem("orderCodeP");
        calculerTotal();
        setRond(false);
      });
  };

  // Calculer les totaux
  const calculerSousTotal = () => {
    return articles.reduce(
      (total, article) => total + (article.prixPromo || article.prix || article.price) * article.quantity,
      0
    );
  };

  const calculerTotalFraisExpedition = () => {
    return Object.values(shippingCalculations).reduce((total, calc) => {
      return total + (calc.totalCost || 0);
    }, 0);
  };

  const calculerTotal = () => {
    const sousTotal = calculerSousTotal();
    const totalAvecReduction = sousTotal - reduction;
    const totalFinal = totalAvecReduction + calculerTotalFraisExpedition();
    setTotal(totalFinal);
    localStorage.setItem("orderTotal", totalFinal.toString());
    return totalFinal;
  };

  // Rendu d'une variante de produit
  const renderVariant = (variant, storeId, productId) => {
    const isUnavailable = unavailableProducts.has(`${storeId}-${productId}`);
    
    return (
      <div
        key={`${variant._id}-${variant.colors[0]}-${variant.sizes[0]}`}
        className={`flex items-center justify-between border-b pb-4 ${
          isUnavailable ? 'opacity-50' : ''
        }`}
      >
        {variant?.imageUrl && (
          <img
            src={variant.imageUrl}
            alt={`Couleur ${variant.colors[0]}`}
            className="w-12 h-12 object-cover rounded-md border"
          />
        )}
        
        <div className="flex-1 ml-3">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {variant.colors[0] && `Couleur: ${variant.colors[0]}`}
            </span>
            <span className="text-sm text-gray-600">
              {variant.sizes[0] && `Taille: ${variant.sizes[0]}`}
            </span>
            {isUnavailable && (
              <Badge variant="destructive" className="text-xs">
                Non disponible
              </Badge>
            )}
          </div>
          
          {variant.prixPromo ? (
            <>
              <div className="line-through text-red-500 font-medium">
                {formatCurrency(variant.prix)}
              </div>
              <div className="text-[#30A08B] font-medium">
                {formatCurrency(variant.prixPromo)}
              </div>
            </>
          ) : (
            <div className="text-[#30A08B] font-medium">
              {formatCurrency(variant.price || variant.prix)}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <button
              className="p-1 border border-[#30A08B] rounded-md hover:bg-gray-50"
              onClick={() => modifierQuantite(variant._id, variant.colors, variant.sizes, -1)}
              disabled={isUnavailable}
            >
              <Minus className="h-4 w-4 text-[#30A08B]" />
            </button>

            <input
              className="w-16 text-center border rounded-md p-1"
              type="number"
              min="1"
              max={getArticleStock(variant)}
              value={variant.quantity}
              onChange={(e) => {
                const newQuantity = parseInt(e.target.value) || 1;
                const stockDisponible = getArticleStock(variant);

                if (newQuantity > stockDisponible) {
                  console.warn(`Stock insuffisant. Maximum disponible: ${stockDisponible}`);
                  return;
                }

                modifierQuantite(
                  variant._id,
                  variant.colors,
                  variant.sizes,
                  newQuantity - variant.quantity
                );
              }}
              disabled={isUnavailable}
            />

            <button
              className={`p-1 border border-[#30A08B] rounded-md ${
                variant.quantity >= getArticleStock(variant) || isUnavailable
                  ? 'opacity-50 cursor-not-allowed bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
              disabled={variant.quantity >= getArticleStock(variant) || isUnavailable}
              onClick={() => {
                if (variant.quantity < getArticleStock(variant)) {
                  modifierQuantite(variant._id, variant.colors, variant.sizes, 1);
                }
              }}
            >
              <Plus className="h-4 w-4 text-[#30A08B]" />
            </button>
          </div>

          <div className="text-sm">
            <span className={`${
              getArticleStock(variant) > 5 ? 'text-green-600' :
              getArticleStock(variant) > 0 ? 'text-orange-600' : 'text-red-600'
            }`}>
              Stock: {getArticleStock(variant)}
            </span>
          </div>

          <button
            onClick={() => supprimerArticle(variant._id, variant.colors, variant.sizes)}
            className="p-2 border border-[#30A08B] rounded-full hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </button>
        </div>
      </div>
    );
  };

  // Rendu d'un groupe de produits
  const renderProductGroup = (product, storeId) => {
    const isExpanded = expandedProducts[`${storeId}-${product.productId}`];
    const isUnavailable = unavailableProducts.has(`${storeId}-${product.productId}`);

    return (
      <div key={product.productId} className="border rounded-lg overflow-hidden mb-3">
        <div
          className={`p-3 cursor-pointer hover:bg-gray-50 ${
            isUnavailable ? 'bg-red-50' : 'bg-white'
          }`}
          onClick={() => toggleProductExpansion(storeId, product.productId)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div>
                <h4 className="font-medium">{product.name}</h4>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span>{product.variants.length} variante(s)</span>
                  <span>•</span>
                  <span>Poids: {product.totalWeight.toFixed(2)} kg</span>
                  {isUnavailable && (
                    <>
                      <span>•</span>
                      <Badge variant="destructive" className="text-xs">
                        Non livrable
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-medium">{formatCurrency(product.totalValue)}</span>
              {isExpanded ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>
          </div>
        </div>

        {isExpanded && (
          <div className="p-3 bg-gray-50 space-y-3">
            {product.variants.map((variant) => 
              renderVariant(variant, storeId, product.productId)
            )}
          </div>
        )}
      </div>
    );
  };

  // Rendu d'un groupe boutique
  const renderStoreGroup = (storeGroup) => {
    const isExpanded = expandedStores[storeGroup.storeId];
    const shippingCalc = shippingCalculations[storeGroup.storeId];
    const hasUnavailableProducts = Object.keys(storeGroup.products).some(productId =>
      unavailableProducts.has(`${storeGroup.storeId}-${productId}`)
    );

    return (
      <Card key={storeGroup.storeId} className="mb-6">
        <CardHeader 
          className={`cursor-pointer hover:bg-gray-50 ${
            hasUnavailableProducts ? 'bg-red-50' : ''
          }`}
          onClick={() => toggleStoreExpansion(storeGroup.storeId)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-[#30A08B] rounded-lg flex items-center justify-center">
                {storeGroup.storeInfo.logo ? (
                  <img
                    src={storeGroup.storeInfo.logo}
                    alt={storeGroup.storeName}
                    className="w-10 h-10 object-cover rounded"
                  />
                ) : (
                  <Store className="h-6 w-6 text-white" />
                )}
              </div>
              <div>
                <CardTitle className="text-lg">{storeGroup.storeName}</CardTitle>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  <span>{storeGroup.storeInfo.city}, {storeGroup.storeInfo.region}</span>
                  <span>•</span>
                  <span>{Object.keys(storeGroup.products).length} produit(s)</span>
                  <span>•</span>
                  <span>{storeGroup.totalWeight.toFixed(2)} kg</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {hasUnavailableProducts && (
                <Badge variant="destructive">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Livraison limitée
                </Badge>
              )}
              
              {shippingCalc && (
                <div className="text-right">
                  <div className="font-medium text-[#30A08B]">
                    {formatCurrency(shippingCalc.totalCost)}
                  </div>
                  <div className="text-xs text-gray-500">Expédition</div>
                </div>
              )}
              
              {isExpanded ? (
                <ChevronUp className="w-6 h-6" />
              ) : (
                <ChevronDown className="w-6 h-6" />
              )}
            </div>
          </div>
        </CardHeader>

        {isExpanded && (
          <CardContent className="pt-0">
            {/* Informations d'expédition */}
            {shippingCalc && (
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-800">Détails d'expédition</h4>
                  {shippingCalc.success ? (
                    <Badge variant="success">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Disponible
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Politique par défaut
                    </Badge>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Coût fixe:</span>
                    <span className="ml-2 font-medium">{formatCurrency(shippingCalc.fixedCost)}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Coût poids:</span>
                    <span className="ml-2 font-medium">{formatCurrency(shippingCalc.weightCost || 0)}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-gray-600">Politique appliquée:</span>
                    <span className="ml-2 font-medium">{shippingCalc.appliedPolicy?.zone}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Liste des produits */}
            <div className="space-y-3">
              {Object.values(storeGroup.products).map((product) =>
                renderProductGroup(product, storeGroup.storeId)
              )}
            </div>
          </CardContent>
        )}
      </Card>
    );
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

        {/* Sélecteur de zone de livraison */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              Zone de livraison
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ZoneSelector
                selectedZone={selectedZone}
                onSelect={setSelectedZone}
                placeholder="Sélectionner votre zone de livraison..."
                className="w-full"
              />
              {selectedZone && (
                <div className="text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
                  <CheckCircle className="h-4 w-4 inline mr-2 text-green-600" />
                  Livraison vers: <strong>{selectedZone.fullPath || selectedZone.name}</strong>
                </div>
              )}
              {!selectedZone && (
                <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                  <AlertTriangle className="h-4 w-4 inline mr-2" />
                  Veuillez sélectionner votre zone pour calculer les frais d'expédition
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {articles.length === 0 ? (
          loading ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-sm">
              <ShoppingCart className="h-12 w-12 text-[#30A08B] animate-bounce" />
              <p className="text-lg text-[#30A08B]">Chargement...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-white rounded-lg shadow-sm">
              <ShoppingCart className="h-12 w-12 text-[#30A08B] animate-bounce" />
              <p className="text-lg text-[#30A08B]">Votre panier est vide</p>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Liste des boutiques et produits */}
            <div className="lg:col-span-2 space-y-4">
              {Object.values(groupedByStore).map((storeGroup) =>
                renderStoreGroup(storeGroup)
              )}
            </div>

            {/* Résumé de la commande */}
            <div className="lg:sticky lg:top-20 space-y-4 h-fit">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-[#30A08B]">
                    Résumé de la commande
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Sous-total</span>
                      <span>{formatCurrency(calculerSousTotal())}</span>
                    </div>
                    {reduction > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Réduction</span>
                        <span>-{formatCurrency(reduction)}</span>
                      </div>
                    )}
                    
                    {/* Détail des frais d'expédition par boutique */}
                    {Object.keys(shippingCalculations).length > 0 && (
                      <div className="space-y-1">
                        <div className="text-sm font-medium text-gray-700">Frais d'expédition:</div>
                        {Object.entries(shippingCalculations).map(([storeId, calc]) => {
                          const store = groupedByStore[storeId];
                          return (
                            <div key={storeId} className="flex justify-between text-xs text-gray-500 ml-2">
                              <span>{store?.storeName}</span>
                              <span>{formatCurrency(calc.totalCost)}</span>
                            </div>
                          );
                        })}
                        <div className="flex justify-between text-sm text-gray-600 border-t pt-1">
                          <span>Total expédition</span>
                          <span>{formatCurrency(calculerTotalFraisExpedition())}</span>
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-2 border-t">
                      <div className="flex justify-between font-bold text-lg text-[#30A08B]">
                        <span>Total</span>
                        <span>{formatCurrency(calculerTotal())}</span>
                      </div>
                    </div>
                  </div>

                  {/* Code promo */}
                  <div className="pt-4 border-t">
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

                  {/* Newsletter */}
                  <div className="pt-4 border-t">
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
                          setArticles(articles.map((a) => ({ ...a, quantity: 1 })))
                        }
                      >
                        <RefreshCw className="h-4 w-4 text-[#30A08B]" />
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Résumé des boutiques */}
              {Object.keys(groupedByStore).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Expéditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-xs">
                      {Object.values(groupedByStore).map((store) => (
                        <div key={store.storeId} className="flex justify-between">
                          <span>{store.storeName}</span>
                          <span className="font-medium">
                            {formatCurrency(shippingCalculations[store.storeId]?.totalCost || 0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Bouton Commander */}
      <div className="container mx-auto px-4 py-4">
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white p-3 shadow-lg">
          {calculerTotal() !== 0 && (
            <Button
              onClick={() => {
                if (calculerTotal() === 0) return;
                
                if (!selectedZone) {
                  handleWarning("Veuillez sélectionner votre zone de livraison");
                  return;
                }
                
                if (acces === "non") {
                  handleWarning("Veuillez vous connecter d'abord");
                  setTimeout(() => {
                    navigation("/Connexion?fromCart=true");
                  }, 1000);
                } else {
                  // Sauvegarder les informations d'expédition pour la commande
                  localStorage.setItem("orderShippingZone", JSON.stringify(selectedZone));
                  localStorage.setItem("orderShippingCalculations", JSON.stringify(shippingCalculations));
                  navigation("/OrderConfirmation?fromCart=true");
                }
              }}
              className="w-full bg-[#30A08B] text-white py-3 rounded-lg font-semibold hover:bg-[#30A08B]/90"
              disabled={!selectedZone || Object.keys(shippingCalculations).length === 0}
            >
              Passer la commande {formatCurrency(calculerTotal())}
            </Button>
          )}
        </div>
        
        <div className="hidden lg:block">
          {calculerTotal() !== 0 && (
            <Button
              onClick={() => {
                if (calculerTotal() === 0) return;
                
                if (!selectedZone) {
                  handleWarning("Veuillez sélectionner votre zone de livraison");
                  return;
                }
                
                if (acces === "non") {
                  handleWarning("Veuillez vous connecter d'abord");
                  setTimeout(() => {
                    navigation("/Connexion?fromCart=true");
                  }, 1000);
                } else {
                  localStorage.setItem("orderShippingZone", JSON.stringify(selectedZone));
                  localStorage.setItem("orderShippingCalculations", JSON.stringify(shippingCalculations));
                  navigation("/OrderConfirmation?fromCart=true");
                }
              }}
              className="w-full bg-[#30A08B] text-white py-3 rounded-lg font-semibold hover:bg-[#30A08B]/90"
              disabled={!selectedZone || Object.keys(shippingCalculations).length === 0}
            >
              Passer la commande {formatCurrency(calculerTotal())}
            </Button>
          )}
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