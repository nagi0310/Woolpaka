import toast from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please Login to add products to cart", { id: "Login" });
      return;
    } else {
      addToCart(product);
    }
  };
  return (
    <div
      className={`flex w-full relative flex-col overflow-hidden rounded-lg border border-primary-50 shadow-sm bg-primary-200 hover:scale-103`}
    >
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded">
        <img
          src={product.image}
          alt="product image"
          className="object-cover w-full"
        />
        <div className="absolute inset-0 bg-primary-100/20"></div>
      </div>
      <div className="mt-4 px-5 pb-5">
        <h5 className="text-lg font-semibold tracking-light text-primary-500">
          {product.name}
        </h5>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-2xl font-bold text-primary-700">
              ${product.price}
            </span>
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className="flex items-center gap-2 justify-center cursor-pointer w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium
             text-primary-50 bg-primary-600 focus:outline-none focus:ring-primary-500 focus:border-primary-500 disabled:opacity-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
