import { Ingredient } from "../models/ingredient.model";

export class Product {
  public id: string;
  public name: string;
  public link: string;
  public price: number;
  public category: string;
  public ingredients: Ingredient[];
  public description: string;
}
