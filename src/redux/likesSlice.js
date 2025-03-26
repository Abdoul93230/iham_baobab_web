import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunks
export const fetchUserLikes = createAsyncThunk(
  "likes/fetchUserLikes",
  async (userId) => {
    const response = await axios.get(
      `${process.env.REACT_APP_Backend_Url}/likes/user/${userId}`
    );
    return response.data;
  }
);

export const toggleLike = createAsyncThunk(
  "likes/toggleLike",
  async ({ userId, product }, { getState }) => {
    const state = getState();
    const isLiked = state.likes.likedProducts.includes(product._id);
    const API_URL = process.env.REACT_APP_Backend_Url;

    if (isLiked) {
      await axios.delete(`${API_URL}/likes/${userId}/${product._id}`);
      return { productId: product._id, action: "remove" };
    } else {
      await axios.post(`${API_URL}/likes`, {
        userId,
        produitId: product._id,
      });
      return { productId: product._id, action: "add" };
    }
  }
);

const likesSlice = createSlice({
  name: "likes",
  initialState: {
    likedProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserLikes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.likedProducts = action.payload.map((like) => like.produit._id);
      })
      .addCase(fetchUserLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { productId, action: likeAction } = action.payload;
        if (likeAction === "add") {
          state.likedProducts.push(productId);
        } else {
          state.likedProducts = state.likedProducts.filter(
            (id) => id !== productId
          );
        }
      });
  },
});

export default likesSlice.reducer;
