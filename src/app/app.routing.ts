import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { CheckoutComponent } from "./components/checkout/checkout.component";
import { OrderConfirmationComponent } from "./components/order-confirmation/order-confirmation.component";
import { StoreFrontComponent } from "./components/store-front/store-front.component";

import { PopulatedCartGuard } from './route-guards/populated-cart.guard';


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
            }])
    ]
})
export class AppRoutingModule { }
