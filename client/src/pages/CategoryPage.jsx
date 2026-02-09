import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const { fetchProductsByCategory, products } = useProductStore();
  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-start text-4xl sm:text-5xl font-bold text-primary-700 mb-8">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h1>
      </div>
      <div className="mx-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {products.length === 0 ? (
          <h2 className="text-3xl font-semibold text-primary-500 col-span-full">
            No products found
          </h2>
        ) : (
          products?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
