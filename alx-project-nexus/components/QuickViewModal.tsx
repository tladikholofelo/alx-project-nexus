// components/QuickViewModal.tsx
import { useState, useEffect } from "react";
import { Product } from "@/types";

interface Props {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: Props) {
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  // Close modal when pressing ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null; // Don't render the modal if isOpen is false

  // Handle "Read more" click
  const toggleDescription = () => {
    setDescriptionExpanded((prev) => !prev);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500); // Reset after 1.5 seconds
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={onClose} // Close modal if the background is clicked
      role="dialog"
      aria-labelledby="modal-title"
      aria-hidden={!isOpen}
    >
      <div
        className="bg-white p-4 sm:p-5 rounded-md shadow-lg w-[90%] sm:w-[85%] md:w-[65%] lg:w-[450px] xl:w-[500px] relative flex flex-col md:flex-row h-auto md:h-[400px] lg:h-[350px] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          aria-label="Close modal"
        >
          ✖
        </button>

        {/* Image Section */}
        <div className="flex-shrink-0 w-full sm:w-1/3 mb-4 sm:mb-0 sm:mr-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto sm:h-40 object-cover rounded-md"
          />
        </div>

        {/* Product Info Section */}
        <div className="flex-grow">
          <h2 id="modal-title" className="text-lg sm:text-xl text-gray-600 font-semibold mt-2">
            {product.title}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">${product.price}</p>

          {/* Description with Read More */}
          <div className="mt-4 text-gray-600 max-w-full md:max-w-sm">
            <p className="text-sm sm:text-base">
              {isDescriptionExpanded
                ? product.description
                : `${product.description.substring(0, 120)}...`}
            </p>
            <button
              onClick={toggleDescription}
              className="text-blue-600 hover:underline mt-2"
            >
              {isDescriptionExpanded ? "Read Less" : "Read More"}
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className={`mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-all ${
              addedToCart ? "bg-green-500" : ""
            }`}
            aria-label="Add product to cart"
          >
            {addedToCart ? "✅ Added to Cart!" : "🛒 Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
