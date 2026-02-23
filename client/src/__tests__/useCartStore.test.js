import { useCartStore } from "../stores/useCartStore";

describe("useCartStore totals", () => {
  beforeEach(() => {
    const { clearCart } = useCartStore.getState();
    clearCart();
  });

  test("calculates subtotal and total without coupon", () => {
    useCartStore.setState({
      cart: [
        { _id: "1", price: 10, quantity: 2 },
        { _id: "2", price: 5, quantity: 1 },
      ],
    });
    useCartStore.getState().calculateTotals();

    const { subtotal, total } = useCartStore.getState();
    expect(subtotal).toBe(25);
    expect(total).toBe(25);
  });

  test("applies coupon discount to total", () => {
    useCartStore.setState({
      cart: [{ _id: "1", price: 100, quantity: 1 }],
      coupon: { code: "SAVE10", discountPercentage: 10 },
    });
    useCartStore.getState().calculateTotals();

    const { subtotal, total } = useCartStore.getState();
    expect(subtotal).toBe(100);
    expect(total).toBe(90);
  });
});
