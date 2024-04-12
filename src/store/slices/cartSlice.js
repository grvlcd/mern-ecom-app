import { createSlice } from "@reduxjs/toolkit";
import { addDecimal } from "../../utils/addDecimal";
import { updateCart } from "../../utils/updateCart";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;

      const existItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id,
      );

      if (existItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existItem._id ? item : cartItem,
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state, item);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
