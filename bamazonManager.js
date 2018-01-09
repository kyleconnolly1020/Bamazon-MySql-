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
    managerActions();
});

function managerActions() {
    inquirer.prompt([
        {
            type: "list",
            message: "Which action would you like to take?",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"],
            name: "action"
        }
    ]).then(function (user) {
        switch (user.action) {
            case "View Products for Sale":
                viewProducts();
                break;

            case "View Low Inventory":
                lowInventory();
                break;

            case "Add to Inventory":
                addtoInventory();
                break;

            case "Add New Product":
                addNewProduct();
                break;

            case "Exit":
                process.exit(0);
                break;
        }
    });
}

function viewProducts() {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function (err, res) {
        console.log("\nItems Available For Sale:");
        for (i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " | " + res[i].product_name +
                " | " + "Price: $" + res[i].price + " | " + res[i].stock_quantity + " in stock");
        }
        console.log();
        managerActions();
    });
}

function lowInventory() {
    var query = "SELECT * FROM products WHERE stock_quantity < 5";
    console.log("\nProducts low on inventory: ");
    connection.query(query, function (err, res) {
        if (res.length === 0) {
            console.log("There are currently no items with low inventory\n");
        }
        else {
            for (i = 0; i < res.length; i++) {
                console.log("Product ID: " + res[i].item_id + " | " + res[i].product_name +
                    " | " + "Price: $" + res[i].price + " | " + res[i].stock_quantity + " in stock");
            }
            console.log();
        }
        managerActions();
    });
}

function addtoInventory() {
    var query = "SELECT item_id, product_name, price, stock_quantity FROM products";
    connection.query(query, function (err, res) {
        console.log("\nItems Available For Sale:");
        for (i = 0; i < res.length; i++) {
            console.log("Product ID: " + res[i].item_id + " | " + res[i].product_name +
                " | " + "Price: $" + res[i].price + " | " + res[i].stock_quantity + " in stock");
        }
        console.log();

        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "Enter the ID of the item you would like to add more of",
            },
            {
                name: "quantity",
                type: "input",
                message: "How much stock would you like to add?"
            }
        ]).then(function (answer) {
            connection.query("SELECT * FROM products WHERE item_id = ?", [answer.id], function (err, res) {
                if (err) { console.log("Invalid product ID"); }

                var newQuant = res[0].stock_quantity + parseInt(answer.quantity);
                updateProduct(newQuant, answer.id);
                console.log("You added " + answer.quantity + " " + res[0].product_name + "\n")

                managerActions();
            });

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

function addNewProduct() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the product you would like to add?"
        },
        {
            name: "department",
            type: "input",
            message: "In which department will the product be sold?"
        },
        {
            name: "price",
            type: "input",
            message: "Set the price of the product: ",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        },
        {
            name: "quantity",
            type: "input",
            message: "please set the initial stock quantity of the product: ",
            validate: function (value) {
                if (isNaN(value) === false) {
                    return true;
                }
                return false;
            }
        }
    ]).then(function(answer){
        connection.query(
            "INSERT INTO products SET ?", 
            {
                product_name: answer.name, 
                department_name: answer.department, 
                price: answer.price,
                stock_quantity: answer.quantity
            },
            function(err) {
                if (err) throw err;
                console.log("New " + answer.name + " units were added to the store\n");
                managerActions();
            }
        );
    })
}