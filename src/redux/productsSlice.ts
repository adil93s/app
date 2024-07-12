import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "../models/entities";

export interface ProductState {
  products: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  status: "idle",
  error: null,
};

const apiUrl = process.env.REACT_APP_API_URL;

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(`${apiUrl}/product`);
  return response.data;
});

export const addProductThunk = createAsyncThunk("products/addProduct", async (newProduct: Product) => {
  const response = await axios.post(`${apiUrl}/product`, newProduct);
  return response.data;
});

export const updateProductThunk = createAsyncThunk("products/updateProduct", async (updatedProduct: Product) => {
  const response = await axios.patch(`${apiUrl}/product/${updatedProduct._id}`, updatedProduct);
  return response.data;
});

export const deleteProductThunk = createAsyncThunk("products/deleteProduct", async (id: string) => {
  await axios.delete(`${apiUrl}/product/${id}`);
  return id;
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      .addCase(addProductThunk.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product._id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
