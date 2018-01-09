# Bamazon-MySql

### What this app does: 
Bamazon is an online shop containing a basic list of products that can be purchased. By pulling data from a MySql database, Bamazon will display the  data in the following format:

- The product ID
- The product name 
- The department the product belongs to 
- The price of the product
- The current stock of the product in store 

### The various views: 
Bamazon supports two different user modes: 

1. Customer View (accessed via bamazonCustomer.js)
2. Manager View (accessed via bamazonManager.js)

#### Customer View 
Customer view will begin by displaying all of the products available for sale at that given time, specifically listing the product ID, product name, and price. 

The customer will then be prompted as to which product they would like to purchase, as well as how many units of the product they are looking to purchase. 

![Product Purchase Prompt]
(./app_screenshots/Product Purchase.png)

Once the customer submits their inputs, Bamazon will log the customer's order and display their total costs. 

![Total Cost]
(./app_screenshots/Product Purchase w: Total Cost.png)

The sold items will be removed from the available stock, which can subsequently be seen in the Manager View. 

#### Manager View 
Manager view will begin by giving the mangaer varying actions that they can take, and prompting them to select a certain action to move forward. 

- **View Product for Sale** - Will display all of the products available for sale at that given time, listing the product ID, product name, price, and quantity in stock. 

![View Products for Sale]
(./app_screenshots/View Products for Sale.png)

- **View Low Inventory** - Will display products which have a current stock of less than 5. If no such item has a stock of less than 5, the manager will be shown that 
>There are currently no items with low inventory. 

![View Low Inventory]
(./app_screenshots/View Low Inventory.png)

- **Add to Inventory** - Will prompt the manager for which currently-provided item they would like to add more stock of, as well as the quantity they would like to add. Bamazon will send a confirmation message based on which item/items were added.

![Add to Inventory]
(./app_screenshots/Add to Inventory.png)

- **Add New Product** - Will allow the manager to add an entirely new product to the store's offerings. If selected, Bamazon will prompt a manager for the name of the product, the department in which it will be sold, its price, and the initial stock being held. 

![Add New Product]
(./app_screenshots/Add New Product.png)

![New Product being Shown]
(./app_screenshots/New Product Shown.png)

- **Exit** - Will exit the CLI


### How to Run The App
Before running the app, ensure that you have the correct node modules installed to your machine, specifically MySql and Inquirer. 
Additionally, make sure that the password for the 'root' user corresponds with the correct password for your local MySql server. You can find this near the top of the "bamazonCustomer.js" and "bamazonManager.js" files: 

```
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});
```

*I hope you enjoy using Bamazon in both Customer and Manager Views!* 

-Kyle 