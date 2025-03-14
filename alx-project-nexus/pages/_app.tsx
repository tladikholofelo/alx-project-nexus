import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store } from "@/src/store";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "@/src/store/cartSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CartInitializer = () => {
  const dispatch = useDispatch();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures this only runs on the client

    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log(storedCart);  // Log to ensure cart is correctly loaded
    dispatch(setCart(storedCart));
  }, [dispatch]);

  return null; // Prevents rendering anything before client-side hydration
};

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <CartInitializer />
      <Layout>
        <Component {...pageProps} />
        <ToastContainer />
      </Layout>
    </Provider>
  );
}

export default MyApp;
