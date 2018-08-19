DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products (
    itemID INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY Key (itemID)
)

SELECT * FROM products


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Notebooks", "School Supplies", "5.50", "500"),
("Pens", "School Supplies","1.25", "200"),
("Paper Towels ", "Kitchen","3.00", "300"),
("Knife Set", "Kitchen","45.00", "250"),
("Finding Nemo", "Movies","12.50", "350"),
("Apple Chargers", "Electronics","45.99", "360"),
("Candy Land", "Games","15.50", "400"),
("Monsters Inc", "Movies","14.00", "400"),
("Monopoly", "Games","19.99", "300")
("Apple Headphones", "Electronics", "35.00", "300");

CREATE TABLE departments(
    departmentID MEDIUMINT AUTO_INCREMENT NOT NULL,
    departmentName VARCHAR(50) NOT NULL,
    overHeadCosts DECIMAL(10,2) NOT NULL,
    totalSales DECIMAL(10,2) NOT NULL,
    PRIMARY KEY(departmentID));

INSERT INTO departments(departmentName, overHeadCosts, totalSales)
VALUES ('School Supplies', 2500.00, 15000.00),
    ('Electronics', 20000.00, 12000.00),
    ('Kitchen', 30000.00, 15000.00),
    ('Dog Treats', 3000.00, 12000.00),
    ('Movies', 1200.00, 15000.00),
    ('Games', 40000.00, 12000.00);
