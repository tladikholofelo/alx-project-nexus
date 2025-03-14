import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductState {
  items: Product[];
  status: "idle" | "loading" | "failed";
}

const initialState: ProductState = {
  items: [],
  status: "idle",
};

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  console.log(response.data); // Log the data to ensure it's correct
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log('Loading products...');  // Log to check when it's loading
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log('Products fetched successfully', action.payload);  // Log successful fetch
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        console.log('Failed to fetch products');  // Log failed fetch
        state.status = "failed";
      });
  },
});

export default productSlice.reducer;
