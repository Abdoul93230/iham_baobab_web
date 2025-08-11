import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { shuffle } from "lodash";
import ProduitPage from "../produit/ProduitPage";
import SliderPage from "../slider/SliderPage";
import { useSelector } from "react-redux";
import { ShoppingCart } from "lucide-react";
import pub1 from "../../Images/pub1.jpg";
import pub2 from "../../Images/pub2.jpg";
import CategorieMobile from "./CategorieMobile";


const carouselImages = [pub1, pub2];

const Home = ({ isOpen }) => {
  const BackendUrl = process.env.REACT_APP_Backend_Url;
  const swiperRef = useRef(null);
  const navigation = useNavigate();

  const [allTypes, setAllTypes] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const DATA_Products = useSelector((state) => state.products.data);
  const DATA_Types = useSelector((state) => state.products.types);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const DATA_Pubs = useSelector((state) => state.products.products_Pubs);

  const clefElectronique = DATA_Categories
    ? DATA_Categories.find((item) => item.name === "électroniques")
    : null;

  function getRandomElements(array) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, 10);
  }
  function getRandomElementsSix(array) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, 4);
  }
  function getRandomElementss(array, nbr) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, nbr);
  }



  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-2 ">
        {" "}
        {/* Ajout d'un padding supérieur pour le contenu principal */}
        <div className="flex flex-col md:flex-row gap-8">
          <sidea
            className={`md:w-1/4 bg-white rounded-lg mt-4 shadow-md p-4 ${
              isOpen ? "block" : "hidden md:block"
            }`}
          >
            <h2 className="text-xl font-bold mb-4 text-[#30A08B]">
              Catégories
            </h2>
            <ul>
              {/* {categories.map((category) => (
                <li key={category.id} className="mb-2">
                <button onClick={category.onClick} 
                className="w-full text-left py-2 px-4 rounded hover:bg-[#FFE9CC] transition-colors duration-200 flex items-center space-x-2">
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              </li>
              ))} */}

              {DATA_Categories.map((category) => {
                if (category.name == "all") {
                  return null;
                }
                return (
                  <li
                    key={category._id}
                    onClick={() => navigation(`/Categorie/${category.name}`)}
                    className="mb-2"
                  >
                    <button className="w-full text-left py-2 px-4 rounded hover:bg-[#FFE9CC] transition-colors duration-200 flex items-center space-x-2">
                      {/* <span>{category.icon}</span> */}

                      <img
                        src={category?.image}
                        alt="loading"
                        style={{
                          width: 30,
                          height: 30,
                          objectFit: "contain",
                          borderRadius: "50%",
                        }}
                      />
                      <span>{category?.name}</span>
                    </button>
                  </li>
                );
              })}
              <li className="mb-2" onClick={() => navigation("/Voir-plus")}>
                <button className="w-full text-left py-2 px-4 rounded hover:bg-[#FFE9CC] transition-colors duration-200 flex items-center space-x-2">
                  <span>➡️</span>

                  {/* <img src={category?.image} alt="loading"
                    style={{width:30,height:30,objectFit:"contain",borderRadius:"50%"}}
                     /> */}
                  <span>Voir plus</span>
                </button>
              </li>
              <div className="container py-20">
                <div className="card w-100 h-50 overflow-hidden">
                  {carouselImages.map((image, index) => {
                    return <img src={image} key={index} alt="" />;
                  })}
                </div>
              </div>
            </ul>
          </sidea>

          {/* Carousel and Products */}
          <div className="md:w-3/4">
            {/* Carousel */}
            <section className="my-6 relative">
              <Swiper
                ref={swiperRef}
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                className="mb-8 rounded-lg overflow-hidden"
              >
                {DATA_Pubs?.map((param, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={param.image}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-[400px] "
                    />
                    {/* <div className="w-full h-[400px]">
                      <div
                        style={{
                          backgroundImage: `url(${param.image})`,
                          backgroundSize: "cover",
                          backgroundRepeat: "no-repeat",
                          backgroundPosition: "center",
                          height: "100%", // Ajustez la hauteur selon vos besoins
                          width: "100%", // Ajustez la largeur selon vos besoins
                          // display: "flex",
                          // alignItems: "center",
                          // justifyContent: "center",
                          // color: "#ff9696", // Couleur du texte, ajustez selon vos besoins
                          // // border:'2px solid crimson',
                          // borderRadius:'20px'
                        }}
                      ></div>
                    </div> */}
                  </SwiperSlide>
                ))}
              </Swiper>
              {/* Flèches personnalisées */}
              <div
                className="absolute z-1 top-1/2 left-4 transform -translate-y-1/2 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
                onClick={() => swiperRef.current.swiper.slidePrev()}
              >
                <span className="text-lg">←</span>
              </div>
              <div
                className="absolute z-1 top-1/2 right-4 transform -translate-y-1/2 w-10 h-10 bg-[#30A08B] text-white rounded-full p-2 cursor-pointer flex items-center justify-center"
                onClick={() => swiperRef.current.swiper.slideNext()}
              >
                <span className="text-lg">→</span>
              </div>
            </section>

            <CategorieMobile />

            {/* Featured Products */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#30A08B]">
                Produits vedettess
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {getRandomElementss(DATA_Products, 4).map((product) => (
                  <div
                    key={product._id}
                    className="bg-white rounded-lg overflow-hidden transition-transform duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="relative">
                      <img
                        src={product.image1}
                        alt={product.name}
                        className="w-full h-48 object-cover transition-transform duration-200"
                      />
                      <span className="absolute top-2 right-2 bg-[#30A08B] text-white text-xs font-bold px-2 rounded-full">
                        Nouveau
                      </span>

                      <div
                        onClick={() =>
                          navigation(`/ProduitDétail/${product._id}`)
                        }
                        className="absolute inset-0 bg-gradient-to-b from-transparent to-[#30A08B] opacity-30 group-hover:scale-105 transition-transform duration-300"
                      ></div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-2">
                        {product.name.slice(0, 20)}...
                      </h3>
                      <p className="text-[#B17236] font-bold text-lg">
                        {product.prix} FCFA
                      </p>
                      <button
                        //  onClick={() => handleAddToCart(product)}
                        onClick={() =>
                          navigation(`/ProduitDétail/${product._id}`)
                        }
                        className="mt-2 flex justify-around items-center w-full bg-[#30A08B] text-white py-2
                       rounded-full hover:bg-opacity-90 transition transition-colors duration-200 text-sm md:text-base shadow-md hover:shadow-lg"
                      >
                        Ajouter au panier
                        <ShoppingCart size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
        <div className="flex overflow-x-auto mt-3" onInvalidCapture={false}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((card, index) => (
            <div key={index} className="mr-3">
              <div className="w-32 border border-gray-300 h-32 overflow-hidden rounded-lg ">
                <img
                  src="https://zz.jumia.is/cms/Coupon_Corner_TN300x300.jpg"
                  alt={`Publication ${card}`}
                  className="w-full h-full object-cover transition-transform transform hover:scale-105"
                />
              </div>
              <p className="text-center">Flash Sale</p>
            </div>
          ))}
        </div>
        <ProduitPage
          products={getRandomElementsSix(
            DATA_Products?.filter((item) =>
              DATA_Types.some(
                (type) =>
                  type.clefCategories === clefElectronique?._id &&
                  item.ClefType === type._id
              )
            )
          )}
          name={"électroniques"}
        />
        <SliderPage
          products={getRandomElements(
            DATA_Products.filter((item) =>
              DATA_Types.some(
                (type) =>
                  type.clefCategories === clefElectronique?._id &&
                  item.ClefType === type._id
              )
            )
          )}
          name={"électroniques"}
        />
        {DATA_Categories.map((param, index) => {
          if (
            getRandomElements(
              DATA_Products.filter(
                (item) =>
                  item.ClefType ===
                  DATA_Types.find((i) => i.clefCategories === param._id)?._id
              )
            ).length > 0 &&
            param._id !== clefElectronique?._id
          )
            return (
              <div key={index}>
                <ProduitPage
                  products={getRandomElementsSix(
                    DATA_Products.filter((item) =>
                      DATA_Types.some(
                        (type) =>
                          type.clefCategories === param?._id &&
                          item.ClefType === type._id
                      )
                    )
                  )}
                  name={param.name}
                />
                <SliderPage
                  products={getRandomElements(
                    DATA_Products.filter((item) =>
                      DATA_Types.some(
                        (type) =>
                          type.clefCategories === param?._id &&
                          item.ClefType === type._id
                      )
                    )
                  )}
                  name={param.name}
                />
              </div>
            );
          else return null;
        })}
      </main>
    </div>
  );
};

export default Home;
