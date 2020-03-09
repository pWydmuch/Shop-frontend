import { Injectable } from "@angular/core";
import { Observer } from "rxjs/Observer";
import { CartItem } from "../models/cart-item.model";
import { DeliveryOption } from "../models/delivery-option.model";
import { Product } from "../models/product.model";
import {  ShoppingCart } from "../models/shopping-cart.model";
import { DeliveryOptionsDataService } from "../services/delivery-options.service";
import { ProductsDataService } from "../services/products.service";
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable(
  {
    providedIn:'root'
  }
)
export class ShoppingCartService {
  // private storage: Storage;
  // private deliveryOptions: DeliveryOption[];
  public cart : ShoppingCart;

  // private basicUrl = 'http://localhost:8080';
  private basicUrl = environment.basicUrl;
  private sessionId: string = null;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                'JSESSIONID' : `${this.sessionId}`,
                                  }),
    observe: 'response' as 'body',
    withCredentials: true
  };

  public constructor(private http: HttpClient) {
  }

  setHeaders(){
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json',
                                  'JSESSIONID' : `${this.sessionId}`,}),
      observe: 'response' as 'body',
      withCredentials: true
    };
  }

 

  public get(): Observable<any> {
    return this.http.get<any>(`${this.basicUrl}/cart`, this.httpOptions);
    // return null;
  }

  public addItem(product: Product, quantity: number): Observable<ShoppingCart> {
 
    return this.http.get<ShoppingCart>(`${this.basicUrl}/cart/${product.id}`,this.httpOptions ).pipe(
      tap(_ => console.log(`posted heroid=${product.id}`)));

  }
  public removeItem(product: Product): Observable<ShoppingCart> {
 
    return this.http.delete<ShoppingCart>(`${this.basicUrl}/cart/${product.id}`,this.httpOptions ).pipe(
      tap(_ => console.log(`deleted prod=${product.id}`)));


  }

  // doSth(){
  //   this.setCookie();
  // }

  setCookie(){
    let ses = localStorage.getItem('JSESSIONID');
    console.log(ses);
    this.sessionId = ses;
  }

  public empty(): Observable<ShoppingCart> {
    return this.http.delete<ShoppingCart>(`${this.basicUrl}/cart`,this.httpOptions).pipe(
      tap(_ => console.log(`deleted cart }`)));
    // this.sessionId = null;
    // console.log(localStorage.getItem('JSESSIONID'));
  }

  public saveOrder(): void{
     this.http.get<any>(`${this.basicUrl}/order`,this.httpOptions).pipe(
      tap(_ => console.log(`order saved }`))).subscribe(()=> this.sessionId = null);
    // this.sessionId = null;
    // console.log(localStorage.getItem('JSESSIONID'));
  }

  public setDeliveryOption(deliveryOption: DeliveryOption):  Observable<any> {
    return this.http.put<any>(`${this.basicUrl}/cart/delivery/${deliveryOption.id}`,deliveryOption,this.httpOptions ).pipe(
      tap(_ => console.log(`set delivery=${deliveryOption.id}`)));
    }

  public deleteDeliveryOption():  Observable<any> {
    return this.http.delete<any>(`${this.basicUrl}/cart/delivery`,this.httpOptions ).pipe(
      tap(_ => console.log(`deleted delivery`)));


  }


}
