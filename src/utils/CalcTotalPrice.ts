import { CartItem } from "../redux/slices/CartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
   return  items.reduce((sum, item) => (item.price * item.count) + sum, 0);

}