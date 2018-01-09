var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    initialDisplay();
});

function initialDisplay() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, res) {
        console.log("\nItems Available For Sale:");
        for (i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " | " + res[i].product_name +
                " | " + "Price: $" + res[i].price);
        }
        console.log();
        userPrompt();
    });
}

function userPrompt() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "Enter the ID of the product you would like to purchase: "
        },
        {
            name: "quantity",
            type: "input",
            message: "What is the quantity you would like to buy? "
        }
    ]).then(function (answer) {
        connection.query(
            "SELECT * FROM products WHERE item_id = ?", [answer.id], function (err, res) {
                if (err) {console.log("Invalid product ID");}
               
                else if ((parseInt(answer.quantity) > res[0].stock_quantity)) {
                    console.log("Insufficient Quantity! Only " + res[0].stock_quantity + " in stock.");
                    initialDisplay(); 
                }
                else {
                    var newQuant = res[0].stock_quantity - parseInt(answer.quantity);
                    var purchaseCost = answer.quantity * res[0].price; 
                    updateProduct(newQuant, answer.id);
                    console.log("You purchased " + answer.quantity + " " + res[0].product_name +
                    "\nTotal Cost: $" + purchaseCost);
                    
                }
            });
    });
}

function updateProduct(quantity, id) {
    connection.query("UPDATE products SET ? WHERE ?",
        [
            {
                stock_quantity: quantity
            },
            {
                item_id: id
            }
        ],
        function (err, res) {
            if (err) throw err;
        });
}