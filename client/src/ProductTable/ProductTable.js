import React, { Component } from 'react';
import ProductRow from "./ProductRow.js";
import '../App.css';


class ProductTable extends Component {
  render() {
    // Define an array for the products prop
    // Use .map() to put the data of every product into the rows array as a ProductRow component
    var rows = this.props.products
      .map(function(product, i) {
        return (
          <ProductRow
              key={i}
              product={product} />
        );
      });

    // Create a table with different headers for the different values of the products
    // Place the rows array into the body of the table to fill out the rows of the table
    return (
      <table className="table table-bordered table-hover" id="mainTable" border="1">
        <thead>
          <tr>
            <th className="table-header">Product Name</th>
            <th className="table-header">Order Number</th>
            <th className="table-header">X</th>
            <th className="table-header">Y</th>
            <th className="table-header">Z</th>
            <th className="table-header">Material</th>
            <th className="table-header">Drawing Files</th>
            <th className="table-header">Quantity</th>
            <th className="table-header">Required Ship Date</th>
            <th className="table-header">Enter Bid Information</th>
            <th className="table-header">Total Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default ProductTable;
