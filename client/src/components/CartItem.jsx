import { useCartStore } from "../stores/useCartStore";

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCartStore;
  return (
    <div className="rounded-lg border p-4 shadow-sm border-primary-700 bg-primary-800 md:p-6 mb-4">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0 overflow-hidden">
        <div className="shrink-0 md:order-1 flex items-center justify-between">
          <img
            src={item.image}
            alt="product image"
            className="w-20 h-20 md:h-32 md:w-32 rounded object-cover "
          />
        </div>

        <label className="sr-only">Choose quantity:</label>
        <div className="flex items-center justify-between md:order-3 md:justify-end gap-2">
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="h-5 w-5 shrink-0 items-center justify-center rounded-md border border-primary-600 
          bg-primary-700 hover:bg-primary-600 focus:outline-none text-primary-100 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          </button>
          <p className="text-primary-50">{item.quantity}</p>
          <button
            onClick={() => updateQuantity(item._id, item.quantity - 1)}
            className="h-5 w-5 shrink-0 items-center justify-center rounded-md border border-primary-600 
          bg-primary-700 hover:bg-primary-600 focus:outline-none text-primary-100 cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </button>
          <div className="text-end md:order-4 md:w-16">
            <p className="text-base font-bold text-primary-50">${item.price}</p>
          </div>
        </div>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md md:justify-between">
          <p className="text-base font-medium text-primary-50 hover:text-primary-300 hover:underline">
            {item.name}
          </p>
          <p className="text-sm text-primary-50 hover:text-primary-300 hover:underline">
            Category: {item.category[0].toUpperCase() + item.category.slice(1)}
          </p>
        </div>
        <div className="flex items-center gap-4 md:order-5">
          <button
            className="flex items-center text-sm font-medium text-primary-100 hover:text-red-500 
              hover:underline cursor-pointer"
            onClick={() => {
              removeFromCart(item._id);
            }}
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
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
