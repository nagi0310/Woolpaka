import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import MainBanner from "../components/MainBanner";
import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";

export default function HomePage() {
  const { fetchFeaturedProducts, products, isLoading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32">
      <MainBanner />
      <Categories />
      {!isLoading && products.length > 0 && (
        <FeaturedProducts featuredProducts={products} />
      )}
    </div>
  );
}
