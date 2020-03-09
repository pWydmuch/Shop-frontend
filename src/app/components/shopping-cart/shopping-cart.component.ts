import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, EventEmitter, Output } from "@angular/core";
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

  @Output() onCartEmpted: EventEmitter<any> = new EventEmitter<any>();

  private cartSubscription: Subscription;

  public constructor(private productsService: ProductsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  public emptyCart(): void {
    this.shoppingCartService.empty().subscribe((resp) => {
      this.assignCart(resp);
    });
  }

  public ngOnInit(): void {
    this.productsService.all().subscribe(pr => this.products=pr);
    this.getCart();
  }

  public ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  public getCart(){
    this.shoppingCartService.get().subscribe((resp) => {
      this.assignCart(resp);
    });
  }

  assignCart(resp){
    this.onCartEmpted.emit(resp);
    this.cart = resp.body;
    this.itemCount = this.cart.cartItems.map((x) => x.quantity).reduce((p, n) => p + n, 0);
  }
}
