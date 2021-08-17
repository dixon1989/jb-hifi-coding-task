# jbhifi.com.au API
Welcome to JB Hi-Fi's online store front-end. This is an in-progress rebuild, so there's still a few kinks to iron out.

It's built in TypeScript
VSCode is the supported development environment

### Getting started
1. `npm install`

As this is a work in progress, there is no UI built yet - we're focusing on getting the logic right, then surfacing it to the customer.
There are tests written with Jest, covering the important business functionality. Some of them pass. You can run them with `npm test`, or debug them with `F5`.

## Business Requirements
Here's the requirements for the app:

* Products have an "RRP Price" - recommended retail price. This is the "full" price.
* Products also have a "Current Price" - this is what we're currently selling it for. It's always equal to or less than the RRP Price.
* The customer can build a Shopping Cart
* As the customer builds their cart, any discount they're getting vs the RRP Price is tallied up, so we can show them "You've saved $<X>"
  * This "Total Saved" amount is calculated across all line items as: `SUM(([RRP Price Total] MINUS [Current Price Total]) MULTIPLIED BY [Line Quantity])`
