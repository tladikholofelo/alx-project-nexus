import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/src/store";
import { clearCart, updateQuantity, removeFromCart } from "@/src/store/cartSlice"; // Import actions
import LoadingSpinner from "@/components/LoadingSpinner";
import Button from "@/components/Button";

const Checkout = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items); // Select cart items from Redux state

  // Calculate total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const [loading, setLoading] = useState(false); // Loading state to show spinner during payment processing
  const [success, setSuccess] = useState(false); // Success state to show confirmation message
  const [form, setForm] = useState({ name: "", address: "", cardNumber: "" }); // Form state for user input

  // Handle changes in input fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (simulates payment)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment process with a timeout
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      dispatch(clearCart()); // Clear the cart after successful payment
    }, 2000);
  };

  // If payment is successful, show confirmation message
  if (success) {
    return (
      <div className="container mx-auto p-6 text-center max-w-full lg:max-w-4xl"> {/* Adjust max width */}
        <h1 className="text-2xl font-bold text-green-600 mb-4">Payment Successful! ✅</h1>
        <p>Thank you for your order! Your items will be shipped soon.</p>
        <a href="/shop-now" className="text-blue-500 mt-4 block">Continue Shopping</a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-full lg:max-w-4xl"> {/* Adjust max width */}
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>

      {loading && <LoadingSpinner />} {/* Show loading spinner during payment processing */}

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <a href="/shop-now" className="text-blue-500">Go Shopping</a></p> // Empty cart message
      ) : (
        <>
          {/* Order Summary */}
          <div className="mb-6">
            <h2 className="font-bold text-lg mb-2">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4 border p-4 rounded-lg shadow">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-cover" />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        className="bg-gray-300 px-2 py-1 rounded"
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))} 
                        disabled={item.quantity <= 1} // Prevent quantity from going below 1
                      >
                        -
                      </button>
                      <span className="px-3 py-1 border rounded">{item.quantity}</span>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded"
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} 
                      >
                        +
                      </button>
                    </div>
                  </div>
                  {/* Remove item from cart */}
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            {/* Total price display */}
            <div className="flex justify-between font-bold text-lg mt-4">
              <span>Total:</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Shipping and payment form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="font-bold text-lg">Shipping & Payment</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-2 border"
              required
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Shipping Address"
              className="w-full p-2 border"
              required
              value={form.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              className="w-full p-2 border"
              required
              value={form.cardNumber}
              onChange={handleChange}
            />

            {/* Submit payment button */}
            <Button
              type="submit"
              disabled={loading || cartItems.length === 0} // Disable button if loading or cart is empty
              className={`w-full px-4 py-2 rounded ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 text-white"}`}
            >
              {loading ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`} {/* Show processing text while loading */}
            </Button>
          </form>
        </>
      )}
    </div>
  );
};

export default Checkout;
