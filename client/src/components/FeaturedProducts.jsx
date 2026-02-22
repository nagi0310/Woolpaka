import { useState } from "react";
import { useEffect } from "react";
import ProductCard from "./ProductCard";

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrenIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrenIndex((prevIndex) => prevIndex + itemsPerPage);
  };

  const prevSlide = () => {
    setCurrenIndex((prevIndex) => prevIndex - itemsPerPage);
  };

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex >= featuredProducts.length - itemsPerPage;

  return (
    <div className="py-12 ">
      <div className="container mx-auto">
        <h2 className="text-start text-2xl sm:text-3xl font-medium text-primary-700 mb-4">
          Recommended
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className={`flex gap-${itemsPerPage} transition-transform duration-300 ease-in-out`}
              style={{
                transform: `translateX(-${
                  currentIndex * (100 / itemsPerPage)
                }%)`,
              }}
            >
              {featuredProducts.map((product) => (
                <div
                  key={product._id}
                  className="shrink-0"
                  style={{
                    flexBasis: `calc((100% - (${
                      itemsPerPage - 1
                    } * 1rem)) / ${itemsPerPage})`,
                  }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-6 transform -translate-y-1/2 p-2 rounded-full transition-colors
          duration-300 ${
            isStartDisabled
              ? "bg-gray-200/50 cursor-not-allowed "
              : "bg-primary-200/50 hover:bg-primary-300"
          }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-6 transform -translate-y-1/2 p-2 rounded-full transition-colors
          duration-300 ${
            isEndDisabled
              ? "bg-gray-200/50 cursor-not-allowed"
              : "bg-primary-200/50 hover:bg-primary-300"
          }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
