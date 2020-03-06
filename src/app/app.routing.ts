import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CheckoutComponent } from "./components/checkout/checkout.component";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { StoreFrontComponent } from "./components/store-front/store-front.component";

import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PopulatedCartGuard } from './route-guards/populated-cart.guard';
import { AuthGuard } from './route-guards/auth.guard';

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot([
            {
                redirectTo: "/main",
                path: "" ,
                pathMatch: "full"
            },
            {
                component: LoginComponent,
                path: "login" 
            },
            {
                component: LogoutComponent,
                path: "logout" ,
                canActivate:[AuthGuard]
            },
            {
                canActivate: [PopulatedCartGuard],
                component: CheckoutComponent,
                path: "checkout"
            },
            {
                canActivate: [PopulatedCartGuard],
                component: OrderConfirmationComponent,
                path: "confirmed"
            },
            {
                component: StoreFrontComponent,
                path: "main",
                // canActivate:[AuthGuard]
            }])
    ]
})
export class AppRoutingModule { }
