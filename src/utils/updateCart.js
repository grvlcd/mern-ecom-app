import { addDecimal } from "./addDecimal";

export const updateCart = (state) => {
  const itemsPrice = state.cartItems.reduce(
    (accu, cartItem) => accu + (cartItem.price * 100 * cartItem.qty) / 100,
    0,
  );

  state.itemsPrice = addDecimal(itemsPrice);

  const shippingPrice = state.itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimal(shippingPrice);

  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimal(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  state.totalPrice = addDecimal(totalPrice);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
