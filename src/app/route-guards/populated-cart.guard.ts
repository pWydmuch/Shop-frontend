import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Observer } from 'rxjs';
import { ShoppingCartService } from '../services/shopping-cart.service';

@Injectable({
  providedIn: 'root'
})
export class PopulatedCartGuard implements CanActivate {
  public constructor(private router: Router,
    private shoppingCartService: ShoppingCartService) { }
    
    public canActivate(): Observable<boolean> {
      return new Observable<boolean>((observer: Observer<boolean>) => {
        const cartSubscription = this.shoppingCartService
                                    .get()
                                    .subscribe(resp => {
                                      // console.log(cart);
                                      let cart = resp.body;
                                        if (cart.cartItems.length === 0) {
                                          observer.next(false);
                                          this.router.navigate(["/"]);
                                        } else {
                                          observer.next(true);
                                        }
                                    });
        return () => cartSubscription.unsubscribe();
      });
    }
  
}
