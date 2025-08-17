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
        
        // console.log('📦 fetchUserLikes payload:', action.payload); // Debug
        
        // Gestion sécurisée des différentes structures de réponse
        let likesData = action.payload;
        
        // Si la réponse a une structure { data: [...] }
        if (action.payload && action.payload.data) {
          likesData = action.payload.data;
        }
        
        // Vérifier si c'est bien un array
        if (Array.isArray(likesData)) {
          state.likedProducts = likesData
            .map((like) => like?.produit?._id)
            .filter(Boolean); // Enlever les valeurs undefined/null
        } else if (Array.isArray(action.payload)) {
          // Si payload est directement un array
          state.likedProducts = action.payload
            .map((like) => like?.produit?._id)
            .filter(Boolean);
        } else {
          // Si ce n'est pas un array, initialiser avec un array vide
          console.warn('⚠️ fetchUserLikes: payload n\'est pas un array:', action.payload);
          state.likedProducts = [];
        }
      })
      .addCase(fetchUserLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        console.error('❌ fetchUserLikes error:', action.error.message);
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { productId, action: likeAction } = action.payload;
        if (likeAction === "add") {
          if (!state.likedProducts.includes(productId)) {
            state.likedProducts.push(productId);
          }
        } else {
          state.likedProducts = state.likedProducts.filter(
            (id) => id !== productId
          );
        }
      })
      .addCase(toggleLike.rejected, (state, action) => {
        state.error = action.error.message;
        console.error('❌ toggleLike error:', action.error.message);
      });
  },
});

export default likesSlice.reducer;