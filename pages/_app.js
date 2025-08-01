import { Provider } from "react-redux";
import store from "../src/redux/store";
import "../src/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/tailwind.css";
import "../src/App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  getCategories,
  getProducts,
  getProducts_Commentes,
  getProducts_Pubs,
  getTypes,
} from "../src/redux/ProductsActions";
import io from "socket.io-client";

const BackendUrl = process.env.REACT_APP_Backend_Url;

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize Redux data
    store.dispatch(getProducts(setLoading));
    store.dispatch(getTypes());
    store.dispatch(getCategories(setLoading));
    store.dispatch(getProducts_Pubs());
    store.dispatch(getProducts_Commentes());
    
    // Initialize socket connection
    const socket = io(BackendUrl);
    socket.on("new_message_user", (data) => {
      // Handle new messages
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Provider store={store}>
      <Component {...pageProps} loading={loading} />
    </Provider>
  );
}

export default MyApp;