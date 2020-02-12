import { Injectable } from "@angular/core";
// import { StorageService } from "../services/storage.service";
// import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { CartItem } from "../models/cart-item.model";
import { DeliveryOption } from "../models/delivery-option.model";
import { Product } from "../models/product.model";
import { ShoppingCart } from "../models/shopping-cart.model";
import { DeliveryOptionsDataService } from "../services/delivery-options.service";
import { ProductsDataService } from "../services/products.service";
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable(
  {
    providedIn:'root'
  }
)
export class ShoppingCartService {
  // private storage: Storage;
  private subscriptionObservable: Observable<ShoppingCart>;
  private subscribers: Array<Observer<ShoppingCart>> = new Array<Observer<ShoppingCart>>();
  private products: Product[];
  // private deliveryOptions: DeliveryOption[];
  public cart : ShoppingCart;

  private basicUrl = 'http://localhost:8080';
  private sessionId: string = null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'JSESSIONID' : `${this.sessionId}`,
                                  }),
    observe: 'response',
    withCredentials: true
  };

  

  public constructor(private http: HttpClient
        
                     ) {

  }

  setHeaders(){
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                  'JSESSIONID' : `${this.sessionId}`,
                                    }),
      observe: 'response',
      withCredentials: true
    };
  }

 

  public get(): Observable<any> {
    return this.http.get<any>(`${this.basicUrl}/cart`, this.httpOptions);
    // return null;
  }

  public addItem(product: Product, quantity: number): Observable<any> {
 
    let res: Observable<any>  = this.http.get<any>(`${this.basicUrl}/cart/${product.id}`,this.httpOptions ).pipe(
      tap(_ => console.log(`posted heroid=${product.id}`)));

    return res;  
  }
  public removeItem(product: Product): Observable<any> {
 
    let res: Observable<any>  = this.http.delete<any>(`${this.basicUrl}/cart/${product.id}`,this.httpOptions ).pipe(
      tap(_ => console.log(`deleted prod=${product.id}`)));

    return res;  
  }

  doSth(){
    this.setCookie();
  }

  setCookie(){
    let ses = localStorage.getItem('JSESSIONID');
    console.log(ses);
    this.sessionId = ses;
  }

  public empty(): void {
    this.http.get<any>(`${this.basicUrl}/cart/rem`,this.httpOptions).pipe(
      tap(_ => console.log(`deleted cart }`))).subscribe(()=> this.sessionId = null);
    // this.sessionId = null;
    console.log(localStorage.getItem('JSESSIONID'));
  }

  public setDeliveryOption(deliveryOption: DeliveryOption):  Observable<any> {
    return this.http.put<any>(`${this.basicUrl}/cart/${deliveryOption.id}`,deliveryOption,this.httpOptions ).pipe(
      tap(_ => console.log(`deleted prod=${deliveryOption.id}`)));


  }


}
