import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Star,
  ChevronRight,
  Loader2,
  Filter,
  Grid,
  List,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const BackendUrl = process.env.REACT_APP_Backend_Url;

const stripHtml = (html) => {
  if (!html) return "";
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function AdvancedECommercePage() {
  const { sellerId } = useParams();
  const [sellerInfo, setSellerInfo] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("newest");
  const { toast } = useToast();

  useEffect(() => {
    if (sellerId) {
      fetchSellerData();
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

  const handleSort = (option) => {
    setSortOption(option);
    let sortedProducts = [...products];

    switch (option) {
      case "priceAsc":
        sortedProducts.sort((a, b) => a.prix - b.prix);
        break;
      case "priceDesc":
        sortedProducts.sort((a, b) => b.prix - a.prix);
        break;
      case "nameAsc":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "nameDesc":
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "newest":
        sortedProducts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        break;
      default:
        break;
    }

    setProducts(sortedProducts);
  };

  // Get products for current page
  const paginatedProducts = products.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  const ProductCard = ({ product }) => {
    const [imageError, setImageError] = useState(false);

    if (viewMode === "list") {
      return (
        <Card className="group hover:shadow-lg transition-all duration-300 flex flex-row overflow-hidden">
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 overflow-hidden flex-shrink-0">
            {!imageError ? (
              <img
                src={product.image1}
                alt={product.name}
                onError={() => setImageError(true)}
                className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <span className="text-gray-400 text-xs">No image</span>
              </div>
            )}
          </div>

          <div className="flex flex-col flex-grow p-3">
            <div className="flex justify-between items-start mb-1">
              <h3 className="line-clamp-1 text-sm font-semibold">
                {product.name}
              </h3>
              {product.typeName && (
                <Badge variant="secondary" className="text-xs">
                  {product.typeName}
                </Badge>
              )}
            </div>

            <div className="flex text-yellow-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>

            <p className="text-muted-foreground text-xs line-clamp-1 mb-2">
              {stripHtml(product.description)}
            </p>

            <div className="mt-auto flex justify-between items-center">
              <div className="text-lg font-bold text-blue-600">
                {product.prix.toLocaleString()} FCFA
              </div>
              <Button
                asChild
                className="group-hover:bg-blue-700 transition-colors"
                variant="default"
                size="sm"
              >
                <Link to={`/ProductDetail/${product._id}`}>
                  View <ChevronRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </Card>
      );
    }

    return (
      <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square overflow-hidden">
          {!imageError ? (
            <img
              src={product.image1}
              alt={product.name}
              onError={() => setImageError(true)}
              className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No image</span>
            </div>
          )}
          {product.typeName && (
            <Badge className="absolute top-2 right-2 bg-blue-500 text-white">
              {product.typeName}
            </Badge>
          )}
        </div>

        <CardHeader className="space-y-1 p-3 sm:p-4">
          <div className="flex justify-between items-center">
            <CardTitle className="line-clamp-1 text-sm sm:text-lg font-semibold">
              {product.name}
            </CardTitle>
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className="sm:w-4 sm:h-4"
                  fill="currentColor"
                />
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-2 p-3 sm:p-4 pt-0 sm:pt-0 flex-grow">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">
            {product.prix.toLocaleString()} FCFA
          </div>
          <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
            {stripHtml(product.description)}
          </p>
        </CardContent>

        <CardFooter className="p-3 sm:p-4">
          <Button
            asChild
            className="w-full group-hover:bg-blue-700 transition-colors text-sm"
            variant="default"
          >
            <Link to={`/ProductDetail/${product._id}`}>
              View Details
              <ChevronRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const ProductSkeleton = () => (
    <div className="space-y-3">
      <Skeleton className="aspect-square w-full" />
      <div className="space-y-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </div>
  );

  // Featured products carousel
  const FeaturedProducts = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    // Take top 5 products or less for featured section
    const featuredProducts = products.slice(0, Math.min(5, products.length));

    if (featuredProducts.length === 0) return null;

    const nextSlide = () => {
      setActiveIndex((current) =>
        current === featuredProducts.length - 1 ? 0 : current + 1
      );
    };

    const prevSlide = () => {
      setActiveIndex((current) =>
        current === 0 ? featuredProducts.length - 1 : current - 1
      );
    };

    return (
      <div className="relative overflow-hidden rounded-xl mb-8">
        {featuredProducts.length > 0 && (
          <>
            <div className="relative aspect-[21/9] md:aspect-[3/1] overflow-hidden rounded-xl">
              <img
                src={
                  featuredProducts[activeIndex]?.image1 || "/placeholder.jpg"
                }
                alt="Featured product"
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.src = "/placeholder.jpg";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                <h3 className="text-lg md:text-2xl font-bold mb-1">
                  {featuredProducts[activeIndex]?.name}
                </h3>
                <p className="text-sm md:text-base opacity-90 mb-2 line-clamp-2">
                  {stripHtml(featuredProducts[activeIndex]?.description)}
                </p>
                <Button
                  asChild
                  variant="default"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Link
                    to={`/ProductDetail/${featuredProducts[activeIndex]?._id}`}
                  >
                    Shop Now
                  </Link>
                </Button>
              </div>
            </div>

            {featuredProducts.length > 1 && (
              <div className="absolute inset-y-0 left-0 right-0 flex justify-between items-center px-2">
                <Button
                  variant="ghost"
                  className="rounded-full w-10 h-10 p-0 text-white bg-black/30 hover:bg-black/50"
                  onClick={prevSlide}
                >
                  <ArrowLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  className="rounded-full w-10 h-10 p-0 text-white bg-black/30 hover:bg-black/50"
                  onClick={nextSlide}
                >
                  <ArrowRight className="h-6 w-6" />
                </Button>
              </div>
            )}

            {/* Indicators */}
            {featuredProducts.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      activeIndex === index ? "bg-white" : "bg-white/50"
                    }`}
                    onClick={() => setActiveIndex(index)}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderMobileFilterMenu = () => (
    <div className="space-y-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:hidden flex items-center justify-between"
          >
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <span>Category: {selectedCategory}</span>
            </div>
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuItem onClick={() => handleCategorySelect(null, "All")}>
            All Products
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category._id}
              onClick={() => handleCategorySelect(category._id, category.name)}
            >
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="w-full md:hidden flex items-center justify-between"
          >
            <div className="flex items-center">
              <Filter className="h-4 w-4 mr-2" />
              <span>Sort By</span>
            </div>
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuItem onClick={() => handleSort("newest")}>
            Newest First
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort("priceAsc")}>
            Price: Low to High
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort("priceDesc")}>
            Price: High to Low
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort("nameAsc")}>
            Name: A to Z
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleSort("nameDesc")}>
            Name: Z to A
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

  const BoutiqueHeader = () => {
    if (isLoading) return <Skeleton className="h-32 w-full" />;

    if (!sellerInfo) return null;

    return (
      <div className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-4 sm:p-6 rounded-lg mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="relative h-16 w-16 sm:h-24 sm:w-24 overflow-hidden rounded-full border-4 border-white">
            <img
              src={sellerInfo.logo || "/store-placeholder.png"}
              alt={sellerInfo.name}
              className="object-cover w-full h-full"
              onError={(e) => {
                e.target.src = "/store-placeholder.png";
              }}
            />
          </div>

          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold">
              {sellerInfo.name}
            </h1>
            <p className="text-white/90 line-clamp-2 mt-1">
              {sellerInfo.description ||
                "Welcome to our boutique! Browse our products below."}
            </p>

            <div className="flex items-center mt-2">
              <div className="flex text-yellow-300 mr-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <span className="text-sm">
                (4.8/5) · {products.length} Products
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ScrollArea className="h-screen">
      <div className="container max-w-full px-3 sm:px-4 py-4 sm:py-8 space-y-4 sm:space-y-6">
        {/* Boutique Header */}
        <BoutiqueHeader />

        {/* Featured Products */}
        {!isLoading && products.length > 0 && <FeaturedProducts />}

        {/* Main Section */}
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-6 rounded-lg shadow-sm space-y-3 sm:space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col space-y-3 md:space-y-0 md:flex-row justify-between items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 w-full">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-gray-100">
                All Products
              </h2>
              {selectedCategory !== "All" && (
                <Badge variant="outline" className="text-sm">
                  {selectedCategory}
                </Badge>
              )}
            </div>

            <form
              onSubmit={handleSearch}
              className="flex items-center gap-2 w-full"
            >
              <Input
                type="search"
                placeholder="Search products..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
                className="text-sm"
              />
              <Button
                type="submit"
                variant="default"
                size="sm"
                className="sm:size-default"
              >
                <Search className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Search</span>
              </Button>
            </form>
          </div>

          {/* Mobile Filters */}
          {renderMobileFilterMenu()}

          {/* Desktop Filters */}
          <div className="hidden md:flex flex-col space-y-2">
            {/* Category filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Button
                variant={selectedCategory === "All" ? "default" : "outline"}
                onClick={() => handleCategorySelect(null, "All")}
                className="whitespace-nowrap"
                size="sm"
              >
                <Filter className="h-4 w-4 mr-2" />
                All Categories
              </Button>
              {categories.map((category) => (
                <Button
                  key={category._id}
                  variant={
                    selectedCategory === category.name ? "default" : "outline"
                  }
                  onClick={() =>
                    handleCategorySelect(category._id, category.name)
                  }
                  className="whitespace-nowrap"
                  size="sm"
                >
                  {category.name}
                </Button>
              ))}
            </div>

            {/* Sort options */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      {sortOption === "newest" && "Newest"}
                      {sortOption === "priceAsc" && "Price: Low to High"}
                      {sortOption === "priceDesc" && "Price: High to Low"}
                      {sortOption === "nameAsc" && "Name: A to Z"}
                      {sortOption === "nameDesc" && "Name: Z to A"}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => handleSort("newest")}>
                      Newest First
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("priceAsc")}>
                      Price: Low to High
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("priceDesc")}>
                      Price: High to Low
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("nameAsc")}>
                      Name: A to Z
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSort("nameDesc")}>
                      Name: Z to A
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* View Mode Selector */}
              <div className="flex gap-1 border rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-8 w-8 p-0"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {!isLoading && paginatedProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 px-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                No products found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search or filter to find what you're looking
                for.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setSearchName("");
                  handleCategorySelect(null, "All");
                }}
              >
                Reset filters
              </Button>
            </div>
          </div>
        )}

        {/* Products Grid/List */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
            {[...Array(8)].map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6"
                  : "flex flex-col gap-3 sm:gap-4"
              }
            >
              {paginatedProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6 sm:mt-8">
                <Pagination>
                  <PaginationContent className="flex flex-wrap justify-center gap-1">
                    <PaginationPrevious
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="h-8 w-8 p-0 flex items-center justify-center"
                    />
                    {totalPages <= 5 ? (
                      [...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i + 1}>
                          <PaginationLink
                            onClick={() => setCurrentPage(i + 1)}
                            isActive={currentPage === i + 1}
                            className="h-8 w-8 p-0"
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))
                    ) : (
                      <>
                        {currentPage > 2 && (
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => setCurrentPage(1)}
                              className="h-8 w-8 p-0"
                            >
                              1
                            </PaginationLink>
                          </PaginationItem>
                        )}

                        {currentPage > 3 && (
                          <PaginationItem>
                            <span className="flex h-8 w-8 items-center justify-center">
                              ...
                            </span>
                          </PaginationItem>
                        )}

                        {[...Array(5)].map((_, idx) => {
                          const pageNumber = Math.max(
                            Math.min(currentPage - 2 + idx, totalPages),
                            Math.min(idx + 1, totalPages)
                          );

                          if (
                            pageNumber <= 0 ||
                            pageNumber > totalPages ||
                            (pageNumber === 1 && currentPage <= 3) ||
                            (pageNumber === totalPages &&
                              currentPage >= totalPages - 2)
                          ) {
                            return null;
                          }

                          return (
                            <PaginationItem key={pageNumber}>
                              <PaginationLink
                                onClick={() => setCurrentPage(pageNumber)}
                                isActive={currentPage === pageNumber}
                                className="h-8 w-8 p-0"
                              >
                                {pageNumber}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}

                        {currentPage < totalPages - 2 && (
                          <PaginationItem>
                            <span className="flex h-8 w-8 items-center justify-center">
                              ...
                            </span>
                          </PaginationItem>
                        )}

                        {currentPage < totalPages - 1 && (
                          <PaginationItem>
                            <PaginationLink
                              onClick={() => setCurrentPage(totalPages)}
                              className="h-8 w-8 p-0"
                            >
                              {totalPages}
                            </PaginationLink>
                          </PaginationItem>
                        )}
                      </>
                    )}
                    <PaginationNext
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="h-8 w-8 p-0 flex items-center justify-center"
                    />
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </>
        )}
      </div>
    </ScrollArea>
  );
}
// export default AdvancedECommercePage;
