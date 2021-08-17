import { Cart } from "./Cart";
import { LineItem } from "./LineItem";
import { SavingsCalculator } from "./SavingsCalculator";

export class ShoppingManager {
  cart: Cart;
  calculator: SavingsCalculator;

  constructor() {
    this.cart = new Cart();
    this.calculator = new SavingsCalculator();
  }

  GetMyCart(): Cart {
    return this.cart;
  }

  AddToMyCart(item: LineItem): Cart {
    this.cart.items.push(item);
    this.cart.total += item.product.pricing.current.total * item.quantity;
    this.cart.totalSaved = this.calculator.howMuchDidISave(this.cart);
    return this.cart;
  }

  NewCart() {
    this.cart = new Cart();
  }
}
