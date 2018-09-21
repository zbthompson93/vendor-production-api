import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';

let urlID = window.location.pathname;

class ProductRow extends Component {
  state = {
    priceValue: '',
    notesValue: null
  };

  // Set the state to the new value in the price input field
  // handleChange = (event) => {
  //   this.setState({
  //     value: event.target.value,
  //   });
  // }

  // handleChange = (event) => {
  //   this.setState({
  //     [event.target.name]: event.target.value
  //   });
  // }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === 'text' ? target.value : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  // Define a function that gets the value of the price input field and updates the product with that price
  putNewPrice = (input, quantity) => {
    let newPrice = this.state.priceValue;
    let priceResult = (newPrice * quantity).toFixed(2);
    let newNotes = this.state.notesValue;
    // let orderNumber = "Order Number: 999";
    // let alertMsgLine2 = "You bid $" + newPrice + " per part for a total price of $" + priceResult;
    // let alertMsg = orderNumber + "\r\n" + alertMsgLine2;
    console.log(newPrice);
    console.log(priceResult);
    console.log(newNotes);
    axios.put(input, {
      unitPrice: newPrice,
      totalPrice: priceResult,
      notes: newNotes
    })
    .then(function (response) {
      console.log(response);
      //alert(alertMsg);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // Define a function that deletes a product from the database
  deleteProduct = (input) => {
    axios.delete(input)
    .then(function (response) {
      console.log(response);
      //alert("Successfully Added!")
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    // Define a var that is equal to the product prop
    const product = this.props.product;
    // Define vars that are associated with the product prop contents
    const productName = product.productName;
    const productID = product.productID;
    const salesOrderName = product.salesOrderName;
    const quantity = product.quantity;
    const drawing = product.drawing;
    const stepFile = product.stepFile;
    const vendor = product.vendor;
    const unitPrice = product.unitPrice;
    const x = product.x;
    const y = product.y;
    const z = product.z;
    const material = product.material;
    const reqShipDate = product.reqShipDate;
    let dateFormat = "";
    if(reqShipDate) {
      const yyyy = reqShipDate.slice(0,4);
      const dd = reqShipDate.slice(5,7);
      const mm = reqShipDate.slice(8);
      dateFormat = dd + "/" + mm + "/" + yyyy;
    } else {
      dateFormat = "None";
    }
    // Define an input for the putApi fxn that is has the productID in it. Used for updating products with their price values
    let putURL = "/products/" + productID + "/" + vendor;

    // Define a var to get to the order number for the vendor
    let orderURL;
    if(urlID === "/") {
      orderURL = urlID + salesOrderName
    } else {
      orderURL = urlID + "/" + salesOrderName;
    }

    // Define a var for the price. Add a $ to the Price display
    let totalPrice = product.totalPrice;
    let pv = this.state.priceValue;
    let priceBox;
    if(pv !== '') {
      //priceBox = "$" + totalPrice;
      priceBox = "$" + (pv * quantity).toFixed(2);
    } else {
      priceBox = "Need to Bid";
    }


    // Add contents of products to different rows in the table
    return (
      <tr>
        <td>{productName}</td>
        <td><a href={orderURL}>{salesOrderName}</a></td>
        <td>{x}</td>
        <td>{y}</td>
        <td>{z}</td>
        <td>{material}</td>
        <td>
          Step File: <a href={stepFile} target="_blank">{productName}</a>
          <br />
          Drawing: <a href={drawing} target="_blank">{productName}</a>
        </td>
        <td>{quantity}</td>
        <td>{dateFormat}</td>
        <td id="info-box">
          <form>
            Unit Price: <br />
            $ <input type="text" name="priceValue" size="10" placeholder="Price" value={this.state.priceValue} onChange={this.handleInputChange} />
            <br /><br />
            Notes: <br /><textarea type="textarea" name="notesValue" placeholder="Notes..." value={this.state.notesValue} onChange={this.handleInputChange}></textarea>
            <br /><br />
            <button type="submit" className="btn btn-basic" id="yes-button" onClick={() => this.putNewPrice(putURL, quantity)}>Enter</button>
            &nbsp; &nbsp;
            <button type="submit" className="btn btn-basic" onClick={() => {if(window.confirm("Are you sure you do not want to bid on this product?")) this.deleteProduct(putURL)} }>No Bid</button>
          </form>
        </td>
        <td>{priceBox}</td>
      </tr>
    );
  }
}

export default ProductRow;
