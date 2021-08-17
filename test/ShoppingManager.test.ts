import { LineItem } from "../src/LineItem";
import { Pricing } from "../src/pricing";
import { Product } from "../src/Product";
import { ShoppingManager } from "../src/ShoppingManager";

let testProduct1 = new Product();
testProduct1.sku = "111111";
testProduct1.description = "Test Product 1";
testProduct1.pricing = Pricing.Standard(110, 10);

let testProduct2 = new Product();
testProduct2.sku = "222222";
testProduct2.description = "Test Product 2";
testProduct2.pricing = Pricing.Standard(500, 45.45);

test("Should have a fresh cart on load", () => {
  // Arrange
  let manager = new ShoppingManager();

  // Act
  let cart = manager.GetMyCart();

  // Assert
  expect(cart).not.toBeNull();
  expect(cart.items.length).toBe(0);
});

test("Should be able to retrieve an item after adding it to cart", () => {
  // Arrange
  let manager = new ShoppingManager();
  manager.AddToMyCart(new LineItem(testProduct1, 1));

  // Act
  let cart = manager.GetMyCart();

  // Assert
  expect(cart.items.length).toBe(1);
});

test("Should calculate total correctly after adding two items to cart", () => {
  // Arrange
  let manager = new ShoppingManager();
  manager.AddToMyCart(new LineItem(testProduct1, 1));
  manager.AddToMyCart(new LineItem(testProduct2, 2));

  // Act
  let cart = manager.GetMyCart();

  // Assert
  expect(cart.total).toBe(1110);
});

test("Should calculate no savings with no discounted items", () => {
  // Arrange
  let manager = new ShoppingManager();
  manager.AddToMyCart(new LineItem(testProduct1, 1));

  // Act
  let cart = manager.GetMyCart();

  // Assert
  expect(cart.totalSaved).toBe(0);
});

test("Should calculate savings correctly with discounted lineitem", () => {
  // Arrange
  let manager = new ShoppingManager();
  let discountedProduct = new Product();
  discountedProduct.sku = "333333";
  discountedProduct.description = "Discounted product";
  discountedProduct.pricing = Pricing.Discounted(500, 45.45, 0.2);

  manager.AddToMyCart(new LineItem(discountedProduct, 1));

  // Act
  let cart = manager.GetMyCart();

  // Assert
  // 20% off $500 is $100
  expect(cart.totalSaved).toBe(100);
});

test("Should calculate savings correctly with multiple quantities and lines", () => {
  // Arrange
  let manager = new ShoppingManager();
  let discountedProduct = new Product();
  discountedProduct.sku = "333333";
  discountedProduct.description = "Discounted product";
  discountedProduct.pricing = Pricing.Discounted(1000, 100, 0.25);

  manager.AddToMyCart(new LineItem(testProduct1, 1));
  manager.AddToMyCart(new LineItem(discountedProduct, 2));

  // Act
  let cart = manager.GetMyCart();

  // Assert
  // 25% off $1000 is $250, times 2 is $500
  expect(cart.totalSaved).toBe(500);
});

test("Should calculate savings correctly with large cart", () => {
  // Arrange
  let manager = new ShoppingManager();

  manager.AddToMyCart(
    new LineItem(
      new Product("111111", "Standard product", Pricing.Standard(55, 5)),
      1
    )
  );
  manager.AddToMyCart(
    new LineItem(new Product("222222", "CD", Pricing.Standard(33, 53)), 1)
  );
  manager.AddToMyCart(
    new LineItem(
      new Product("333333", "Some iDevice", Pricing.Standard(2200, 200)),
      1
    )
  );
  manager.AddToMyCart(
    new LineItem(
      new Product(
        "444444",
        "Standard product",
        Pricing.Discounted(100, 10, 0.3)
      ),
      1
    )
  );

  // Act
  let cart = manager.GetMyCart();

  // Assert
  // 30% off $100 is $30
  expect(cart.totalSaved).toBe(30);
});

test("Should calculate savings correctly with lower value items", () => {
  // Arrange
  let manager = new ShoppingManager();

  manager.AddToMyCart(
    new LineItem(new Product("555555", "Batteries", Pricing.Standard(10, 1)), 1)
  );
  manager.AddToMyCart(
    new LineItem(new Product("777777", "Stickers", Pricing.Standard(4, 0.4)), 1)
  );
  manager.AddToMyCart(
    new LineItem(
      new Product(
        "666666",
        "Discounted Cables",
        Pricing.Discounted(77, 7, 0.3)
      ),
      1
    )
  );

  // Act
  let cart = manager.GetMyCart();

  // Assert
  // 30% off $77 is $23.1
  expect(cart.totalSaved).toBe(23.1);
});
