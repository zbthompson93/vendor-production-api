// app.js
// Add express, db.js, and path
var express = require('express');
var app = express();
var db = require('./db');
var path = require("path");

// Define a var that connects to ProductController.js
var ProductController = require('./product/ProductController');
// Use the '/products' hash when calling ProductController
app.use('/products', ProductController);

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Export app.js for use in other files
module.exports = app;
