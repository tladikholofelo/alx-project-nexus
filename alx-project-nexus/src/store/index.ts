import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/products/productSlice";
import cartReducer from "@/src/store/cartSlice"
import uiReducer from "@/src/store/uiSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
