import { LineItem } from "./LineItem";

export class Cart {
  items: Array<LineItem>;
  total: number;
  totalSaved: number;

  constructor() {
    this.totalSaved = 0;
    this.total = 0;
    this.items = new Array<LineItem>();
  }
}
