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
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { shuffle } from "lodash";
import Alert from "../../pages/Alert";

function ProduitDetailMain() {
  const swiperRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeImage, setSelectedSizeImage] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const params = useParams();
  const produit = DATA_Products.find((item) => item._id === params.id);
  // console.log(produit);
  // console.log(DATA_Types);
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

  const images = [
    DATA_Products.find((item) => item._id === params.id)?.image1,
    DATA_Products.find((item) => item._id === params.id)?.image2,
    DATA_Products.find((item) => item._id === params.id)?.image3,
  ];

  const handlePrev = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : images.length - 1
    );
  };

  const handleNext = () => {
    setActiveImageIndex((prevIndex) =>
      prevIndex < images.length - 1 ? prevIndex + 1 : 0
    );
  };
  const sizes = [
    { size: "39", cm: "24.5CM" },
    { size: "40", cm: "25.0CM" },
    { size: "41", cm: "25.5CM" },
    { size: "42", cm: "26.0CM" },
    { size: "43", cm: "26.5CM" },
    // Ajoutez d'autres tailles si nécessaire
  ];
  const imageColorMap =
    DATA_Products.find((item) => item._id === params.id)?.pictures || [];

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => Math.min(5, prev + 1));

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
      <div className="fixed inset-0 z-10 flex items-center p-3 justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2
            className="text-xl font-bold mb-4 text-center"
            style={{ color: "#30A08B" }}
          >
            Partager sur
          </h2>
          <div className="flex justify-around mb-4">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="w-8 h-8 text-blue-600 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://wa.me/?text=YOUR_URL"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp className="w-8 h-8 text-green-500 hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/shareArticle?mini=true&url=YOUR_URL"
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
        // console.log(coments.data);
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
            // console.log(coments.data);
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

  return (
    <div className="container mx-auto p-4" ref={swiperRef}>
      <Helmet>
        <title>{produit?.name}</title>
        {/* <link rel="icon" href="/chemin/vers/votre/nouveau/favicon.ico" /> */}
        <link rel="icon" type="image" href={produit?.image1} />
        <link rel="apple-touch-icon" href={produit?.image1} />
        <meta property="og:title" content={produit?.name} />
        <meta property="og:description" content={produit?.description} />
        <meta property="og:image" content={produit?.image1} />
      </Helmet>

      <div className="flex flex-col lg:flex-row gap-2">
        <div
          className="w-full lg:w-auto h-40 lg:h-96"
          style={styles.scrollbarHide}
        >
          <div className="flex w-[90px] lg:flex-col gap-2">
            {images.map((image, index) => (
              <div
                key={index}
                className={`w-[80px] h-[80px] cursor-pointer rounded flex-shrink-0 overflow-hidden transition-all duration-200 ${
                  activeImageIndex === index
                    ? "border-2 border-solid border-[#30A08B]"
                    : "border border-gray-300"
                }`}
                onMouseEnter={() => setActiveImageIndex(index)}
                onClick={() => setActiveImageIndex(index)} // Ajout du clic pour changer l'image active
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-200 transform hover:scale-105" // Utilisation de w-full et h-full
                  src={image}
                  alt={`Product ${index + 1}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-grow flex flex-col lg:flex-row gap-4">
          <div
            className="lg:h-96 border-[#ccc] border flex lg:flex-1 cursor-pointer rounded-md overflow-hidden col-12"
            onWheel={handleWheel}
            style={styles.zoomContainer}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <img
              className="w-full h-auto object-cover "
              src={images[activeImageIndex]}
              alt=""
              style={styles.zoomImage}
            />
            <div
              className="absolute z-1 top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
              onClick={handlePrev}
            >
              <span className="text-lg">←</span>
            </div>
            <div
              className="absolute z-1 top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
              onClick={handleNext}
            >
              <span className="text-lg">→</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#30A08B] opacity-10 group-hover:scale-105 transition-transform duration-300"></div>
          </div>

          <div className="flex lg:flex-1">
            <div className="border-[#ccc] p-2 border cursor-pointer rounded-md overflow-hidden w-full">
              <div className="bg-[#F9394F] rounded-md p-2 h-[30px] flex justify-start items-center w-full">
                <span className="text-start text-white font-bold text-lg">
                  Offre Limitée
                </span>
              </div>

              <div className="p-2">
                <h1 className="text-lg font-bold">
                  XOF 7,482{" "}
                  <span className="line-through text-red-500">XOF 17,817</span>{" "}
                  -58%
                </h1>
                <div className="my-2 w-full flex items-center">
                  <div className="w-24 mr-2">
                    {" "}
                    {/* Espacement ajouté ici */}
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
              </div>

              <div className="flex py-2 p-2 items-center">
                <p className="text-xs font-bold mr-1">Couleur:</p>
                <p className="text-xs font-bold mr-1">
                  {selectedSizeImage
                    ? `${selectedSizeImage.color}`
                    : "Sélectionnez la couleur"}
                </p>
              </div>

              {/* Section des images */}
              <div className="flex space-x-2 p-2">
                {imageColorMap.map((item, index) => (
                  <div
                    className={`w-[70px] h-[70px] rounded-md overflow-hidden transition-all duration-200 
              ${
                activeImageIndex === index
                  ? "border-2 border-solid border-[#30A08B]"
                  : "border border-gray-300"
              }`}
                    key={index}
                  >
                    <img
                      className="w-full h-full object-cover cursor-pointer"
                      src={item}
                      alt={`Image ${index + 1}`}
                      onClick={() => {
                        setActiveImageIndex(index);
                        setSelectedSizeImage(item);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex flex-col p-1">
                <div className="flex py-2 items-center">
                  <p className="text-xs font-bold mr-1">Taille de chaussure:</p>
                  <p className="text-xs font-bold mr-1">
                    {selectedSize
                      ? `${selectedSize.size} (${selectedSize.cm})`
                      : "Sélectionnez une taille"}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size, index) => (
                    <div
                      key={index}
                      className={`w-24 h-[46px] flex items-center justify-center cursor-pointer rounded-md transition-all duration-200 
              ${
                selectedSize && selectedSize.size === size.size
                  ? "border-2 border-[#30A08B]"
                  : "border border-gray-300"
              }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      <p className="text-sm font-bold">{`${size.size} (${size.cm})`}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
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
                <span>Niger</span>
              </div>
              {isCountryOpen && (
                <div className="fixed inset-0 p-3 z-10 flex items-center justify-center bg-black bg-opacity-50">
                  <CountryPage
                    isOpen={isOpenCountry}
                    onClose={() => setIsOpenCountry(false)}
                  />
                </div>
              )}
            </div>

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
                  onChange={(e) =>
                    setQuantity(
                      Math.max(1, Math.min(parseInt(e.target.value) || 1))
                    )
                  }
                  className="w-16 text-center border rounded-md p-1 border-gray-300"
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
              <button className="w-full bg-[#30A08B] hover:bg-[#228B73] text-white py-3 rounded-md mb-2 md:mb-0">
                Acheter maintenant
              </button>
              <button className="w-full bg-red-100 hover:bg-red-200 text-red-600 py-3 rounded-md mb-2 md:mb-0">
                Ajouter au panier
              </button>
            </div>
          </div>
          <div className="flex justify-between px-6 py-4 border-t">
            <div className="flex flex-col items-center">
              <button className="p-2">
                <Store className="w-5 h-5" />
              </button>
              <span className="text-sm">Boutique</span>
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
                    <div className="fixed inset-0 p-3 z-10 flex items-center justify-center bg-black bg-opacity-50">
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

            <div className="flex flex-col items-center">
              <button
                className={`p-2 flex items-center transition-colors duration-300 transform ${
                  liked ? "bg-[#30A08B] animate-like" : "bg-transparent"
                } hover:bg-[#B2905F] rounded-md ${
                  liked ? "cursor-not-allowed" : ""
                }`}
                onClick={handleLike}
                disabled={liked} // Désactive le bouton si déjà aimé
              >
                <Heart
                  className={`w-5 h-5 ${liked ? "text-white" : "text-black"}`}
                />
                <span className={`ml-1 ${liked ? "text-white" : "text-black"}`}>
                  {liked ? "1" : "0"} {/* Affiche 1 si aimé, sinon 0 */}
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
            </div>
          </div>
        </div>
      </div>
      <ProduitSimilaires titre={"Articles similaires"} produits={products} />
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

        {/* <p className="text-gray-700 leading-relaxed mt-4">
          <span className="font-bold">Lorem ipsum:</span> dolor sit amet
          consectetur, adipisicing elit. Omnis eius neque ratione fugit. Nulla
          quasi aperiam beatae odio fugiat, ipsum sequi ullam accusamus.
        </p> */}
      </div>
      <ProduitSimilaires titre={"Autres Articles"} produits={productsAutres} />
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
