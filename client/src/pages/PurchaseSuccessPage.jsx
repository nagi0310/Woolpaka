import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import LoadingSpinner from "../components/LoadingSpinner";
import axios from "../lib/axios";
import Confetti from "react-confetti";
const PurchaseSuccessPage = () => {
  const [isProcessing, setIsProcessing] = useState(true);
  const { clearCart } = useCartStore();
  const [error, setError] = useState(null);
  useEffect(() => {
    const handleCheckoutSuccess = async (sessionId) => {
      try {
        await axios.post("/payments/checkout-success", {
          sessionId,
        });
        clearCart();
      } catch (error) {
        console.log(error);
      } finally {
        setIsProcessing(false);
      }
    };
    const sessionId = new URLSearchParams(window.location.search).get(
      "session_id",
    );
    if (sessionId) {
      handleCheckoutSuccess(sessionId);
    } else {
      setIsProcessing(false);
      setError("No session Id found in the URL");
    }
  }, [clearCart]);

  if (isProcessing) return <LoadingSpinner />;
  if (error) return `Error: ${error}`;
  return (
    <div className="h-screen flex items-center justify-center px-4">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        gravity={0.1}
        style={{ zIndex: 1 }}
        numberOfPieces={500}
        recycle={false}
      />
      <div className="max-w-md w-full bg-primary-800 rounded-lg shadow overflow-hidden relative z-10">
        <div className="p-6 sm:p-8">
          <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-20 text-primary-50"
            >
              <path
                fillRule="evenodd"
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary-100 mb-2">
            Purchase Succeed!
          </h1>
          <p className="text-primary-300 text-center mb-2">
            Thank you for your order.
          </p>
          <div className="bg-primary-600 rounded-lg p-4 mb-6">
            <div className="flex justify-between items-center mb-2 ">
              <span className="text-sm text-primary-200">Order Number:</span>
              <span className="text-sm font-semibold text-primary-100">
                #123456
              </span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-primary-200">
                Estimated Delivery:
              </span>
              <span className="text-sm font-semibold text-primary-100">
                3 - 5 business days
              </span>
            </div>
          </div>
          <div>
            <Link
              className="w-full bg-primary-200 hover:bg-primary-100 text-primary-700 font-bold py-2 px-4
            rounded transition duration-300 flex items-center justify-center"
              to="/"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseSuccessPage;
