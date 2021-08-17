import { Cart } from "./Cart";

export class SavingsCalculator {
  howMuchDidISave(cart: Cart) {
    let totalSaved = 0;

    for (var i = 0; i < cart.items.length; i++) {
      let currentLine = cart.items[i];

      let ticketPrice = currentLine.product.pricing.rrp;
      let sellPrice = currentLine.product.pricing.current;

      if (sellPrice.total === ticketPrice.total) {
        // No discount, continue to the next line item
        // break;
      }

      if (sellPrice.total < ticketPrice.total) {
        totalSaved +=
          (ticketPrice.total - sellPrice.total) * currentLine.quantity;
      }
    }

    return totalSaved;
  }
}
