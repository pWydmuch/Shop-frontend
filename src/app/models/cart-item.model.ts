import { Product } from './product.model';

export class CartItem {
  public product: Product;
  public quantity: number = 0;
  public amount: number = 0;
}
