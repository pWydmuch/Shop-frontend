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
    this.shoppingCartService.setDeliveryOption(option).subscribe(resp => this.do(resp));
  }

  do(resp){
    this.cart = resp.body;
    console.log(resp);
  }

  public ngOnInit(): void {
    this.deliveryOptions = this.deliveryOptionService.all();
    // this.cart = this.shoppingCartService.get();
    this.shoppingCartService.get().subscribe((resp) => {
      let cart = resp.body;
      this.cartItems = cart.cartItems;
      this.cart = resp.body;
      console.log(this.cart);
      this.itemCount = cart.cartItems.map((x) => x.quantity).reduce((p, n) => p + n, 0);
      this.productsService.all().subscribe((products) => {
        this.products = products;
       
                          //  .map((item) => {
                          //     const product = this.products.find((p) => p.id === item.product.id);
                          //     return {
                          //       ...item,
                          //       product,
                          //       totalCost: item.amount ,
                          //       link: item.link};
                          //  });
      });
   
      
  
    });
    
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }
}
