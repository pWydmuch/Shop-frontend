import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule} from '@angular/common/http';
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routing";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { ShoppingCartComponent } from "./components/shopping-cart/shopping-cart.component";
import { StoreFrontComponent } from "./components/store-front/store-front.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { ToZlotyPipe } from './pipes/to-zloty.pipe';

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
    ToZlotyPipe
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [

  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
