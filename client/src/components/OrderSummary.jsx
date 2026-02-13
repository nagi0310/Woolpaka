import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { motion as Motion } from "framer-motion";
const OrderSummary = () => {
  const { total, subtotal, coupon, isCouponApplied } = useCartStore();
  //   const savings = subtotal - total;
  const savings = 2;
  return (
    <div className="max-w-90 w-full border border-primary-500 shadow-sm rounded-md bg-primary-700 max-md:mt-16 mt-10 p-5">
      <h2 className="text-3xl md:texl-3xl font-bold text-primary-100">
        Order Summary
      </h2>
      <hr className="border-primary-300 my-5" />
      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-formal text-primary-100">
              Original price
            </dt>
            <dd className="text-base font-medium text-primary-50">
              ${subtotal.toFixed(2)}
            </dd>
          </dl>
          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-formal text-primary-100">
                Discount
              </dt>
              <dd className="text-base font-medium text-primary-50">
                -${savings.toFixed(2)}
              </dd>
            </dl>
          )}
          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-formal text-primary-50">
                Coupon {coupon.code}
              </dt>
              <dd className="text-base font-medium text-primary-50">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between border-t border-primary-300 pt-2">
            <dt className="text-lg font-bold text-primary-50">Total</dt>
            <dd className="text-lg font-bold text-primary-50">
              ${total.toFixed(2)}
            </dd>
          </dl>
        </div>
        <Motion.button
          className="flex w-full items-center justify-center rounded bg-primary-200 px-5 py-2.5 text-sm font-medium text-primary-7-0
          hover:bg-primary-100 docus:outline-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Proceed to Check
        </Motion.button>
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="test-sm font-normal text-primary-300">or</span>
          <Link
            to="/"
            className="flex items-center gap-2 txt-sm font-medium text-primary-100 underline hover:text-primary-50 hover:no-underline"
          >
            Continue Shopping{" "}
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
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
