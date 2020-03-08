import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';


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

  public all(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      tap(_ => console.log(`fetched podanie id=`))
      // catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
                       
  }
}
