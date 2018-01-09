DROP DATABASE IF EXISTS bamazon; 

CREATE DATABASE bamazon; 

USE bamazon; 

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT NOT NULL, 
    product_name VARCHAR(50) NULL, 
    department_name VARCHAR (50) NULL, 
    price INTEGER(10) NULL, 
    stock_quantity INTEGER (5) NULL, 
    PRIMARY KEY (item_id)
); 
    
INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("PlayStation 4", "Electronics", 350, 1000), 
("Bananas", "Produce", 5, 500), ("iPhone X", "Electronics", 1000, 50), ("Dyson Vacuum Cleaner", "Home Goods", 400, 30), 
("Linen Bed Sheets", "Furnishings", 100, 100), ("Advil", "Pharmacy", 12, 200), ("Supreme Hoodie", "Clothing", 500, 5), 
("Crocs", "Footwear", 20, 100), ("Lucky Charms", "Grocery", 8, 80), ("2x4 Plywood", "Hardwear", 20, 200); 

SELECT * FROM products;