import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/src/features/products/productSlice";
import { RootState, AppDispatch } from "@/src/store";
import ProductCard from "@/components/ProductCard";
import FeaturedBanner from "@/components/FeaturedBanner";
import QuickViewModal from "@/components/QuickViewModal";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

// Home page component
const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status } = useSelector((state: RootState) => state.products);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Define categories and their filters
  const categories = [
    { name: "Electronics", filter: (product: Product) => product.category === "electronics" },
    { name: "Jewelry", filter: (product: Product) => product.category === "jewelery" },
    { name: "Men's Clothing", filter: (product: Product) => product.category === "men's clothing" },
    { name: "Women's Clothing", filter: (product: Product) => product.category === "women's clothing" },
  ];

  const maxProductsPerCategory = 8;

  // Fetch products when the component is mounted
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Loading state UI
  if (status === "loading") {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <HeroSectionSkeleton />
        <h1 className="text-3xl font-semibold text-center mt-8 mb-6 tracking-tight">Exploring Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error state UI
  if (status === "error") {
    return (
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        <FeaturedBanner
          title="Oops! Product Load Failed"
          description="We encountered an error loading products. Please try again later."
          buttonText="Retry"
        />
        <h1 className="text-3xl font-semibold text-center mt-8 mb-6 tracking-tight">Browse Products</h1>
        <div className="text-center text-red-500 py-10">Failed to load products. Please check your connection or try again.</div>
      </div>
    );
  }

  // Main content UI
  return (
    <div>
      <div className="container mx-auto py-8 px-4 max-w-5xl">
        {/* Hero Section */}
        <HeroSection />

        {/* Categories Section */}
        <ExploreCategories
          categories={categories}
          items={items}
          maxProductsPerCategory={maxProductsPerCategory}
          setSelectedProduct={setSelectedProduct}
        />

        {/* Quick View Modal */}
        {selectedProduct && (
          <QuickViewModal
            product={selectedProduct}
            isOpen={!!selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </div>
    </div>
  );
};

// Hero section component (main page banner)
const HeroSection = () => (
  <div className="relative w-full h-screen bg-cover bg-center" style={{ backgroundImage: `url('/images/hero-product-3.jpeg')` }}>
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-8 text-white bg-gradient-to-l from-black to-transparent">
      <h1 className="text-5xl font-extrabold mb-4">Discover the Future of Fashion</h1>
      <p className="text-xl mb-8">Shop the latest collection that blends style and comfort.</p>
      <div className="flex gap-6">
        <Link href="/shop-now">
          <button className="bg-blue-600 px-8 py-3 rounded-full text-white hover:bg-blue-700 transition-all">Shop Now</button>
        </Link>
        <Link href="/404-page">
          <button className="border-2 border-white px-8 py-3 rounded-full text-white hover:bg-white hover:text-blue-600 transition-all">Explore Collection</button>
        </Link>
      </div>
    </div>
  </div>
);

// Hero section skeleton (for loading state)
const HeroSectionSkeleton = () => (
  <div className="relative w-full h-screen bg-gray-100 animate-pulse">
    <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-start p-8 text-white bg-gradient-to-l from-black to-transparent">
      <h1 className="w-1/2 h-12 bg-gray-300 rounded-md mb-4"></h1>
      <p className="w-1/3 h-8 bg-gray-300 rounded-md mb-8"></p>
      <div className="flex gap-6 mb-4">
        <div className="w-32 h-10 bg-gray-300 rounded-full"></div>
        <div className="w-40 h-10 bg-gray-300 rounded-full"></div>
      </div>
      <p className="text-lg text-gray-400 italic">Loading products, please wait...</p>
    </div>
  </div>
);

// Explore Categories component (displays categories and products)
const ExploreCategories = ({
  categories,
  items,
  maxProductsPerCategory,
  setSelectedProduct,
}: {
  categories: any;
  items: any;
  maxProductsPerCategory: number;
  setSelectedProduct: any;
}) => (
  <div>
    <h1 className="text-3xl font-semibold text-center mt-16 mb-8 tracking-tight">Explore Categories</h1>
    {categories.map((category) => {
      const filteredProducts = items.filter(category.filter);
      const visibleProducts = filteredProducts.slice(0, maxProductsPerCategory);

      return (
        <div key={category.name} className="mb-16">
          <div className="bg-gray-50 py-3 px-5 rounded-md mb-6">
            <h2 className="text-2xl font-semibold tracking-tight text-gray-800">{category.name}</h2>
          </div>
          <div className="overflow-x-auto flex space-x-6 pb-6 hide-scrollbar">
            {visibleProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[160px] sm:w-[200px] md:w-[220px]">
                <ProductCard product={product} onQuickView={() => setSelectedProduct(product)} />
              </div>
            ))}
          </div>
          <div className="text-right mt-3">
            <Link href={`/shop-now?category=${category.name.toLowerCase()}`}>
              <button className="text-blue-500 hover:underline font-medium">View All {category.name} &rarr;</button>
            </Link>
          </div>
        </div>
      );
    })}
  </div>
);

export default Home;
