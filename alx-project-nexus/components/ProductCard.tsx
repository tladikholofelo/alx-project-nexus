import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/src/store/cartSlice";
import { Product } from "@/types";
import Button from "@/components/Button";

interface ProductCardProps {
  product: Product;
  onQuickView: () => void;  // Add the onQuickView prop
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();  // Prevent quick view from being triggered
    if (isProcessing) return;  // Prevent multiple clicks

    setIsProcessing(true);
    dispatch(addToCart(product));
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setIsProcessing(false);  // Reset after 1.5 seconds
    }, 1500);
  };

  return (
    <div
      className="product-card"
      onClick={onQuickView}  // Trigger the quick view when clicking on the card
      role="button"
      aria-label={`Quick view of ${product.title}`}
    >
      {/* Product Image */}
      <img
        src={product.image}
        alt={`Image of ${product.title}`}
        className="w-full h-40 object-cover rounded-md mb-3"
        loading="lazy"
      />

      {/* Product Name */}
      <h2 className="product-card-title font-semibold text-gray-900 truncate tracking-light">{product.title}</h2>

      {/* Product Price */}
      <p className="text-sm sm:text-base text-gray-500 mt-2">
        {product.price ? `$${product.price.toFixed(2)}` : "Price not available"}
      </p>

      {/* Add to Cart Button */}
      <Button
        onClick={handleAddToCart}
        className={`mt-auto w-full ${added ? "bg-green-500 text-white" : ""}`}
        disabled={isProcessing}  // Disable the button while processing
        aria-live="polite"  // Announce the button action for accessibility
      >
        {isProcessing ? "⏳ Adding..." : added ? "✅ Added!" : "🛒 Add to Cart"}
      </Button>
    </div>
  );
};

export default ProductCard;
