// ProductController.js
// Require express, express router, and body-parser
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
// URL-encode with body-parser
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Set Product var as schema in Product.js
var Product = require('./Product');

module.exports = router;
var date = new Date();


// Creates a new product with a POST
router.post('/', function (req, res) {
    Product.create({
            productName : req.body.productName,
            productID: req.body.productID,
            salesOrderName : req.body.salesOrderName,
            quantity: req.body.quantity,
            x: req.body.x,
            y: req.body.y,
            z: req.body.z,
            material: req.body.material,
            reqShipDate: req.body.reqShipDate,
            drawing: req.body.drawing,
            stepFile: req.body.stepFile,
            vendor: req.body.vendor,
            unitPrice: req.body.unitPrice,
            totalPrice: req.body.totalPrice,
            notes: req.body.notes,
            award: req.body.award,
            awardDate: req.body.awardDate,
            listPrice: req.body.listPrice,
            shipped: req.body.shipped,
            late: req.body.late,
            newShipDate: req.body.newShipDate,
            prodQuestionCheck: req.body.prodQuestionCheck,
            prodQuestion: req.body.prodQuestion,
            createdDate: date.getTime(),
            daysToBidOn: req.body.daysToBidOn
        },
        function (err, product) {
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(product);
        });
});

// Returns all of the products in the database with GET
router.get('/', function (req, res) {
    Product.find({}, function (err, products) {
        if (err) return res.status(500).send("There was a problem finding the products.");
        res.status(200).send(products);
    });
});

module.exports = router;

// Gets all products associated with the same salesOrderName
router.get('/:salesOrderName', function (req, res) {
    Product.find({"salesOrderName": req.params.salesOrderName}, function (err, products) {
        if (err) return res.status(500).send("There was a problem finding the products.");
        res.status(200).send(products);
    });
});

router.put('/:productID/:vendor', function (req, res) {
    Product.findOneAndUpdate({"productID": req.params.productID, "vendor": req.params.vendor}, req.body, {new: true}, function (err, product) {
        if (err) return res.status(500).send("There was a problem updating the product.");
        res.status(200).send(product);
    });
});

router.get('/vendor/:vendor', function (req, res) {
    Product.find({"vendor": req.params.vendor}, function (err, product) {
        if (err) return res.status(500).send("There was a problem updating the product.");
        res.status(200).send(product);
    });
});

router.get('/vendor/:vendor/:salesOrderName', function (req, res) {
    Product.find({"salesOrderName": req.params.salesOrderName, "vendor": req.params.vendor}, req.body, {new: true}, function (err, product) {
        if (err) return res.status(500).send("There was a problem updating the product.");
        res.status(200).send(product);
    });
});

// DELETES A Sales Order FROM THE DATABASE
router.delete('/:productID/:vendor', function (req, res) {
    Product.findOneAndRemove({"productID": req.params.productID, "vendor": req.params.vendor}, function (err, salesOrder) {
        if (err) return res.status(500).send("There was a problem deleting the sales order.");
        res.status(200).send("Product was deleted.");
    });
});
