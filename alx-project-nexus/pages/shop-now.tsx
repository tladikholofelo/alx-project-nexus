import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/cartSlice";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";
import { useRouter } from "next/router";

// Available product categories
const categories = ["electronics", "jewelery", "men's clothing", "women's clothing"];

const ShopNowPage = () => {
  const [category, setCategory] = useState<string | null>(null); // Selected category
  const [products, setProducts] = useState<Product[]>([]); // Products to display
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const dispatch = useDispatch();
  const router = useRouter(); // Access query parameters from the URL

  // Convert string to sentence case
  const toSentenceCase = (str: string) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  // Update the category based on the query parameter in the URL
  useEffect(() => {
    const { category: queryCategory } = router.query;
    setCategory(typeof queryCategory === "string" ? queryCategory : null);
  }, [router.query]);

  // Fetch products when the category changes
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Start loading
      try {
        let apiUrl = "https://fakestoreapi.com/products";
        if (category) {
          apiUrl = `https://fakestoreapi.com/products/category/${category}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }
        const data = await response.json();
        setProducts(data); // Set fetched products
        setLoading(false); // End loading
      } catch (error) {
        setError("Error fetching products.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  // Add product to cart
  const handleAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  // Change the selected category
  const handleCategoryChange = (selectedCategory: string) => {
    setCategory(selectedCategory);
    router.push(`/shop-now?category=${selectedCategory}`);
  };

  // Show all categories (reset category filter)
  const handleShowAllCategories = () => {
    setCategory(null);
    router.push("/shop-now");
  };

  // Loading state: display skeleton loaders
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6">Shop Now</h1>

        <div className="mb-6 flex flex-wrap gap-4">
          <button
            onClick={handleShowAllCategories}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${category === null ? "bg-blue-500 text-white" : "bg-gray-200"} hover:bg-blue-300 transition-colors`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold ${category === cat ? "bg-blue-500 text-white" : "bg-gray-200"} hover:bg-blue-300 transition-colors`}
            >
              {toSentenceCase(cat)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  // Error state: display error message
  if (error) {
    return <p>{error}</p>;
  }

  // Render products
  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6">Shop Now</h1>

      <div className="mb-6 flex flex-wrap gap-4">
        <button
          onClick={handleShowAllCategories}
          className={`px-4 py-2 rounded-full text-sm font-semibold ${category === null ? "bg-blue-500 text-white" : "bg-gray-200"} hover:bg-blue-300 transition-colors`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold ${category === cat ? "bg-blue-500 text-white" : "bg-gray-200"} hover:bg-blue-300 transition-colors`}
          >
            {toSentenceCase(cat)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
          ))
        ) : (
          <p className="col-span-full text-center">No products available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default ShopNowPage;
