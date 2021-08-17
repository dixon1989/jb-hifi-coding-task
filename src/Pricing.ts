export class Pricing {
  rrp: PriceWithTax;
  current: PriceWithTax;

  constructor() {
    this.rrp = new PriceWithTax();
    this.current = new PriceWithTax();
  }

  static Standard(total: number, tax: number): Pricing {
    let result = new Pricing();

    result.rrp = new PriceWithTax(total, tax);
    result.current = new PriceWithTax(total, tax);

    return result;
  }

  static Discounted(
    total: number,
    tax: number,
    discountPercentage: number
  ): Pricing {
    let invertedDiscount: number = 1 - discountPercentage;

    let result = new Pricing();

    result.rrp = new PriceWithTax(total, tax);
    result.current = new PriceWithTax(
      total * invertedDiscount,
      tax * invertedDiscount
    );
    return result;
  }
}

export class PriceWithTax {
  total: number;
  tax: number;

  constructor(total?: number, tax?: number) {
    this.total = total;
    this.tax = tax;
  }
}
