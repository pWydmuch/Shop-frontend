import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";

@Component({
  selector: "app-order-confirmation",
  templateUrl: "./order-confirmation.component.html",
  styleUrls: ["./order-confirmation.css"]
})
export class OrderConfirmationComponent implements OnInit {
  public constructor(private shoppingCartService: ShoppingCartService) {}

  public ngOnInit(): void {
    this.shoppingCartService.saveOrder();
    console.log("check");
  }
}
