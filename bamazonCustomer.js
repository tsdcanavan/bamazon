var inquirer = require("inquirer");
var mysql = require("mysql");
var table = require("table");


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

};

function postItem() {

};

listAllItems();
endConnect();
