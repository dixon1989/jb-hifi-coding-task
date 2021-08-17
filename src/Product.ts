import { Category } from "./Category";
import { Pricing } from "./pricing";

export class Product {
    sku: String;
    description: String;
    category: Category;
    pricing: Pricing;

    constructor(sku? : string, description? : string, pricing? : Pricing) {
        this.sku = sku;
        this.description = description;
        this.pricing = pricing;
    }
}
