import { ChangeDetectionStrategy, Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Product } from "../../models/product.model";
import { ShoppingCart } from "../../models/shopping-cart.model";
import { ProductsDataService } from "../../services/products.service";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { Observable } from "rxjs";
import { Observer } from "rxjs/Observer";
import { HttpResponse } from '@angular/common/http';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

@Component({
  // changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-store-front",
  styleUrls: ["./store-front.component.css"],
  templateUrl: "./store-front.component.html"
})
export class StoreFrontComponent implements OnInit, AfterViewInit {
  
  @ViewChild(ShoppingCartComponent,{static: false}) public child:ShoppingCartComponent;

  public products: Product[];

  public productsCat: Product[];

  public cart: ShoppingCart;

  public categories: string[];

  public constructor(private productsService: ProductsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }

  ngAfterViewInit(){

  }

  public addProductToCart(product: Product): void {
    this.shoppingCartService.addItem(product, 1)
    .subscribe((resp) => this.doCart(resp));
  }

  doCart(cart){
    
    this.cart = cart.body;
    this.child.getCart();
    // this.cart= cart;
  }

  public removeProductFromCart(product: Product): void {
    this.shoppingCartService.removeItem(product).subscribe((resp)=> this.doCart(resp));
  }


  public changeCat(event){
    console.log(event.target.value);
    this.productsCat = this.products.filter(pr => pr.category == event.target.value);
    console.log(this.productsCat);
  }
  public changeCatInit(cat){
    console.log(cat);
    this.productsCat = this.products.filter(pr => pr.category == cat);
    console.log(this.productsCat);
  }

  public productInCart(product: Product): boolean {
    let id = product.id;
    let result:boolean = false;
    result = this.cart.cartItems.some(i => i.product.id === id);
    return result;
  }

  public ngOnInit(): void {
     this.productsService.all().subscribe(products=>this.do(products));
     this.shoppingCartService.get().subscribe((cart) => {
      this.doIt(cart);
    });
    
  }


  do(products){
    console.log("prod")
    this.products = products;
    this.shoppingCartService.doSth();
    let cat:string[] = this.products.map(product=> product.category);
    this.categories = [...new Set(cat)];
    this.changeCatInit("RIM");
  
    // console.log(this.products);
  }

  doIt(cart){
    this.cart = cart.body;
    // this.itemCount = this.cart.cartItems.map((x) => x.quantity).reduce((p, n) => p + n, 0);
    // console.log(cart);
  }
}
