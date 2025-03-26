// store.js
import { configureStore } from "@reduxjs/toolkit";
import getReducer from "./ProductsActions";
import likesReducer from "./likesSlice";

const store = configureStore({
  reducer: {
    products: getReducer,
    likes: likesReducer,
  },
});

export default store;
