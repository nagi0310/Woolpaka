import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductPage = () => {
  const { id } = useParams();
  const { fetchProductById, product } = useProductStore();
  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-start text-4xl sm:text-5xl font-bold text-primary-700 mb-8">
          {product?.name}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
          {product ? (
            <ProductCard key={id} product={product} />
          ) : (
            <h2 className="text-3xl font-semibold text-primary-500 col-span-full">
              No product found
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
