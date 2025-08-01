// getSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BackendUrl = process.env.REACT_APP_Backend_Url;
export const getProducts = (setLoading) => async (dispatch) => {
  try {
    const response = await axios.get(`${BackendUrl}/products`);
    if (response?.data?.data) {
      dispatch(setProducts(response.data.data));
    }
    if (setLoading) setLoading(false);
  } catch (error) {
    console.log("Error loading products:", error?.response?.data?.message || error.message);
    if (setLoading) setLoading(false);
  }
};

export const getTypes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BackendUrl}/getAllType`);
    if (response?.data?.data) {
      dispatch(setTypes(response.data.data));
    }
  } catch (error) {
    console.log("Error loading types:", error?.response?.data?.message || error.message);
  }
};

export const getCategories = (setLoading) => async (dispatch) => {
  try {
    const response = await axios.get(`${BackendUrl}/getAllCategories`);
    if (response?.data?.data) {
      dispatch(setCategories(response.data.data));
    }
    if (setLoading) setLoading(false);
  } catch (error) {
    console.log("Error loading categories:", error?.response?.data?.message || error.message);
    if (setLoading) setLoading(false);
  }
};

export const getProducts_Pubs = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BackendUrl}/productPubget`);
    if (response?.data) {
      dispatch(setProducts_Pubs(response.data));
    }
  } catch (error) {
    console.log("Error loading product pubs:", error?.response?.data?.message || error.message);
  }
};

export const getProducts_Commentes = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BackendUrl}/getAllCommenteProduit`);
    if (response?.data) {
      dispatch(setProducts_Commentes(response.data));
    }
  } catch (error) {
    console.log("Error loading commented products:", error?.response?.data?.message || error.message);
  }
};

export const getSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    types: [],
    categories: [],
    products_Pubs: [],
    products_Commentes: [],
  },
  reducers: {
    setProducts: (state, action) => {
      state.data = action.payload;
    },
    setTypes: (stat, action) => {
      stat.types = action.payload;
    },
    setCategories: (stat, action) => {
      stat.categories = action.payload;
    },
    setProducts_Pubs: (stat, action) => {
      stat.products_Pubs = action.payload;
    },
    setProducts_Commentes: (stat, action) => {
      stat.products_Commentes = action.payload;
    },
  },
});

export const {
  setProducts,
  setTypes,
  setCategories,
  setProducts_Pubs,
  setProducts_Commentes,
} = getSlice.actions;

export default getSlice.reducer;
