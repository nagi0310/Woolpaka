import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import ProductDetail from "../components/ProductDetail";

const ProductPage = () => {
  const { id } = useParams();
  const { fetchProductById, product } = useProductStore();
  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id]);

  return (
    <div className="min-h-screen">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {product ? (
          <div>
            <div className="text-primary-500 text-lg underline cursor-pointer">
              <Link to="/">Home</Link>/<Link to="/products">Products</Link>/
              <Link to={`/products/${product.category}`}>
                {product.category}
              </Link>
              /<span className="text-primary-700">{product.name}</span>
            </div>

            <ProductDetail product={product} />
          </div>
        ) : (
          <h2 className="text-3xl font-semibold text-primary-500 col-span-full">
            No product found
          </h2>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
