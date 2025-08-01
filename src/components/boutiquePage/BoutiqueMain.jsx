import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingCart,
  Heart,
  Search,
  MessageCircle,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import BoutiqueProduits from "./BoutiqueProduits";
import axios from "axios";
import { useSelector } from "react-redux";
import { shuffle } from "lodash";
import VerticalCarousel from "./VerticalCarousel";
// import CategorieMobile from '../homePage/CategorieMobile';
const BackendUrl = process.env.REACT_APP_Backend_Url;

const AdvancedECommercePage = ({ isOpen, acces }) => {
  const DATA_Products = useSelector((state) => state.products.data);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { sellerId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const swiperRef = useRef(null);
  const navigation = useNavigate();
  const { toast } = useToast();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const DATA_Pubs = useSelector((state) => state.products.products_Pubs);
  const DATA_Categories = useSelector((state) => state.products.categories);
  const images1 = banners?.map((item) => item.image);
  const images2 = DATA_Pubs?.map((item) => item.image);

  const toutesLesImages = [...images1, ...images2];

  // const categories = [
  //   "All",
  //   "New Arrivals",
  //   "Best Sellers",
  //   "Fashion",
  //   "Electronics",
  //   "Home & Living",
  // ];
  // création des page à corriger :  user massagerie
  // useEffect(() => {
  //   const mockProducts = [
  //     {
  //       id: 1,
  //       name: "Premium Leather Jacket",
  //       price: 249.99,
  //       originalPrice: 349.99,
  //       description:
  //         "Handcrafted leather jacket with modern silhouette and premium finish.",
  //       images: [
  //         "https://ae-pic-a1.aliexpress-media.com/kf/S0855088d8b7b45ad828624c44c0cbf0am.jpg_480x480.jpg_.webp",
  //       ],
  //       category: "Fashion",
  //       rating: 4.7,
  //       inStock: true,
  //       badges: ["10%"],
  //     },
  //     {
  //       id: 2,
  //       name: "Smart Wireless Earbuds",
  //       price: 129.99,
  //       originalPrice: 199.99,
  //       description:
  //         "Noise-canceling wireless earbuds with advanced Bluetooth 5.2 technology.",
  //       images: [
  //         "https://ae-pic-a1.aliexpress-media.com/kf/S0855088d8b7b45ad828624c44c0cbf0am.jpg_480x480.jpg_.webp",
  //       ],
  //       category: "Electronics",
  //       rating: 4.5,
  //       inStock: true,
  //       badges: ["New"],
  //     },
  //     {
  //       id: 3,
  //       name: "Minimalist Smart Watch",
  //       price: 179.99,
  //       originalPrice: 249.99,
  //       description:
  //         "Sleek smartwatch with health tracking, GPS, and long battery life.",
  //       images: [
  //         "https://ae-pic-a1.aliexpress-media.com/kf/S0855088d8b7b45ad828624c44c0cbf0am.jpg_480x480.jpg_.webp",
  //       ],
  //       category: "Electronics",
  //       rating: 4.8,
  //       inStock: true,
  //       badges: ["Limited Edition"],
  //     },
  //     {
  //       id: 4,
  //       name: "Ergonomic Home Office Chair",
  //       price: 299.99,
  //       originalPrice: 449.99,
  //       description:
  //         "Comfortable and adjustable chair perfect for long working hours.",
  //       images: [
  //         "https://ae-pic-a1.aliexpress-media.com/kf/S0855088d8b7b45ad828624c44c0cbf0am.jpg_480x480.jpg_.webp",
  //       ],
  //       category: "Home & Living",
  //       rating: 4.6,
  //       inStock: true,
  //       badges: ["Best Seller"],
  //     },
  //   ];

  //   setProducts(mockProducts);
  //   setFilteredProducts(mockProducts);
  // }, []);

  useEffect(() => {
    if (sellerId) {
      fetchSellerData();
      fetchBanners();
    }
  }, [sellerId]);

  const fetchSellerData = async () => {
    setIsLoading(true);
    try {
      // Fetch seller info and products in parallel
      const [productsRes, categoriesRes] = await Promise.all([
        // axios.get(`${BackendUrl}/getSellerInfo/${sellerId}`),
        axios.get(`${BackendUrl}/searchProductBySupplier/${sellerId}`),
        axios.get(`${BackendUrl}/getAllTypeBySeller/${sellerId}`),
      ]);

      // setSellerInfo(sellerRes.data.data);

      // Filter only published products
      const publishedProducts = productsRes.data.data.filter(
        (product) => product.isPublished === "Published"
      );

      setProducts(publishedProducts);
      setCategories(categoriesRes.data.data);
      setTotalPages(Math.ceil(publishedProducts.length / perPage));
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error.response?.data?.message || "Failed to fetch boutique data",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBanners = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BackendUrl}/api/marketing/Bannerss/${sellerId}`,
        {
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setBanners(response.data.data);
      } else {
        toast.error("Erreur lors de la récupération des bannières");
      }
    } catch (error) {
      console.error("Error fetching banners:", error);
      toast.error(
        error.response?.data?.message || "Erreur de connexion au serveur"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategorySelect = async (categoryId, categoryName) => {
    setIsLoading(true);
    setSelectedCategory(categoryName);
    try {
      if (categoryName === "All") {
        // Reload all products
        const response = await axios.get(
          `${BackendUrl}/searchProductBySupplier/${sellerId}`
        );
        const publishedProducts = response.data.data.filter(
          (product) => product.isPublished === "Published"
        );
        setProducts(publishedProducts);
        setTotalPages(Math.ceil(publishedProducts.length / perPage));
      } else {
        // Filter by category
        const response = await axios.get(
          `${BackendUrl}/searchProductByTypeBySeller/${categoryId}/${sellerId}`
        );
        const publishedProducts = response.data.products.filter(
          (product) => product.isPublished === "Published"
        );
        setProducts(publishedProducts);
        setTotalPages(Math.ceil(publishedProducts.length / perPage));
      }
      setCurrentPage(1);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to filter products by category",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchName.length < 2) {
      toast({
        variant: "warning",
        title: "Warning",
        description: "Search term must be at least 2 characters long",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.get(
        `${BackendUrl}/searchProductByNameBySeller/${searchName}/${sellerId}`
      );

      const publishedProducts = response.data.products.filter(
        (product) => product.isPublished === "Published"
      );

      // Apply category filter if active
      let filteredProducts = publishedProducts;
      if (selectedCategory !== "All") {
        filteredProducts = filteredProducts.filter(
          (product) => product.typeName === selectedCategory
        );
      }

      setProducts(filteredProducts);
      setTotalPages(Math.ceil(filteredProducts.length / perPage));
      setCurrentPage(1);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to search products",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const categoriesSideBar = [
    { id: 1, name: "All", icon: "🏠", onClick: () => navigation("/Homme") },
    {
      id: 2,
      name: "New Arrivals",
      icon: "📱",
      onClick: () => navigation("/Homme"),
    },
    {
      id: 3,
      name: "Best Sellers",
      icon: "💄",
      onClick: () => navigation("/Homme"),
    },
    {
      id: 4,
      name: "Best Sellers",
      icon: "🍳",
      onClick: () => navigation("/Homme"),
    },
    { id: 5, name: "Fashion", icon: "🔌", onClick: () => navigation("/Homme") },
    {
      id: 6,
      name: "Electronics",
      icon: "➡️",
      onClick: () => navigation("/Voir-plus"),
    },
    {
      id: 7,
      name: "Home & Living",
      icon: "➡️",
      onClick: () => navigation("/Voir-plus"),
    },
  ];

  const carouselImages = [
    "https://media.istockphoto.com/id/1357529194/fr/photo/rendu-3d-dun-salon-de-style-moderne-avec-chemin%C3%A9e.jpg?s=612x612&w=0&k=20&c=KZBiX2zyVuyoKRuzM95892W7Fr0Rb2vX9qUAN1phS10=",
    "https://media.istockphoto.com/id/1040810144/photo/unknown-woman-cutting-a-paprika.jpg?s=612x612&w=0&k=20&c=e6t5CL5zrpioK3uJ-TPkEpbWhbKvZPW8cC-y26HtBr8=",
    // Ajoute d'autres images ici
  ];
  const productVedettes = [
    {
      id: 1,
      name: "Produit 1",
      price: "19,99 ",
      image:
        "https://cc-prod.scene7.com/is/image/CCProdAuthor/product-photography_P1_900x420?$pjpeg$&jpegSize=200&wid=900",
    },
    {
      id: 2,
      name: "Produit 2",
      price: "29,99",
      image:
        "https://www.codeur.com/blog/wp-content/uploads/2019/06/photo-produit-ecommerce.jpg",
    },
    {
      id: 3,
      name: "Produit 3",
      price: "39,99 ",
      image:
        "https://www.fontainebleau-blog.com/wp-content/uploads/2020/02/comment-reussir-belles-photos-de-paysage-660x248.jpg",
    },
    {
      id: 4,
      name: "Produit 4",
      price: "49,99",
      image:
        "https://img.freepik.com/photos-premium/photo-appareil-photo-noir-objectif-long-trepied-montagne-arriere-plan_978521-558.jpg?w=360",
    },
  ];

  function getRandomElementss(array, nbr) {
    const shuffledArray = shuffle(array);
    return shuffledArray.slice(0, nbr);
  }

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Responsive Navigation */}
      <nav className="sticky top-0 z-50 bg-gradient-to-r from-[#B17236] via-[#B2905F] to-[#30A08B] shadow-lg">
        <div className="container mx-auto px-1 md:px-6 py-4  flex justify-between items-center">
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="flex items-center space-x-6">
            <h1
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "#FFFFFF" }}
            >
              StyleHub
            </h1>

            {/* Desktop Categories */}
            <div className="hidden md:flex space-x-4 text-white">
              {categories.map((category) => (
                <button
                  key={category?._id}
                  onClick={() =>
                    handleCategorySelect(category._id, category.name)
                  }
                  className={`${
                    selectedCategory === category
                      ? "font-bold"
                      : "hover:opacity-75"
                  } transition-colors flex items-center text-sm`}
                  style={{
                    color:
                      selectedCategory === category ? "#30A08B" : "inherit",
                  }}
                >
                  {category?.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search products..."
                className="pl-10 pr-4 py-2 w-64 lg:w-80 border-2 border-gray-200 rounded-full transition focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
            </div>

            <div className="flex items-center space-x-2 md:space-x-3">
              <button className="relative p-2 hover:bg-[#B2905F] rounded-full">
                <Heart className="text-white" size={20} />
                <span className="absolute -top-1 -right-1 bg-[#30A08B] text-white text-xs rounded-full px-2 py-0.5">
                  0
                </span>
              </button>

              <button
                className="relative p-2 hover:bg-[#B2905F] rounded-full"
                onClick={() => navigation("/Panier")}
              >
                <ShoppingCart className="text-white" size={20} />
                <span className="absolute -top-1 -right-1 bg-[#30A08B] text-white text-xs rounded-full px-2 py-0.5">
                  {cartItems.length}
                </span>
              </button>

              {/* Added Message Button */}
              <button
                className="relative p-2 hover:bg-[#B2905F] rounded-full"
                onClick={() => navigation("/Messagerie")}
              >
                <MessageCircle className="text-white" size={20} />
                <span className="absolute -top-1 -right-1 bg-[#30A08B] text-white text-xs rounded-full px-2 py-0.5">
                  2
                </span>
              </button>

              {/* Added Profile Section */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 p-1 hover:bg-[#B2905F] rounded-full"
                  onClick={() =>
                    navigation(`/Profile d'un boutiquier/${sellerId}`)
                  }
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcyI9Cvp53aaP9XeRn-ZKbJDH2QaWC72O26A&s"
                    alt="Profile"
                    className="w-8 h-8 object-cover rounded-full border-2 border-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white absolute w-full shadow-lg">
            <div className="flex flex-col p-4 space-y-2">
              {categories.map((category) => (
                <button
                  key={category?._id}
                  onClick={() => {
                    handleCategorySelect(category._id, category.name);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`${
                    selectedCategory === category
                      ? "font-semibold"
                      : "hover:opacity-75"
                  } text-left py-2 border-b`}
                  style={{
                    color:
                      selectedCategory === category?.name
                        ? "#B2905F"
                        : "inherit",
                  }}
                >
                  {category?.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content - Flex grow to push footer down */}
      <main className="container mx-auto px- md:px-6 py-8 flex-grow">
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

                  <span>Voir plus</span>
                </button>
              </li>
            </ul>
            <VerticalCarousel carouselImages={toutesLesImages} />
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
                {banners.length > 0
                  ? banners.map((banner, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={banner?.image}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-[400px]"
                        />
                      </SwiperSlide>
                    ))
                  : DATA_Pubs.map((banner, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={banner?.image}
                          alt={`Slide ${index + 1}`}
                          className="w-full h-[400px]"
                        />
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

            {/* <CategorieMobile/> */}

            {/* Featured Products */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#30A08B]">
                Produits vedettes
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {getRandomElementss(DATA_Products, 4).map((product) => (
                  <div
                    key={product.id}
                    onClick={() => navigation(`/ProduitDétail/${product?._id}`)}
                    className="flex flex-col rounded-lg group overflow-hidden transition-all duration-300 transform shadow-lg transition-transform duration-300 hover:-translate-y-1 cursor-pointer relative"
                  >
                    <div className="relative flex-grow">
                      <img
                        src={product.image1}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2 right-2 bg-[#62aca2bb] text-white text-xs font-bold px-2 rounded-full">
                        Nouveau
                      </span>

                      <div
                        // onClick={() => navigation("/Produit détail")}

                        className="absolute inset-0 bg-gradient-to-b from-transparent to-[#30A08B] opacity-30 group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-3">
                      <h3
                        className="font-semibold truncate"
                        style={{ color: "#B17236" }}
                      >
                        {product.name}
                      </h3>
                      <p
                        className="text-lg font-bold"
                        style={{ color: "#B2905F" }}
                      >
                        {product.price} FCFA
                      </p>
                      <button
                        //  onClick={() => handleAddToCart(product)}
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

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ color: "#B17236" }}
            >
              Our Collection
              <span className="text-sm ml-2 text-gray-500">
                ({products?.length} products)
              </span>
            </h2>
          </div>
        </section>
        <BoutiqueProduits products={products} />
      </main>

      {/* Modern Footer */}
      {/* <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h4
              className="text-xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #30A08B, #B2905F)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Customer Care
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center hover:opacity-75 cursor-pointer">
                <Truck className="mr-2" size={18} /> Free Shipping
              </li>
              <li className="flex items-center hover:opacity-75 cursor-pointer">
                <Award className="mr-2" size={18} /> Quality Guarantee
              </li>
              <li className="flex items-center hover:opacity-75 cursor-pointer">
                <Shield className="mr-2" size={18} /> Secure Payment
              </li>
              <li className="flex items-center hover:opacity-75 cursor-pointer">
                <MessageCircle className="mr-2" size={18} /> 24/7 Support
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #B2905F, #B17236)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li className="hover:opacity-75 cursor-pointer">About Us</li>
              <li className="hover:opacity-75 cursor-pointer">Collections</li>
              <li className="hover:opacity-75 cursor-pointer">Blog</li>
              <li className="hover:opacity-75 cursor-pointer">FAQ</li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #B17236, #30A08B)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Legal
            </h4>
            <ul className="space-y-2">
              <li className="hover:opacity-75 cursor-pointer">
                Privacy Policy
              </li>
              <li className="hover:opacity-75 cursor-pointer">
                Terms of Service
              </li>
              <li className="hover:opacity-75 cursor-pointer">Return Policy</li>
              <li className="hover:opacity-75 cursor-pointer">
                Cookie Settings
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="text-xl font-bold mb-4"
              style={{
                background: "linear-gradient(90deg, #30A08B, #B2905F)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              Connect With Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="text-blue-400" />
                <input
                  type="email"
                  placeholder="Subscribe to our newsletter"
                  className="bg-gray-800 text-white px-3 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  className="px-4 py-2 rounded-full hover:opacity-75"
                  style={{
                    background: "linear-gradient(90deg, #B2905F, #30A08B)",
                    color: "white",
                  }}
                >
                  Send
                </button>
              </div>
              <div className="flex space-x-4 mt-4">
                <button className="hover:opacity-75">
                  <Globe size={24} style={{ color: "#30A08B" }} />
                </button>
                <button className="hover:opacity-75">
                  <Phone size={24} style={{ color: "#B2905F" }} />
                </button>
                <button
                  className="hover:opacity-75"
                  onClick={() => navigation("/Paement")}
                >
                  <CreditCard size={24} style={{ color: "#B17236" }} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 border-t border-gray-700 mt-8 pt-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p
              className="mb-2 md:mb-0"
              style={{
                background: "linear-gradient(90deg, #B17236, #30A08B)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              © 2024 StyleHub. All Rights Reserved
            </p>
            <div className="flex space-x-4">
              <img
                src={MasterCard}
                alt="Payment Method"
                className="h-6"
                style={{
                  borderColor: "#30A08B",
                  borderWidth: "2px",
                }}
              />
              <img
                src={VisaCard}
                alt="Payment Method"
                className="h-6"
                style={{
                  borderColor: "#B2905F",
                  borderWidth: "2px",
                }}
              />
              <img
                src={DomicileCard}
                alt="Payment Method"
                className="h-6"
                style={{
                  borderColor: "#B17236",
                  borderWidth: "2px",
                }}
              />
              <img
                src={MobileMoney}
                alt="Payment Method"
                className="h-6"
                style={{
                  borderColor: "#B17236",
                  borderWidth: "2px",
                }}
              />
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default AdvancedECommercePage;
