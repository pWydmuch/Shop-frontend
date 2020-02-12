import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
// import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { StoreFrontComponent } from "./components/store-front/store-front.component";
// import { PopulatedCartRouteGuard } from "./route-gaurds/populated-cart.route-gaurd";
// import { DeliveryOptionsDataService } from "./services/delivery-options.service";
// import { ProductsDataService } from "./services/products.service";
// import { ShoppingCartService } from "./services/shopping-cart.service";
// import { LocalStorageServie, StorageService } from "./services/storage.service";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslatePipe } from './translate.pipe';
import { LoginComponent } from './components/login/login.component';

@NgModule({
 
  declarations: [
    AppComponent,
    ShoppingCartComponent,
    StoreFrontComponent,
    CheckoutComponent,
    OrderConfirmationComponent,
    NavbarComponent,
    FooterComponent,
    TranslatePipe,
    LoginComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    // HttpModule,
    AppRoutingModule
  ],
  providers: [

  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
