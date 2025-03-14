import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/types";

// Load cart only on client
const loadCartFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    try {
      const cartData = localStorage.getItem("cart");
      return cartData ? JSON.parse(cartData) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }
  return [];
};

// Save cart only on client
const saveCartToLocalStorage = (cart: Product[]) => {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }
};

const initialState: { items: Product[] } = {
  items: [], // Start with an empty cart
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload;
    },
    addToCart: (state, action: PayloadAction<Product>) => {
      // Check if the item already exists in the cart
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // If the item is already in the cart, increase its quantity by 1
        state.items[existingItemIndex].quantity += 1;
      } else {
        // If the item is new, add it with quantity 1
        state.items.push({ ...action.payload, quantity: 1 });
      }
      
      saveCartToLocalStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      // Remove the item with the matching ID
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(state.items);
    },
    updateCartItemQuantity: (state, action: PayloadAction<{ id: string, quantity: number }>) => {
      const { id, quantity } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === id);
      if (itemIndex !== -1 && quantity > 0) {
        state.items[itemIndex].quantity = quantity;
      }
      saveCartToLocalStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
