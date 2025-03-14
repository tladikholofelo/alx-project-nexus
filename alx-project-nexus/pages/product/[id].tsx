import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "@/src/features/products/productSlice";
import { RootState, AppDispatch } from "@/src/store";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();
  const { product, status } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id as string));
    }
  }, [dispatch, id]);

  if (status === "loading") return <LoadingSpinner />;
  if (status === "error") return <div className="text-center text-red-500 py-10">Failed to load product.</div>;

  return (
    <div className="container mx-auto py-8">
      <Navbar />
      <h1 className="text-3xl font-semibold text-center mt-8 mb-6">{product?.name}</h1>
      <p className="text-gray-600 text-center">{product?.description}</p>
      <Footer />
    </div>
  );
};

export default ProductPage;
