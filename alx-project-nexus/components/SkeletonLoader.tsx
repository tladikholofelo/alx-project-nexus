// components/ProductCardSkeleton.tsx
const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white border border-gray-200 p-4 rounded-xl shadow-md">
      <div className="h-40 sm:h-48 md:h-56 bg-gray-300 rounded-md mb-3"></div> {/* Image Placeholder */}
      <div className="h-5 sm:h-6 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Product Title Placeholder */}
      <div className="h-4 sm:h-5 bg-gray-300 rounded w-1/2 mb-3"></div> {/* Product Price Placeholder */}
      <div className="h-10 bg-gray-400 rounded w-full"></div> {/* Add to Cart Button Placeholder */}
    </div>
  );
};

export default ProductCardSkeleton;
