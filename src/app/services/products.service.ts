import { Injectable } from "@angular/core";
import { Product } from "../models/product.model";
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


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

  private url = `${environment.basicUrl}/products`;

  public all(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url).pipe(
      tap(_ => console.log(`fetched podanie id=`))
      // catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
                       
  }
}
