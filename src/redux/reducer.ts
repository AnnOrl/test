import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { TCard } from "../components/Card/Card";

// from api?
export const defaultMinCount = 1;
export const defaultMaxCount = 10;

export type TCartItem = TCard & {
  count: number;
};
export interface CartState {
  items: TCartItem[];
}

const initialState: CartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {
    addItem: (state, action: PayloadAction<TCard>) => {
      state.items = [
        ...state.items,
        { ...action.payload, count: defaultMinCount },
      ];
    },
    clearCart: (state) => {
      state.items = [];
    },

    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    increaseCount: (state, action: PayloadAction<number>) => {
      state.items = state.items.map((item) => {
        if (item.id === action.payload) {
          return {
            ...item,
            count:
              item.count + 1 > defaultMaxCount
                ? defaultMaxCount
                : item.count + 1,
          };
        }
        return item;
      });
    },

    changeCount: (
      state,
      action: PayloadAction<{ id: number; value: number }>
    ) => {
      const { value, id } = action.payload;
      state.items = state.items.map((item) => {
        if (item.id === id) {
          if (value < defaultMinCount) {
            return {
              ...item,
              count: defaultMinCount,
            };
          }
          if (value > defaultMaxCount) {
            return {
              ...item,
              count: defaultMaxCount,
            };
          }
          return {
            ...item,
            count: value,
          };
        }
        return item;
      });
    },
  },
});

export const { addItem, removeItem, increaseCount, changeCount, clearCart } =
  cartSlice.actions;

export const selectCount = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.count, 0);

export const selectItems = (state: RootState) => state.cart.items;

export const calculateTotal = (state: RootState) =>
  state.cart.items.reduce((acc, item) => acc + item.price * item.count, 0);

export default cartSlice.reducer;
