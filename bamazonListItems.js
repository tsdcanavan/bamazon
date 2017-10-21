var listAllItems = function () {
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

module.export = "listAllItems";