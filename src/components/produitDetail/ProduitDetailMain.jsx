import React, { useState, useRef } from "react";
import {
  MapPin,
  Truck,
  ShieldCheck,
  Minus,
  Plus,
  Package,
  Share2,
  Heart,
} from "lucide-react";
import ProduitSimilaires from "./ProduitSimilaires";
import CommentaireProduit from "./CommentaireProduit";

function ProduitDetailMain() {
  const swiperRef = useRef(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedSizeImage, setSelectedSizeImage] = useState(null);
  const [quantity, setQuantity] = useState(5);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };
  const handleWheel = (e) => {
    e.preventDefault();
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
    "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
    "https://ae-pic-a1.aliexpress-media.com/kf/Seb6097b909364b93a597ec439dd486c3i.jpg_480x480.jpg_.webp",
    "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",

    "https://ae-pic-a1.aliexpress-media.com/kf/Seb6097b909364b93a597ec439dd486c3i.jpg_480x480.jpg_.webp",
    "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",

    "https://ae-pic-a1.aliexpress-media.com/kf/Seb6097b909364b93a597ec439dd486c3i.jpg_480x480.jpg_.webp",
    "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",

    "https://ae-pic-a1.aliexpress-media.com/kf/Seb6097b909364b93a597ec439dd486c3i.jpg_480x480.jpg_.webp",
    // Ajoute d'autres images si nécessaire...
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
  const imageColorMap = [
    {
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/S8f80b025da62482a9580f41ebec80c88B.jpg_80x80.jpg_.webp",
      color: "White",
    },
    {
      image:
        "https://ae-pic-a1.aliexpress-media.com/kf/Seb6097b909364b93a597ec439dd486c3i.jpg_480x480.jpg_.webp",
      color: "Black",
    },
  ];

  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));
  const increaseQuantity = () => setQuantity((prev) => Math.min(5, prev + 1));



  return (
    <div className="container mx-auto p-4" ref={swiperRef}>
      <div className="flex flex-col lg:flex-row gap-2">
        <div
          className="w-full lg:w-auto h-40 lg:h-96"
          style={styles.scrollbarHide}
        >
          <div className="flex lg:flex-col gap-2">
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
                      src="https://ae-pic-a1.aliexpress-media.com/kf/Sa7dd8ba3783d4d4c9224ea5ea4092890u/366x64.png_.webp"
                      alt="Promotion"
                      className="w-full h-auto"
                    />
                  </div>
                  <p className="text-sm text-gray-600">2+ pièces, extra -5%</p>
                </div>
                <p className="text-xs text-gray-600">Prix hors taxe</p>
                <p className="font-bold text-xs">
                  Baskets décontractées respirantes pour hommes, chaussures de
                  course légères, chaussures de sport souples pour hommes,
                  blanc, été, grande taille 35-45, nouveau
                </p>
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
                      src={item.image}
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
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-1" />
                <span>Niger</span>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg mb-4">
              <h3 className="font-semibold mb-2">L'engagement AliExpress</h3>
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
                      Math.max(1, Math.min(5, parseInt(e.target.value) || 1))
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
                5 article(s) au maximum
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
            <button className="p-2">
              <Package className="w-5 h-5" />
            </button>
            <button className="p-2">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 flex items-center">
              <Heart className="w-5 h-5 mr-1" />
              <span>1406</span>
            </button>
          </div>
        </div>
      </div>
      <ProduitSimilaires />
      <div className="py-3">
  <div className="border-t border-gray-300 mb-4" />

  <h2 className="text-2xl font-semibold text-[#B17236] mb-2">Produit Détail</h2>

  <p className="text-gray-700 leading-relaxed">
    <span className="font-bold">Lorem ipsum:</span>  dolor sit amet consectetur adipisicing elit. Provident nobis praesentium illo, maiores eaque, numquam totam odit aperiam 
    rem soluta tenetur pariatur deleniti exercitationem! Aliquid ex hic magnam vitae eligendi? Cum non blanditiis vel corrupti veniam unde atque, ut incidunt.
  </p>

  <p className="text-gray-700 leading-relaxed mt-4">
    <span className="font-bold">Lorem ipsum:</span>  dolor sit amet consectetur, adipisicing elit. Omnis eius neque ratione fugit. Nulla quasi aperiam beatae odio fugiat, ipsum sequi ullam accusamus.
  </p>
</div>
<ProduitSimilaires />






    <CommentaireProduit/>
    

    











    </div>
  );
}

export default ProduitDetailMain;
