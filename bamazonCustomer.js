var inquirer = require("inquirer");
var mysql = require("mysql");
var tables = require("tables");

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'bamazon'
  });

function endConnect() {
    connection.end();
}

function listAllItems() {
    mysql("SELELCT * FROM products");
}

listAllItems();
endConnect();
