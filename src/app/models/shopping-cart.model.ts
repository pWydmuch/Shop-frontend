import { CartItem } from "../models/cart-item.model";


export class ShoppingCart {
  public cartItems: CartItem[] = new Array<CartItem>();
  public deliveryId: string;
  public amountTotal: number = 0;
  public deliveryTotal: number = 0;
  public quantityTotal: number = 0;

}
