import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { ShoppingCart } from "../../models/shopping-cart.model";
import { ProductsDataService } from "../../services/products.service";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart.component.html"
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  public products: Product[];
  public cart: ShoppingCart;
  public itemCount: number;

  private cartSubscription: Subscription;

  public constructor(private productsService: ProductsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty();
  }

  public ngOnInit(): void {
    this.productsService.all().subscribe(pr => this.products=pr);
    // this.cart = this.shoppingCartService.get().su;
    // this.cartSubscription = this.cart.subscribe((cart) => {
    //   this.doIt(cart);
    // });
    this.getCart();
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  public getCart(){
    this.shoppingCartService.get().subscribe((cart) => {
      this.doIt(cart);
    });
    // this.cartSubscription = this.cart
  }

  doIt(cart){
    this.cart = cart.body;
    this.itemCount = this.cart.cartItems.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    console.log(cart);
  }
}
