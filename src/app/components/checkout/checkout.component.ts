import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { CartItem } from "../../models/cart-item.model";
import { DeliveryOption } from "../../models/delivery-option.model";
import { Product } from "../../models/product.model";
import { ShoppingCart } from "../../models/shopping-cart.model";
import { DeliveryOptionsDataService } from "../../services/delivery-options.service";
import { ProductsDataService } from "../../services/products.service";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";


@Component({
  selector: "app-checkout",
  styleUrls: ["./checkout.component.scss"],
  templateUrl: "./checkout.component.html"
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public deliveryOptions: DeliveryOption[];
  public cart: ShoppingCart;
  public cartItems: CartItem[];
  public itemCount: number;

 
  
  private products: Product[];
  private cartSubscription: Subscription;

  public constructor(private productsService: ProductsDataService,
                     private deliveryOptionService: DeliveryOptionsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public setDeliveryOption(option: DeliveryOption): void {
    console.log(this.cart.deliveryId)
    this.shoppingCartService.setDeliveryOption(option).subscribe(resp => this.assignCart(resp));
  }

  assignCart(resp){
    this.cart = resp.body;
  }

  public ngOnInit(): void {
    this.deliveryOptions = this.deliveryOptionService.all();
    this.shoppingCartService.get().subscribe((resp) => {
      this.cart = resp.body;

      console.log(this.cart.deliveryId)
      // console.log(cart);
      this.cartItems = this.cart.cartItems;
      this.itemCount = this.cart.cartItems.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products;
      });
    });
    
  }

  public ngOnDestroy(): void {
    this.shoppingCartService.deleteDeliveryOption().subscribe(resp => console.log(resp));
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
