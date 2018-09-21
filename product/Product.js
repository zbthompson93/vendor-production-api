// Product.js
// Require mongoose
var mongoose = require('mongoose');
// Create a new mongoose schema that creates the following fields in the database
var ProductSchema = new mongoose.Schema({
  productName: String,
  productID: String,
  salesOrderName: String,
  quantity: Number,
  x: String,
  y: String,
  z: String,
  material: String,
  reqShipDate: String,
  drawing: String,
  stepFile: String,
  listPrice: String,
  //
  vendor: String,
  unitPrice: Number,
  totalPrice: Number,
  notes: String,
  award: Boolean,
  awardDate: String,
  shipped: Boolean,
  late: Boolean,
  newShipDate: String,
  prodQuestionCheck: Boolean,
  prodQuestion: String,
  createdDate: Number,
  daysToBidOn: Number
});
mongoose.model('Product', ProductSchema);
module.exports = mongoose.model('Product');
