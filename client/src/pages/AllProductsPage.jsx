import { useProductStore } from "../stores/useProductStore";
import ProductCard from "../components/ProductCard";

const AllProductsPage = () => {
  const { products } = useProductStore();

  return (
    <div className="min-h-screen mb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-start text-4xl sm:text-5xl font-bold text-primary-700 mb-8">
          All Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
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
    </div>
  );
};

export default AllProductsPage;
