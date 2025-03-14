import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store";
import { setCart, removeFromCart, updateCartItemQuantity, clearCart } from "@/src/store/cartSlice";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";
import Button from "@/components/Button";
import { TrashIcon } from "@heroicons/react/24/solid";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items); // Cart items from Redux state
  const [loading, setLoading] = useState(false); // Loading state for asynchronous actions

  // Load cart from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        if (parsedCart.length > 0) {
          dispatch(setCart(parsedCart)); // Update Redux state with the stored cart
        }
      }
    }
  }, [dispatch]);

  // Handle updating item quantity
  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity < 1) return; // Prevent quantity from going below 1
    setLoading(true);
    setTimeout(() => {
      dispatch(updateCartItemQuantity({ id, quantity })); // Update quantity in Redux
      setLoading(false);
    }, 500); // Simulate async action
  };

  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price);
    const quantity = parseInt(item.quantity, 10);
    if (!isNaN(price) && !isNaN(quantity)) {
      return total + price * quantity; // Accumulate total price
    }
    return total;
  }, 0);

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {loading && <LoadingSpinner />} {/* Show loading spinner while processing */}

      {/* Display when cart is empty */}
      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link href="/">Continue Shopping</Link>
        </p>
      ) : (
        <div>
          {/* Cart Table Header - Hidden on mobile, shown on larger screens */}
          <div className="hidden sm:grid grid-cols-5 font-bold text-lg border-b pb-2 mb-4">
            <div>Product</div>
            <div>Quantity</div>
            <div>Unit Price</div>
            <div>Total Price</div>
            <div>Remove</div>
          </div>

          {/* Cart Table Body */}
          {cartItems.map((item) => {
            const price = parseFloat(item.price); // Unit price
            const quantity = parseInt(item.quantity, 10);
            const itemTotal = !isNaN(price) && !isNaN(quantity) ? price * quantity : 0;

            return (
              <div
                key={item.id}
                className="mb-4 border rounded p-4 sm:border-b sm:grid sm:grid-cols-5 sm:items-center sm:gap-4 sm:py-4"
              >
                {/* Mobile View - Stacked Layout */}
                <div className="sm:hidden">
                  <div className="flex items-center gap-4 mb-2">
                    <img src={item.image} alt={item.name} className="w-16 h-16" />
                    <span className="font-semibold">{item.name}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Quantity:</span>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="px-2 bg-gray-200 rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Unit Price:</span>
                    <span>${price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total:</span>
                    <span>${itemTotal.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => dispatch(removeFromCart(item.id))}
                    className="text-gray hover:text-red-500"
                  >
                    <TrashIcon className="w-6 h-6" />
                  </button>
                </div>

                {/* Desktop/Tablet View - Grid Layout */}
                <div className="hidden sm:flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16" />
                  <span>{item.name}</span>
                </div>

                <div className="hidden sm:flex items-center">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>

                <span className="hidden sm:block">${price.toFixed(2)}</span> {/* Unit price */}

                <span className="hidden sm:block">${itemTotal.toFixed(2)}</span> {/* Accumulative price for the item */}

                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="hidden sm:block text-gray hover:text-red-500"
                >
                  <TrashIcon className="w-6 h-6" />
                </button>
              </div>
            );
          })}

          {/* Total Price - Adjusted for Mobile to resemble Desktop */}
          <div className="mt-4 font-bold text-lg flex justify-between items-center">
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          {/* Cart Actions */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4">
            {/* Clear Cart Button */}
            <Button onClick={() => dispatch(clearCart())} className="bg-red-500 w-full sm:w-auto">
              Clear Cart
            </Button>
            {/* Proceed to Checkout Button */}
            <Link href="/checkout" className="w-full sm:w-auto">
              <Button disabled={cartItems.length === 0} className="w-full sm:w-auto">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
