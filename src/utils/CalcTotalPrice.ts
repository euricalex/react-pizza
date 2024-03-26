import { CartItem } from "../redux/slices/CartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
   return  items.reduce((sum, item) => (item.price * item.count) + sum, 0);

}


// https://dodopizza.azureedge.net/static/Img/Products/f035c7f46c0844069722f2bb3ee9f113_584x584.jpeg