import { useCartStore } from "../stores/useCartStore";
import { motion as Motion } from "framer-motion";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const CartPage = () => {
  const { cart } = useCartStore();
  if (cart.length === 0) return <EmptyCartUI />;

  return (
    <div className="py-8 md:py-16">
      <div className="mx-auto max-w-7xl px-4 2xl:px-0">
        <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
          <Motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {cart.map((item) => (
              <CartItem key={item._id} item={item} />
            ))}
          </Motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

const EmptyCartUI = () => (
  <Motion.div
    className="flex flex-col items-center justify-center space-y-4 py-16"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-20"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
    <h3 className="text-2xl font-semibold">Your cart is Empty</h3>
    <p className="text-primary-500">
      Looks like you {"haven't"} added anything to your cart yet.
    </p>
    <Link
      to="/"
      className="mt-4 rounded-md bg-primary-500 px-6 py-2 text-primary-50 transition-colors hover:bg-primary-700"
    >
      Start Shopping
    </Link>
  </Motion.div>
);
