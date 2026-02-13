import { Link } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import { useState } from "react";
import { useCartStore } from "../stores/useCartStore";
const GiftCouponCard = () => {
  //   const coupon = "NIOWI8NMIO9";
  //   const isCouponApplied = true;
  const { coupon, isCouponApplied } = useCartStore();
  const [userInputCode, setUserInputCode] = useState("");
  const handleApplyCoupon = async () => {
    console.log(userInputCode);
  };
  const handleRemoveCoupon = async () => {
    console.log(userInputCode);
  };

  return (
    <div className="space-y-4 max-w-90 w-full border border-primary-500 shadow-sm rounded-md bg-primary-700 max-md:mt-16 mt-4 p-5">
      <div>
        <label
          htmlFor="voucher"
          className="mb-2 block text-sm font-medium text-primary-100"
        >
          Do you have a voucher or a gift card?
        </label>
        <input
          type="text"
          id="voucher"
          className="block w-full rounded border border-primary-500 bg-primary-100
        p-2.5 text-sm text-primary-700 focus:outline-none placeholder-primary-500 focus:border-primary-400 focus:ring-primary-400"
          placeholder="Enter code here"
          value={userInputCode}
          onChange={(e) => setUserInputCode(e.target.value)}
          required
        />
      </div>

      <Motion.button
        className="flex w-full items-center justify-center rounded bg-primary-200 px-5 py-2.5 text-sm font-medium text-primary-7-0
          hover:bg-primary-100 docus:outline-none"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleApplyCoupon}
      >
        Apply Code
      </Motion.button>
      {isCouponApplied && coupon && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-primary-100">
            Applied Coupon
          </h3>
          <p className="mt-2 text-sm text-primary-50">
            {coupon.code} - {coupon.discountPercentage}%
          </p>
          <Motion.button
            type="button"
            className="mt-2 flex w-full items-center justify-center rounded bg-primary-100 px-5 py-2.5 text-sm font-medium text-primary-7-0
          hover:bg-red-500 hover:text-primary-50 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveCoupon}
          >
            Remove Coupon
          </Motion.button>
        </div>
      )}
      {coupon && !isCouponApplied && (
        <div className="mt-4">
          <h3 className="text-lg font-medium text-primary-100">
            Your Available Coupon
          </h3>
          <p className="mt-2 text-sm text-primary-50">
            {coupon.code} - {coupon.discountPercentage}%
          </p>
        </div>
      )}
    </div>
  );
};

export default GiftCouponCard;
