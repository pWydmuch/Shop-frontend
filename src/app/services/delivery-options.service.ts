import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import { Observable } from "rxjs/Observable";
import { DeliveryOption } from "../models/delivery-option.model";
import { HttpClient } from '@angular/common/http';

@Injectable(
  {
    providedIn:'root'
  }
)
export class DeliveryOptionsDataService  {
  private deliveryOptions: DeliveryOption[] = [
    {id: '1', name: 'Za pobraniem', description: 'Zapłać przy odbiorze', price: 13},
    {id: '2', name: 'Przelewem', description: 'Zapłać z góry', price: 5},
    {id: '3', name: 'InPost', description: 'Odbierz w paczkomacie', price: 4},
  ];

  public constructor(private http: HttpClient) {
   
  }


  public all(): DeliveryOption[] {
    return this.deliveryOptions;

  }
}
