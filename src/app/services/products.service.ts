import { Injectable } from "@angular/core";
// import { Http } from "@angular/http";
import { Product } from "../models/product.model";
import "rxjs/add/operator/map";
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
// import { Observable } from "rxjs/Observable";
import { Observable } from 'rxjs';
// import { CachcingServiceBase } from "./caching.service";

let count = 0;

@Injectable({
  providedIn:'root'
}
)
export class ProductsDataService{
  private products: Observable<Product[]>;

  public constructor(
    // private http: Http
     private http: HttpClient
    ) {
    
  }

  private url = 'http://localhost:8080/products';

  // public all(): Observable<Product[]> {
  //   return this.cache<Product[]>(() => this.products,
  //                                (val: Observable<Product[]>) => this.products = val,
  //                                () => this.http
  //                                          .get("./assets/products.json")
  //                                          .map((response) => response.json()
  //                                                                     .map((item) => {
  //                                                                       let model = new Product();
  //                                                                       model.updateFrom(item);
  //                                                                       return model;
  //                                                                     })));
  public all(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      tap(_ => console.log(`fetched podanie id=`))
      // catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
                       
  }
}
