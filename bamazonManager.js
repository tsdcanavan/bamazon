var inquirer = require("inquirer");
var mysql = require("mysql");

var quitCase = ' ';

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

function endConnect() {
    connection.end();
}
function menuOptions() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Select option...",
                name: "itemid",
                choices: ["View products for sale",
                    "View Low Inventory",
                    "Add to inventory",
                    "Add new product",
                    "Quit"]
            },
        ]).then(function (resp) {

            switch (resp.itemid) {
                case "View products for sale":
                viewInventory();
                    break;

                case "View Low Inventory":
                    viewLowInventory();
                    break;

                case "Add to inventory":
                    console.log("Add inventory");
                    break;

                case "Add new product":
                    console.log("Add new");
                    break;

                case "Quit":
                    quitCase = "!";
                    break;

                default:
                    menuOptions();
                    break;

            }
            //console.log($quitCase);
            if ($quitCase != '!') {
                menuOptions();
            }

        });

}

function viewInventory() {
    console.log("Selecting all records...");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        console.log("Item_id  Product_name  Department_name  price  Stock_qty");
        res.forEach(function (element) {
            console.log(element.item_id,
                element.product_name,
                element.department_name,
                element.price,
                element.stock_quantity);
        });
    });

}

function viewLowInventory() {
    console.log("Selecting low inventory...");
    connection.query("SELECT * FROM products WHERE stock_quantity < ?",[5], function (err, res) {
        if (err) throw err;
        console.log("Item_id  Product_name  Department_name  price  Stock_qty");
        res.forEach(function (element) {
            console.log(element.item_id,
                element.product_name,
                element.department_name,
                element.price,
                element.stock_quantity);
        });
    });
    
}
menuOptions();