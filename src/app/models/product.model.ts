import { Ingredient } from "../models/ingredient.model";

export class Product {
  public id: string;
  public name: string;
  public link: string;
  public price: number;
  public category: string;
  public ingredients: Ingredient[];
  public description: string;


  public updateFrom(src: Product): void {
    this.id = src.id;
    this.name = src.name;
    this.description = src.description;
    this.price = src.price;
    this.ingredients = src.ingredients.map((i) => {
      let ingredient = new Ingredient();
      ingredient.updateFrom(i);
      return ingredient;
    });
  }
}
