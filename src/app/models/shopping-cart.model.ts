import { CartItem } from "../models/cart-item.model";


export class ShoppingCart {
  public cartItems: CartItem[] = new Array<CartItem>();
  public deliveryId: string;
  public amountTotal: number = 0;
  public deliveryTotal: number = 0;
  public quantityTotal: number = 0;


  // public updateFrom(src: ShoppingCart) {
  //   this.cartItems = src.cartItems;
  //   this.deliveryOptionId = src.deliveryOptionId;
  //   this.amountTotal = src.amountTotal;
  //   this.deliveryTotal = src.deliveryTotal;
  //   this.quantityTotal = src.quantityTotal;
  // }
}
