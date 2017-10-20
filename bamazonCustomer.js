var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("table");

var itemSelected;
var qtySelected = 0;

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

function endConnect() {
    connection.end();
}

function listAllItems() {
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

function selectItem() {
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter the item # you want purchase...",
                name: "itemid"
            },
            {
                type: "input",
                message: "How many do you want to purchase?",
                name: "qty",
            },
        ]).then(function (resp) {
            if (resp.itemid) {
                itemSelected = resp.itemid;
                qtySelected = resp.qty;
                checkQty();
            }
            else {
                console.log("Hey! You didn't buy anything!\n");
            }
        });

};

function checkQty() {
    connection.query("SELECT * FROM products WHERE item_id = ?", [itemSelected], function (err, res) {
        if (err) throw err;
        if (parseInt(qtySelected) < parseInt(res[0].stock_quantity)) {
            var newQty = parseInt(res[0].stock_quantity) - parseInt(qtySelected);
            postItem(itemSelected, newQty);
        } else {
            console.log("\nSorry, there isn't enough stock to complete this order.\n")
        }
        listAllItems();
        endConnect();
    });

}

function postItem(item, newQty) {
    connection.query("UPDATE  products SET stock_quantity = ? WHERE item_id = ?", [newQty, item], function (err, res) {
        if (err) throw err;
        console.log("\nCongrats! Your order has been placed.\n");
    });
};

listAllItems();
setTimeout(selectItem, 1000);
