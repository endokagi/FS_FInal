const mongoose = require('mongoose')
const Product = require('./models/productSchema')
// #5 Change URL to your local mongodb
const url = "mongodb://mean.psu.ac.th:27017/Cars_Product";
// ===============================

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })

function getAllProducts(req, res) {

    Product.find({}, function (err, data) {
        if (err) {
            res.status(500).json({ status: "error", message: err });
        }
        res.json(data);
    });
}

function getProductById(req, res) {
    var pid = req.params.pid;
    // #6 Get a product by ID
    Product.find({ "serialno": pid }, function (err, products) {
        if (err) res.status(500).json(err);
        res.json(products);
    });
    // ===============================
}

function updateProductById(req, res) {
    var payload = req.body
    var pid = req.params.pid;
    // #7 Update a product by ID (findByIdAndUpdate)
    var updateproduct = req.body;
    Product.findByIdAndUpdate(pid, payload, function (err) {
        if (err) res.status(500).json(err);
        res.json({ status: "update a product" });
    });
    // ===============================
}

function deleteProductById(req, res) {
    var pid = req.params.pid;
    // #8 Delete a product by ID (findByIdAndDelete)
    Product.findByIdAndDelete(pid, function (err) {
        if (err) res.status(500).json(err);
        res.json({ status: "remove a product" });
    });
    // ===============================
}

function addProduct(req, res) {
    console.log("wasdwasd");
    
    var payload = req.body
    console.log("wasd"+payload);
    
    // #9 Add a new product 
    var product = new Product(payload);
    product.save(function (err) {
        if (err) res.status(500).json(err);
        res.json({ status: "Added a product wasd" });
    });
    // ===============================
}

module.exports = {
    getAllProducts: getAllProducts,
    getProductById: getProductById,
    addProduct: addProduct,
    updateProductById: updateProductById,
    deleteProductById, deleteProductById
};