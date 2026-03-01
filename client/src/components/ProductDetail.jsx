import { useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import RelatedProducts from "./RelatedProducts";
import toast from "react-hot-toast";
const ProductDetail = ({ product }) => {
  const { user } = useUserStore();
  const { addToCart } = useCartStore();
  const navigate = useNavigate();
  const handleAddToCart = () => {
    if (!user) {
      toast.error("Please Login to add products to cart", { id: "Login" });
      return;
    } else {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    if (!user) {
      toast.error("Please Login to add products to cart", { id: "Login" });
      return;
    } else {
      addToCart(product);
      navigate("/cart");
    }
  };
  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row gap-16 mt-4">
        <div className=" max-w-100 max-h-100 rounded overflow-hidden">
          <img alt="Product" src={product.image} className="max-w-100"></img>
        </div>
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium">{product.name}</h1>
          <div className="mt-6 text-2xl font-medium">
            <p>${product.price}</p>
          </div>
          <p className="mt-6 text-xl font-medium">About Product</p>
          <div className="mt-4 text-primary-500/70">{product.description}</div>
          <div className="flex iterms-center mt-10 gap-4 text-base">
            <button
              onClick={handleAddToCart}
              className="w-full py-4 font-medium bg-primary-200 text-primary-800/80 hover:bg-primary-300 transition cursor-pointer rounded"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="w-full py-4 font-medium bg-primary-700 text-primary-200/80 hover:bg-primary-800 transition  cursor-pointer rounded"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        <RelatedProducts />
      </div>
    </div>
  );
};

export default ProductDetail;
