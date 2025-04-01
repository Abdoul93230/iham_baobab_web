import React, { useState, useRef, useEffect } from "react";
import {
  MapPin,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  Share2,
  Heart,
  Store,
  MessageCircle,
  X,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
} from "lucide-react";
import {
  FaInstagram,
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
  FaStar,
} from "react-icons/fa";
import { Helmet } from "react-helmet";
import ProduitSimilaires from "./ProduitSimilaires";
import CommentaireProduit from "./CommentaireProduit";
import CountryPage from "./CountryPage";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { shuffle } from "lodash";
import Alert from "../../pages/Alert";
import { useNavigate } from "react-router-dom";
import AppPromo from "./AppPromo ";
import { fetchUserLikes, toggleLike } from "../../redux/likesSlice";

// Fonction utilitaire pour combiner les classes CSS
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProduitDetailMain({ panierchg }) {
  const navigation = useNavigate();
  const params = useParams();
  const swiperRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeImage, setSelectedSizeImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const [isOpenCountry, setIsOpenCountry] = useState(false);
  const [Allcommente, setAllCommente] = useState([]);
  const [categorie, setCategorie] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsAutres, setProductsAutres] = useState([]);
  const [produitsL, setProduitsL] = useState(0);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const westAfricanCountries = [
    "benin",
    "burkina Faso",
    "cap-Vert",
    "côte d'Ivoire",
    "gambie",
    "ghana",
    "guinee",
    "guinee-Bissau",
    "liberia",
    "mali",
    "niger",
    "nigeria",
    "senegal",
    "sierra Leone",
    "togo",
  ];

  const [regionClient, setRegionClient] = useState("Niamey");
  const [pays, setPays] = useState("Niger");
  const [alert, setAlert] = useState({
    visible: false,
    type: "",
    message: "ds",
  });

  const user = JSON.parse(localStorage.getItem("userEcomme"));

  // const [allTypes, setAllTypes] = useState([]);
  // const [allCategories, setAllCategories] = useState([]);
  // const [allProducts, setAllProducts] = useState([]);
  const BackendUrl = process.env.REACT_APP_Backend_Url;
  const DATA_Products = useSelector((state) => state.products.data);
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const DATA_Pubs = useSelector((state) => state.products.products_Pubs);

  ////////////////////////////////////////////////////////////////////////
  const API_URL = process.env.REACT_APP_Backend_Url;
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success");
  const dispatch = useDispatch();
  const likedProducts = useSelector((state) => state.likes.likedProducts);
  const userId = JSON.parse(localStorage.getItem("userEcomme"))?.id;

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserLikes(userId));
    }
  }, [userId, dispatch]);

  const showToast = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLikeClick = async (product, e) => {
    e.stopPropagation();

    if (!userId) {
      showToast("Veuillez vous connecter pour ajouter des favoris", "error");
      return;
    }

    try {
      await dispatch(toggleLike({ userId, product })).unwrap();
      showToast(
        likedProducts.includes(product._id)
          ? "Produit retiré des favoris"
          : "Produit ajouté aux favoris"
      );
    } catch (error) {
      showToast("Une erreur est survenue", "error");
      console.error("Erreur:", error);
    }
  };
  ////////////////////////////////////////////////////////////////////////

  const produit = DATA_Products.find((item) => item._id === params.id);

  const [selectedVariant, setSelectedVariant] = useState(produit?.variants[0]);

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };
  const handleWheel = (e) => {
    // e.preventDefault();
    const img = e.currentTarget.querySelector("img");

    // Applique le défilement vertical et horizontal
    img.scrollBy(e.deltaX, e.deltaY);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - left;
    const offsetY = e.clientY - top;
    const scrollX = (offsetX / width) * 100;
    const scrollY = (offsetY / height) * 100;
    const img = e.currentTarget.querySelector("img");
    img.style.transform = `translate(-${scrollX}px, -${scrollY}px)`;
  };

  // Définition des variables CSS
  const styles = {
    scrollbarHide: {
      scrollbarWidth: "none", // Pour Firefox
      msOverflowStyle: "none", // Pour Internet Explorer et Edge
      overflowX: "auto",
      overflowY: "auto",
      /* Pour Chrome, Safari et Opera */
      WebkitOverflowScrolling: "touch",
      display: "-webkit-box",
      WebkitBoxOrient: "vertical",
    },
    container: {
      backgroundColor: "#CCC",
      padding: "12px",
      gap: "12px",
    },
    card: {
      width: "100px",
      padding: "8px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    zoomContainer: {
      overflow: "hidden",
      position: "relative",
      perspective: "1000px",
    },
    zoomImage: {
      transform: isZoomed ? "scale(0)" : "scale(1)",
      transformOrigin: `${mousePosition.x}px ${mousePosition.y}px`,
      transition: "transform 0.1s ease",
    },
  };

  useEffect(() => {
    setSelectedSize(null);
    setSelectedVariant(produit?.variants[0]);
    setSelectedSizeImage(null);
    setQuantity(1);
    setLiked(false);
  }, [params.id]);

  const images = [
    DATA_Products.find((item) => item._id === params.id)?.image1,
    DATA_Products.find((item) => item._id === params.id)?.image2,
    DATA_Products.find((item) => item._id === params.id)?.image3,
  ];

  // const handlePrev = () => {
  //   setActiveImageIndex((prevIndex) =>
  //     prevIndex > 0 ? prevIndex - 1 : images.length - 1
  //   );
  // };

  // const handleNext = () => {
  //   setActiveImageIndex((prevIndex) =>
  //     prevIndex < images.length - 1 ? prevIndex + 1 : 0
  //   );
  // };

  // Récupérer toutes les images disponibles
  const getAllImages = () => {
    const baseImages = images || [];
    const variantImages = Array.isArray(produit?.variants)
      ? produit.variants.map((variant) => variant?.imageUrl).filter(Boolean)
      : [];
    return [...baseImages, ...variantImages];
  };

  // Gestion du changement de variante
  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedSize(null);

    const images = getAllImages();
    const variantImageIndex = images.findIndex(
      (img) => img === variant.imageUrl
    );
    if (variantImageIndex !== -1) {
      setActiveImageIndex(variantImageIndex);
    }
  };

  // Nouvelle méthode de navigation entre les images
  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % getAllImages().length);
    setZoomLevel(1);
  };

  const handlePrev = () => {
    setActiveImageIndex(
      (prev) => (prev - 1 + getAllImages().length) % getAllImages().length
    );
    setZoomLevel(1);
  };

  // Gestion du zoom dans la modal
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev * 1.5, 3));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev / 1.5, 1));
  };

  const decreaseQuantity = () => setQuantity((prev) => prev - 1);
  const increaseQuantity = () => setQuantity((prev) => prev + 1);

  // Pour les like
  const handleLike = () => {
    if (!liked) {
      setLiked(true);
    }
  };

  //pour les share

  const ShareModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div
        style={{ zIndex: 100 }}
        className="fixed inset-0 z-10 flex items-center p-3 justify-center bg-black bg-opacity-50"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2
            className="text-xl font-bold mb-4 text-center"
            style={{ color: "#30A08B" }}
          >
            Partager sur
          </h2>
          <div className="flex justify-around mb-4">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://ihambaobab.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-8 h-8 text-blue-600 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://wa.me/?text=https://ihambaobab.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="w-8 h-8 text-green-500 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/shareArticle?mini=true&url=https://ihambaobab.onrender.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="w-8 h-8 text-blue-700 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-8 h-8 text-pink-600 hover:scale-110 transition-transform" />
            </a>
          </div>
          <button
            onClick={onClose}
            className="mt-4 w-full bg-red-500 text-white p-2 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
          >
            <X className="mr-2" />
            Fermer
          </button>
        </div>
      </div>
    );
  };
  const handleShareClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  // pour les commentaire
  const StarRating = ({ rating, setRating }) => {
    return (
      <div className="flex items-center justify-center mb-4">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`w-6 h-6 cursor-pointer ${
              index < rating ? "text-[#30A08B]" : "text-gray-400"
            }`} // Utilisation de #30A08B pour les étoiles remplies
            onClick={() => setRating(index + 1)}
          />
        ))}
        <span className="ml-2 text-sm" style={{ color: "#B17236" }}>
          Note: {rating}
        </span>{" "}
        {/* Couleur pour la note */}
      </div>
    );
  };

  useEffect(() => {
    axios
      .get(`${BackendUrl}/getAllCommenteProduitById/${params.id}`)
      .then((coments) => {
        setAllCommente(coments.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [params.id]);

  // Déclare une fonction pour sélectionner des commentaires aléatoires
  const selectRandomComments = (comments, maxCount) => {
    // Vérifie si le nombre de commentaires disponibles est inférieur ou égal à maxCount
    if (comments.length <= maxCount) {
      return comments; // Retourne tous les commentaires disponibles
    }

    const shuffled = comments.sort(() => 0.5 - Math.random()); // Mélange les commentaires de manière aléatoire
    return shuffled.slice(0, maxCount); // Sélectionne les premiers maxCount commentaires
  };

  // Utilise la fonction selectRandomComments pour obtenir une liste de commentaires aléatoires
  const randomComments = selectRandomComments(Allcommente, 20);

  useEffect(() => {
    // Filtrer les produits basés sur la condition donnée
    const filteredProducts = DATA_Products.filter(
      (item) => item.ClefType === produit?.ClefType
    );
    const type = DATA_Types.find((item) => item._id === produit?.ClefType);
    const categorie = DATA_Categories.find(
      (item) => item._id === type?.clefCategories
    );

    setCategorie(categorie);

    // Obtenir les éléments aléatoires à partir du tableau filtré
    const getRandomElements = (array, nbr) => {
      const shuffledArray = shuffle(array);
      return shuffledArray.slice(0, nbr);
    };

    // Définir les produits aléatoires dans l'état
    setProducts(getRandomElements(filteredProducts, 12));
    setProductsAutres(getRandomElements(DATA_Products, 12));
  }, [DATA_Products, produit]);

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

  const envoyer = (e) => {
    e.preventDefault();
    const regexNumber = /^[0-5]$/;
    if (commentText.trim().length < 3) {
      handleWarning("votre commentaire doit contenire au moin 3 carracteres.");
      return;
    }
    if (rating === 0) {
      handleWarning("veuiller noter ce produit s'il vous plait.");
      return;
    }
    if (!regexNumber.test(rating.toString())) {
      handleWarning("forma non valid de 1 a 5 s'il vous plait!");
      return;
    }
    axios
      .post(`${BackendUrl}/createCommenteProduit`, {
        description: commentText,
        clefProduct: produit?._id,
        clefType: produit?.ClefType,
        etoil: rating,
        userName: user.name,
      })
      .then((resp) => {
        handleSuccess(resp.data.message);
        setIsCommentOpen(false);
        setCommentText("");
        setRating(0);

        axios
          .get(`${BackendUrl}/getAllCommenteProduitById/${params.id}`)
          .then((coments) => {
            setAllCommente(coments.data);
          })
          .catch((error) => {
            handleWarning(error.response.data);
            console.log(error);
          });
      })
      .catch((error) => {
        handleWarning(error.response.data);
        console.log(error);
      });
  };

  // Préparer les variantes d'images couleur
  const imageColorMap = produit?.variants.map((variant) => variant.imageUrl);

  // Calculer le prix et la remise
  const originalPrice = produit?.prix;
  const discountedPrice = produit?.prixPromo;
  const discountPercentage = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
  );

  // Préparer les tailles à partir des variants
  const sizes = produit?.variants.flatMap((variant) =>
    variant.sizes.map((size) => ({
      size: size,
      cm: "42", // Vous devrez ajuster cette logique selon vos données
    }))
  );

  const addToCart = () => {
    if (!westAfricanCountries.includes(pays?.toLowerCase())) {
      handleWarning(`ce Produit ne peut etre expedier au ${pays}`);
      return;
    }
    // Vérification des variantes de couleur
    if (produit?.variants && produit.variants.length >= 2 && !selectedVariant) {
      handleWarning(
        `Veuillez choisir un modèle parmi les ${produit.variants.length}`
      );
      return;
    }

    // Vérification des tailles
    const hasMultipleSizes = produit?.variants?.some(
      (variant) => variant.sizes && variant.sizes.length >= 2
    );

    if (hasMultipleSizes && !selectedSize) {
      handleWarning(`Veuillez choisir une taille parmi les disponibles`);
      return;
    }

    // Récupérer les produits existants dans le panier
    const existingProducts = JSON.parse(localStorage.getItem("panier")) || [];

    // Vérifier si le produit existe déjà dans le panier
    const existingProductIndex = existingProducts.findIndex((p) => {
      // Si le produit n'a pas de variantes, on compare simplement l'ID
      if (!produit.variants || produit.variants.length === 0) {
        return p?._id === produit?._id;
      }

      // Si le produit a des variantes, on compare l'ID, la couleur et la taille
      return (
        p?._id === produit?._id &&
        p.colors[0] === selectedVariant?.color &&
        p.sizes[0] === selectedSize
      );
    });

    if (existingProductIndex !== -1) {
      // Produit existant : incrémenter la quantité
      const updatedProducts = existingProducts.map((p, index) =>
        index === existingProductIndex ? { ...p, quantity: p.quantity + 1 } : p
      );

      localStorage.setItem("panier", JSON.stringify(updatedProducts));
      handleSuccess(
        "La quantité du produit a été incrémentée dans le panier !"
      );
    } else {
      // Nouveau produit à ajouter
      const newProduct = {
        ...produit,
        colors: selectedVariant ? [selectedVariant.color] : [],
        sizes: selectedSize ? [selectedSize] : [],
        quantity: quantity,
        _id: produit?._id,
        imageUrl: selectedVariant ? selectedVariant.imageUrl : produit?.image1,
        price:
          discountedPrice && discountedPrice > 0
            ? discountedPrice
            : originalPrice,
        prixPromo: discountedPrice,
      };

      const updatedProducts = [...existingProducts, newProduct];
      localStorage.setItem("panier", JSON.stringify(updatedProducts));
      handleSuccess("Produit ajouté au panier !");
    }

    // Mettre à jour la longueur du panier
    const local = localStorage.getItem("panier");
    panierchg();
    if (local) {
      setProduitsL(JSON.parse(local));
    } else {
      setProduitsL(0);
    }
  };
  const addToCart2 = () => {
    if (!westAfricanCountries.includes(pays?.toLowerCase())) {
      handleWarning(`ce Produit ne peut etre expedier au ${pays}`);
      return;
    }

    // Vérification des variantes de couleur
    if (produit?.variants && produit.variants.length >= 2 && !selectedVariant) {
      handleWarning(
        `Veuillez choisir un modèle parmi les ${produit.variants.length}`
      );
      return;
    }

    // Vérification des tailles
    const hasMultipleSizes = produit?.variants?.some(
      (variant) => variant.sizes && variant.sizes.length >= 2
    );

    if (hasMultipleSizes && !selectedSize) {
      handleWarning(`Veuillez choisir une taille parmi les disponibles`);
      return;
    }

    // Récupérer les produits existants dans le panier
    const existingProducts = JSON.parse(localStorage.getItem("panier")) || [];

    // Vérifier si le produit existe déjà dans le panier
    const existingProductIndex = existingProducts.findIndex((p) => {
      // Si le produit n'a pas de variantes, on compare simplement l'ID
      if (!produit.variants || produit.variants.length === 0) {
        return p?._id === produit?._id;
      }

      // Si le produit a des variantes, on compare l'ID, la couleur et la taille
      return (
        p?._id === produit?._id &&
        p.colors[0] === selectedVariant?.color &&
        p.sizes[0] === selectedSize
      );
    });

    if (existingProductIndex !== -1) {
      // Produit existant : incrémenter la quantité
      const updatedProducts = existingProducts.map((p, index) =>
        index === existingProductIndex ? { ...p, quantity: p.quantity + 1 } : p
      );

      localStorage.setItem("panier", JSON.stringify(updatedProducts));
      handleSuccess(
        "La quantité du produit a été incrémentée dans le panier !"
      );
    } else {
      // Nouveau produit à ajouter
      const newProduct = {
        ...produit,
        colors: selectedVariant ? [selectedVariant.color] : [],
        sizes: selectedSize ? [selectedSize] : [],
        quantity: quantity,
        _id: produit?._id,
        imageUrl: selectedVariant ? selectedVariant.imageUrl : produit?.image1,
        price:
          discountedPrice && discountedPrice > 0
            ? discountedPrice
            : originalPrice,
        prixPromo: discountedPrice,
      };

      const updatedProducts = [...existingProducts, newProduct];
      localStorage.setItem("panier", JSON.stringify(updatedProducts));
      handleSuccess("Produit ajouté au panier !");
    }

    // Mettre à jour la longueur du panier
    const local = localStorage.getItem("panier");
    panierchg();
    if (local) {
      setProduitsL(JSON.parse(local));
    } else {
      setProduitsL(0);
    }

    navigation("/panier");
  };

  // Gestion du zoom avec la molette de souris
  const handleImageWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    const newZoomLevel = Math.min(Math.max(zoomLevel + delta, 1), 5);
    setZoomLevel(newZoomLevel);
  };

  // Gestion du début du drag
  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      const startX = e.clientX - imagePosition.x;
      const startY = e.clientY - imagePosition.y;

      const handleMouseMove = (moveEvent) => {
        if (!imageRef.current || !containerRef.current) return;

        const newX = moveEvent.clientX - startX;
        const newY = moveEvent.clientY - startY;

        // Limiter le mouvement aux dimensions de l'image
        const imgRect = imageRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const maxMoveX = (imgRect.width * zoomLevel - containerRect.width) / 2;
        const maxMoveY =
          (imgRect.height * zoomLevel - containerRect.height) / 2;

        const boundedX = Math.min(Math.max(newX, -maxMoveX), maxMoveX);
        const boundedY = Math.min(Math.max(newY, -maxMoveY), maxMoveY);

        setImagePosition({ x: boundedX, y: boundedY });
      };

      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  // Navigation entre les images dans la modal
  const navigateModal = (direction) => {
    const images = getAllImages();
    const newIndex =
      direction === "next"
        ? (activeImageIndex + 1) % images.length
        : (activeImageIndex - 1 + images.length) % images.length;

    setActiveImageIndex(newIndex);
    setZoomLevel(1);
    setImagePosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const detecterRegion = async () => {
      try {
        // const response = await axios.get("https://ipapi.co/json/");
        const ip = await axios.get("https://ifconfig.me/ip");
        const response = await axios.get(`${BackendUrl}/proxy/ip-api`, {
          headers: {
            "Client-IP": ip.data,
          },
        });
        // const region = response.data.region;
        // const pays = response.data.country_name;
        const region = response.data.regionName || "Niamey";
        const pays = response.data.country || "Niger";
        setRegionClient(region.toLowerCase());
        setPays(pays.toLowerCase());
      } catch (error) {
        console.error("Erreur de détection de région", error);
      }
    };

    detecterRegion();
  }, []);

  const stripHtml = (html) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Créer une description SEO optimisée
  const generateSEODescription = () => {
    const cleanText =
      typeof produit?.description === "string"
        ? stripHtml(produit?.description)
        : "";
    return `${produit?.name} - ${cleanText?.slice(0, 150)}... Prix: ${
      produit?.prixf || produit?.prix
    } XOF. Livraison disponible.`;
  };

  // Créer des mots-clés SEO pertinents
  const generateSEOKeywords = () => {
    return `${produit?.name}, ${categorie?.name}, achat en ligne, e-commerce, ${pays}`;
  };

  // Créer le titre SEO optimisé
  const generateSEOTitle = () => {
    return `${produit?.name} | ${categorie?.name} | Achetez en ligne`;
  };

  // Créer l'URL canonique
  const canonicalUrl = `${window.location.origin}/produit/${params.id}`;

  // Ajout de la fonction pour gérer le clic sur le bouton WhatsApp
  const handleWhatsAppChat = () => {
    // Création de l'URL actuelle
    const currentURL = window.location.href;

    // Création du message pré-rempli
    let message = `Bonjour, je suis intéressé(e) par le produit ${produit?.name}.\n`;

    // Ajouter l'URL de l'image principale
    if (produit?.image1) {
      message += `Voici le lien vers l'image :\n${produit?.image1}\n\n`;
    }

    // Ajouter le lien vers les détails du produit
    message += `Lien vers les détails du produit :\n${currentURL}`;

    // Encodage du message pour l'URL
    const encodedMessage = encodeURIComponent(message);

    // Numéro de téléphone WhatsApp (à remplacer par votre numéro)
    const phoneNumber = "22787727501"; // Format: code pays + numéro

    // Création de l'URL WhatsApp
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="container mx-auto p-4" ref={swiperRef}>
      <Helmet>
        {/* Balises meta de base */}
        <title>{generateSEOTitle()}</title>
        <meta name="description" content={generateSEODescription()} />
        <meta name="keywords" content={generateSEOKeywords()} />

        {/* URL canonique */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Favicon et icône Apple */}
        <link rel="icon" type="image/jpeg" href={produit?.image1} />
        <link rel="apple-touch-icon" href={produit?.image1} />

        {/* Open Graph pour Facebook */}
        <meta property="og:title" content={generateSEOTitle()} />
        <meta property="og:description" content={generateSEODescription()} />
        <meta property="og:image" content={produit?.image1} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="product" />
        <meta property="og:site_name" content="IHAM Baobab" />
        <meta
          property="product:price:amount"
          content={produit?.prixf || produit?.prix}
        />
        <meta property="product:price:currency" content="XOF" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={generateSEOTitle()} />
        <meta name="twitter:description" content={generateSEODescription()} />
        <meta name="twitter:image" content={produit?.image1} />

        {/* Balises Schema.org pour les moteurs de recherche */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: produit?.name,
            image: [produit?.image1, produit?.image2, produit?.image3].filter(
              Boolean
            ),
            description: produit?.description,
            offers: {
              "@type": "Offer",
              price: produit?.prixf || produit?.prix,
              priceCurrency: "XOF",
              availability: "https://schema.org/InStock",
            },
          })}
        </script>
      </Helmet>

      {showNotification && (
        <div
          className={cn(
            "fixed top-4 right-4 z-50 px-4 py-3 rounded shadow-lg transition-all duration-300",
            notificationType === "success"
              ? "bg-green-100 border-green-400 text-green-700"
              : "bg-red-100 border-red-400 text-red-700"
          )}
        >
          <p className="text-sm">{notificationMessage}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-2">
        {/* Galerie de miniatures */}
        <div
          className="w-full lg:w-auto h-40 lg:h-96"
          style={styles.scrollbarHide}
        >
          <div
            className="flex w-[90px] lg:flex-col gap-2"
            style={{
              marginTop: "55px",
              // border: "2px solid crimson",
            }}
          >
            {getAllImages().map((image, index) => (
              <div
                key={index}
                className={`w-[80px] h-[80px] cursor-pointer rounded flex-shrink-0 overflow-hidden transition-all duration-200 ${
                  activeImageIndex === index
                    ? "border-2 border-solid border-[#30A08B]"
                    : "border border-gray-300"
                }`}
                onMouseEnter={() => setActiveImageIndex(index)}
                onClick={() => setActiveImageIndex(index)}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-200 transform hover:scale-105"
                  src={image}
                  alt={`Product ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Visualisateur d'image principal */}
        <div className="flex-grow flex flex-col lg:flex-row gap-4">
          <div
            className="lg:h-96 border-[#ccc] border flex lg:flex-1 cursor-pointer rounded-md overflow-hidden col-12"
            onWheel={handleWheel}
            style={styles.zoomContainer}
            // onMouseEnter={handleMouseEnter}
            // onMouseLeave={handleMouseLeave}
            // onMouseMove={handleMouseMove}
            onClick={() => setIsModalOpen1(true)}
          >
            <img
              className="w-full h-auto object-cover"
              src={getAllImages()[activeImageIndex]}
              alt=""
              style={styles.zoomImage}
            />
            <div
              className="absolute z-1 top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
            >
              <span className="text-lg">←</span>
            </div>
            <div
              className="absolute z-1 top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
            >
              <span className="text-lg">→</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#30A08B] opacity-10 group-hover:scale-105 transition-transform duration-300"></div>
          </div>

          {/* Section des informations de produit */}
          <div className="flex lg:flex-1">
            <div className="border-[#ccc] p-2 border cursor-pointer rounded-md overflow-hidden w-full">
              {discountedPrice > 0 ? (
                <div className="bg-[#F9394F] rounded-md p-2 h-[30px] flex justify-start items-center w-full">
                  <span className="text-start text-white font-bold text-lg">
                    Offre Limitée
                  </span>
                </div>
              ) : (
                <div className="bg-[#30A08B] rounded-md p-2 h-[30px] flex justify-start items-center w-full">
                  <span className="text-start text-white font-bold text-lg">
                    Nouveaus
                  </span>
                </div>
              )}

              <div className="p-2">
                {discountedPrice > 0 ? (
                  <h1 className="text-lg font-bold">
                    XOF {discountedPrice}{" "}
                    <span className="line-through text-red-500">
                      XOF {originalPrice}
                    </span>{" "}
                    -{discountPercentage}%
                  </h1>
                ) : (
                  <span className="text-lg font-bold">XOF {originalPrice}</span>
                )}

                <div className="my-2 w-full flex items-center">
                  <div className="w-24 mr-2">
                    <img
                      src={require("./logoPromo.png")}
                      alt="Promotion"
                      className="w-full h-auto z-2"
                    />
                  </div>
                  <p className="text-sm text-gray-600">2+ pièces, extra -5%</p>
                </div>
                <p className="text-xs text-gray-600">Prix hors taxe</p>
                <p className="font-bold text-xs">{produit?.name}</p>
                {produit?.shipping?.weight ? (
                  <p className="font-bold text-xs">
                    Poids : {produit?.shipping?.weight} kg
                  </p>
                ) : (
                  <></>
                )}
              </div>

              {produit?.variants.length > 0 ? (
                <>
                  <div className="flex py-2 p-2 items-center">
                    <p className="text-xs font-bold mr-1">Couleur:</p>
                    <p className="text-xs font-bold mr-1">
                      {selectedVariant?.color}
                    </p>
                  </div>

                  <div className="flex space-x-2 p-2">
                    {produit?.variants.map((variant, index) => (
                      <div
                        className={`w-[70px] h-[70px] rounded-md overflow-hidden transition-all duration-200 
                      ${
                        selectedVariant?.color === variant?.color
                          ? "border-2 border-solid border-[#30A08B]"
                          : "border border-gray-300"
                      }`}
                        key={index}
                      >
                        <img
                          className="w-full h-full object-cover cursor-pointer"
                          src={variant.imageUrl}
                          alt={`Image ${variant.color}`}
                          onClick={() => handleVariantChange(variant)}
                        />
                      </div>
                    ))}
                  </div>
                </>
              ) : null}

              {produit?.variants.length > 0 ? (
                <div className="flex flex-col p-1">
                  <div className="flex py-2 items-center">
                    <p className="text-xs font-bold mr-1">Taille du Produit:</p>
                    <p className="text-xs font-bold mr-1">
                      {selectedSize
                        ? `${selectedSize}`
                        : "Sélectionnez une taille"}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedVariant?.sizes.map((size, index) => (
                      <div
                        key={index}
                        className={`w-24 h-[46px] flex items-center justify-center cursor-pointer rounded-md transition-all duration-200 
                      ${
                        selectedSize === size
                          ? "border-2 border-[#30A08B]"
                          : "border border-gray-300"
                      }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        <p className="text-sm font-bold">{`${size}`}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              <button
                onClick={(e) => handleLikeClick(produit, e)}
                className={cn(
                  "p-2 rounded-full transition-all duration-300",
                  likedProducts.includes(produit._id)
                    ? "bg-red-50 hover:bg-red-100"
                    : "bg-white hover:bg-emerald-50"
                )}
              >
                <Heart
                  className={cn(
                    "w-6 h-6 transition-all duration-300",
                    likedProducts.includes(produit._id)
                      ? "text-red-500 fill-red-500"
                      : "text-emerald-600"
                  )}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Modal de zoom */}
        {/* Modal de zoom amélioré */}
        {isModalOpen1 && (
          <div
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => {
              setIsModalOpen1(false);
              setZoomLevel(1);
              setImagePosition({ x: 0, y: 0 });
            }}
          >
            <div
              ref={containerRef}
              className="relative w-[90%] h-[90%] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Bouton de fermeture */}
              <button
                className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors duration-300 z-50"
                onClick={() => setIsModalOpen1(false)}
              >
                <X size={32} strokeWidth={2} />
              </button>

              {/* Boutons de navigation */}
              <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
                <button
                  className="bg-[#30A08B] hover:bg-[#228B73] backdrop-blur-sm p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                  onClick={() => navigateModal("prev")}
                >
                  <ChevronLeft
                    size={24}
                    className="text-white"
                    strokeWidth={2}
                  />
                </button>
              </div>

              <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
                <button
                  className="bg-[#30A08B] hover:bg-[#228B73] backdrop-blur-sm p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                  onClick={() => navigateModal("next")}
                >
                  <ChevronRight
                    size={24}
                    className="text-white"
                    strokeWidth={2}
                  />
                </button>
              </div>

              {/* Contrôles de zoom */}
              <div className="absolute top-4 right-4 flex space-x-2 z-10">
                <button
                  className="bg-[#30A08B] hover:bg-[#228B73] backdrop-blur-sm p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                  onClick={() => setZoomLevel(Math.max(zoomLevel - 0.5, 1))}
                >
                  <ZoomOut size={24} className="text-white" strokeWidth={2} />
                </button>
                <button
                  className="bg-[#30A08B] hover:bg-[#228B73] backdrop-blur-sm p-2 rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                  onClick={() => setZoomLevel(Math.min(zoomLevel + 0.5, 5))}
                >
                  <ZoomIn size={24} className="text-white" strokeWidth={2} />
                </button>
              </div>

              {/* Container de l'image avec gestion du zoom et du déplacement */}
              <div
                ref={containerRef}
                className="flex items-center justify-center w-full h-full overflow-hidden"
                onWheel={handleImageWheel}
              >
                <img
                  ref={imageRef}
                  src={getAllImages()[activeImageIndex]}
                  alt="Zoomed Image"
                  onMouseDown={handleMouseDown}
                  className={`transition-transform duration-300 cursor-${
                    zoomLevel > 1 ? "move" : "zoom-in"
                  }`}
                  style={{
                    transform: `scale(${zoomLevel}) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    willChange: "transform",
                    userSelect: "none",
                    pointerEvents: isDragging ? "none" : "auto",
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="py-2">
        <div className="w-full border bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-3">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Livré vers</h2>

              <div
                className="flex items-center cursor-pointer"
                onClick={() => setIsCountryOpen(true)}
              >
                <MapPin className="w-5 h-5 mr-1" />
                <span>{pays?.toLocaleUpperCase()}</span>
              </div>
              {/* {console.log(
                produit?.shipping?.zones?.find(
                  (item) => item.name.toLowerCase() === pays?.toLowerCase()
                )
              )}
              {console.log(produit?.shipping?.zones[0].name)} */}
              {isCountryOpen && (
                <div className="fixed inset-0 p-3 z-10 flex items-center justify-center bg-black bg-opacity-50">
                  <CountryPage
                    isOpen={isOpenCountry}
                    setIsCountryOpen={setIsCountryOpen}
                    onClose={() => setIsCountryOpen(false)}
                    setPays={setPays}
                  />
                </div>
              )}
            </div>

            {!westAfricanCountries.includes(pays?.toLowerCase()) ? (
              <div className="bg-red-50 p-4 rounded-lg mb-4">
                <h3 className="font-semibold mb-2">L'engagement IHAM Baobab</h3>
                <div className="flex items-start space-x-2 text-gray-600">
                  <Truck className="w-5 h-5 mt-1 flex-shrink-0" />
                  <p>
                    Cet article ne peut pas être livré à cette adresse.
                    Sélectionnez un autre article ou une autre adresse.
                  </p>
                </div>
              </div>
            ) : (
              <></>
            )}

            <div className="mb-4">
              <h3 className="font-semibold mb-2 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2" />
                Sécurité et vie privée
              </h3>
              <p className="text-sm text-gray-600">
                Paiements sûrs: Nous ne partageons pas vos données personnelles
                avec des tiers sans votre consentement.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Informations personnelles sécurisées: Nous protégeons votre vie
                privée et assurons la sécurité de vos données personnelles.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Quantité</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={decreaseQuantity}
                  className="p-2 border rounded-md border-[#B2905F] text-[#B2905F] hover:bg-[#B17236] hover:text-white"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  className="w-30 text-center border rounded-md p-1 border-gray-300"
                />
                <button
                  onClick={increaseQuantity}
                  className="p-2 border rounded-md border-[#B2905F] text-[#B2905F] hover:bg-[#B17236] hover:text-white"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Vous pouvez ajouter autant de produits que vous le souhaitez.
              </p>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-2">
              <button
                onClick={addToCart2}
                className="w-full bg-[#30A08B] hover:bg-[#228B73] text-white py-3 rounded-md mb-2 md:mb-0"
              >
                Acheter maintenant
              </button>
              <button
                onClick={addToCart}
                className="w-full bg-red-100 hover:bg-red-200 text-red-600 py-3 rounded-md mb-2 md:mb-0"
              >
                Ajouter au panier
              </button>
            </div>
          </div>
          <div className="flex justify-between px-6 py-4 border-t">
            <div className="flex flex-col items-center">
              <button className="p-2" onClick={() => navigation("/Boutique")}>
                <Store className="w-5 h-5" />
              </button>
              <span className="text-sm">Boutique</span>
            </div>
            {/* Nouveau style pour le bouton WhatsApp */}
            <div className="flex flex-col items-center">
              <button
                onClick={handleWhatsAppChat}
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all duration-300 transform hover:scale-105"
                title="Discuter sur WhatsApp"
              >
                <FaWhatsapp className="w-5 h-5" />
              </button>
              <span className="text-sm text-green-600 font-medium">
                WhatsApp
              </span>
            </div>

            {user ? (
              <>
                <div className="flex flex-col items-center">
                  <button
                    className="p-2 flex items-center"
                    onClick={() => setIsCommentOpen(true)}
                  >
                    <MessageCircle className="w-5 h-5" />
                  </button>

                  <span className="text-sm">Commenter</span>

                  {isCommentOpen && (
                    <div
                      style={{ zIndex: 100 }}
                      className="fixed inset-0 p-3 z-10 flex items-center justify-center bg-black bg-opacity-50"
                    >
                      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2
                          className="text-xl font-bold mb-4 text-center"
                          style={{ color: "#30A08B" }}
                        >
                          Ajouter un commentaire
                        </h2>
                        <StarRating rating={rating} setRating={setRating} />
                        <form onSubmit={envoyer} className="flex flex-col mb-4">
                          <textarea
                            className="w-full p-2 border border-gray-300 rounded mt-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            rows="3"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            placeholder="Écrire un commentaire..."
                            style={{ borderColor: "#B2905F" }}
                          />
                          <button
                            type="submit"
                            className="mt-2 bg-[#B17236] text-white p-2 rounded hover:bg-[#B2905F] transition-colors"
                          >
                            Envoyer
                          </button>
                        </form>
                        <button
                          onClick={() => {
                            setIsCommentOpen(false);
                            setRating(0);
                            setCommentText("");
                          }}
                          className="mt-4 w-full bg-red-500 text-white p-2 rounded flex items-center justify-center hover:bg-red-600 transition-colors"
                        >
                          <X className="mr-2" />
                          Fermer
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <></>
            )}

            <div className="flex flex-col items-center">
              <button className="p-2" onClick={handleShareClick}>
                <Share2 className="w-5 h-5" />
              </button>
              <span className="text-sm">Partager</span>
              <ShareModal isOpen={isModalOpen} onClose={handleClose} />
            </div>

            {/* <div className="flex flex-col items-center">
              <button
                className={`p-2 flex items-center transition-colors duration-300 transform ${
                  liked ? "bg-[#30A08B] animate-like" : "bg-transparent"
                } hover:bg-[#B2905F] rounded-md ${
                  liked ? "cursor-not-allowed" : ""
                }`}
                onClick={handleLike}
                disabled={liked} 
              >
                <Heart
                  className={`w-5 h-5 ${liked ? "text-white" : "text-black"}`}
                />
                <span className={`ml-1 ${liked ? "text-white" : "text-black"}`}>
                  {liked ? "1" : "0"} 
                </span>
              </button>
              <span className="text-sm">Like</span>

              <style jsx>{`
                @keyframes like {
                  0% {
                    transform: scale(1);
                  }
                  50% {
                    transform: scale(1.2);
                  }
                  100% {
                    transform: scale(1);
                  }
                }

                .animate-like {
                  animation: like 0.3s ease-in-out;
                }
              `}</style>
            </div> */}
          </div>
        </div>
      </div>
      <ProduitSimilaires
        titre={"Articles similaires"}
        produits={products}
        userId={userId}
        onLike={handleLikeClick}
      />

      <div className="py-3">
        <div className="border-t border-gray-300 mb-4" />

        <h2 className="text-2xl font-semibold text-[#B17236] mb-2">
          Produit Détail
        </h2>

        <p
          className="text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: produit?.description,
          }}
        ></p>
      </div>

      {/* ////////////////////////////////////// */}
      <AppPromo />
      {/* ////////////////////////////////////// */}

      <ProduitSimilaires
        titre={"Autres Articles"}
        produits={productsAutres}
        userId={userId}
        onLike={handleLikeClick}
      />
      <CommentaireProduit
        name={produit?.name}
        img={[produit?.image1, produit?.image2, produit?.image3]}
        coments={Allcommente}
        categorie={categorie}
      />

      {alert.visible && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ visible: false })}
        />
      )}
    </div>
  );
}

export default ProduitDetailMain;
