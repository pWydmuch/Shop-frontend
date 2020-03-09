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
  selector: "app-store-front",
  styleUrls: ["./store-front.component.css"],
  templateUrl: "./store-front.component.html"
})
export class StoreFrontComponent implements OnInit, AfterViewInit {
  
  ngAfterViewInit(): void {
   
  }
  
  @ViewChild(ShoppingCartComponent,{static: false}) public child:ShoppingCartComponent;

  public products: Product[];

  public productsCat: Product[];

  public cart: ShoppingCart;

  public categories: string[];

  public constructor(private productsService: ProductsDataService,
                     private shoppingCartService: ShoppingCartService) {
  }


  public addProductToCart(product: Product): void {
    this.shoppingCartService.addItem(product, 1)
    .subscribe((resp) => this.assignCartChild(resp));
  }

  assignCartChild(resp){
    this.cart = resp.body;
    this.child.getCart();
  }

  public removeProductFromCart(product: Product): void {
    this.shoppingCartService.removeItem(product).subscribe((resp)=> this.assignCartChild(resp));
  }


  public changeCat(event){

    this.productsCat = this.products.filter(pr => pr.category == event.target.value);

  }
  public changeCatInit(cat){ 
    this.productsCat = this.products.filter(pr => pr.category == cat);
  }

  public productInCart(product: Product): boolean {
    let id = product.id;
    let result:boolean = false;
    result = this.cart.cartItems.some(i => i.product.id === id);
    return result;
  }

  public ngOnInit(): void {
     this.productsService.all().subscribe(products=>this.assignProducts(products));
     this.shoppingCartService.get().subscribe((resp) => {
      this.assignCart(resp);
    });
    
  }

  assignProducts(products){
    this.products = products;
    this.shoppingCartService.setCookie();
    let cat:string[] = this.products.map(product=> product.category);
    this.categories = [...new Set(cat)];
    this.changeCatInit("RIM");
  }

assignCart(resp){
    this.cart = resp.body;
  }
}
