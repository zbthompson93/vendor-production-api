import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

let urlID = window.location.pathname;
let date = new Date();
let year = date.getFullYear();
let month = date.getMonth() + 1;
let mm = String(month);
if(mm.length === 1) {
  mm = "0" + mm;
}
let day = date.getDate();
let dd = String(day);
if(dd.length === 1) {
  dd = "0" + dd;
}
let currentDate = year + "-" + mm + "-" + dd;
console.log(currentDate);

class BidOnRow extends Component {
  state = {
    value: true
  };
  

  render() {
    // Define a var that is equal to the product prop
    const product = this.props.product;
    // Define vars that are associated with the product prop contents
    const productName = product.productName;
    const productID = product.productID;
    const salesOrderName = product.salesOrderName;
    const quantity = product.quantity;
    //const drawing = product.drawing;
    const vendor = product.vendor;

    // Define an input for the putApi fxn that is has the productID in it. Used for updating products with their price values
    //let putURL = "/products/" + productID + "/" + vendor;

    // Define a var to get to the order number for the vendor
    let orderURL;
    if(urlID === "/") {
      orderURL = urlID + salesOrderName
    } else {
      orderURL = urlID + "/" + salesOrderName;
    }

    // Define a var for the price. Add a $ to the Price display
    let unitPrice = product.unitPrice;
    let unitPriceBox;
    if(unitPrice !== null) {
      unitPriceBox = "$" + unitPrice;
    } else {
      unitPriceBox = "None";
    }

    //
    let totalPrice = product.totalPrice;
    let totalPriceBox;
    if(totalPrice !== null) {
      totalPriceBox = "$" + totalPrice;
    } else {
      totalPriceBox = "None";
    }


    // Add contents of products to different rows in the table
    return (
      <tr>
        <td>{productName}</td>
        <td>{quantity}</td>
        <td><a href={orderURL}>{salesOrderName}</a></td>
        <td>{unitPriceBox}</td>
        <td>{totalPriceBox}</td>
      </tr>
    );
  }
}

export default BidOnRow;
