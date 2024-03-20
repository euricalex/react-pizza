import { CartItem } from "../redux/slices/CartSlice";
import { calcTotalPrice } from "./CalcTotalPrice";

export const getCartFomLS = () => {
  const data = localStorage.getItem("cart");
  const items = data ? JSON.parse(data) : [];
  const totalPrice = calcTotalPrice(items);

  return {
    items: items as CartItem[],
    totalPrice,
  };
};
