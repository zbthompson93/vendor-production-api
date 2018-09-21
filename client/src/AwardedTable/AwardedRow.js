import React, { Component } from 'react';
import '../App.css';
import axios from 'axios';


class AwardedRow extends Component {
  state = {
    shipped: false,
    late: false,
    newShipDate: '',
    prodQuestionCheck: false,
    prodQuestion: null,
    shipDisabled: false,
    lateDisabled: false,
    prodQuestionDisabled: false
  }

  changeShipped = () => {
    this.setState({
      shipped: !this.state.shipped,
      lateDisabled: !this.state.lateDisabled,
      prodQuestionDisabled: !this.state.prodQuestionDisabled
    })
  }

  showDate = () => {
    this.setState({
      late: !this.state.late,
      shipDisabled: !this.state.shipDisabled,
      prodQuestionDisabled: !this.state.prodQuestionDisabled
    })
  }

  showProdQuestion = () => {
    this.setState({
      prodQuestionCheck: !this.state.prodQuestionCheck,
      shipDisabled: !this.state.shipDisabled,
      lateDisabled: !this.state.lateDisabled
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  putApi = (input) => {
    let shipped = this.state.shipped;
    let late = this.state.late;
    let newShipDate = this.state.newShipDate;
    let prodQuestionCheck = this.state.prodQuestionCheck;
    let prodQuestion = this.state.prodQuestion;
    axios.put(input, {
      shipped: shipped,
      late: late,
      newShipDate: newShipDate,
      prodQuestionCheck: prodQuestionCheck,
      prodQuestion: prodQuestion
    })
    .then(function (response) {
      console.log(response);
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
    const salesOrderName = product.salesOrderName;
    const quantity = product.quantity;
    const drawing = product.drawing;
    const stepFile = product.stepFile;
    const vendor = product.vendor;

    const productID = product.productID;
    let putURL = "/products/" + productID + "/" + vendor;

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

    const show = {
      display: this.state.late ? "block" : "none"
    }

    const showPQ = {
      display: this.state.prodQuestionCheck ? "block" : "none"
    }


    // Add contents of products to different rows in the table
    return (
      <tr>
        <td>{productName}</td>
        <td>{salesOrderName}</td>
        <td>{quantity}</td>
        <td>
          Unit Price: {unitPriceBox}<br />
          Total Price: {totalPriceBox}
        </td>
        <td>{dateFormat}</td>
        <td>
          Step File: <a href={stepFile} target="_blank">{productName}</a>
          <br />
          Drawing: <a href={drawing} target="_blank">{productName}</a>
        </td>
        <td id="info-box0">
          <form>
            <input type="checkbox" name="shipped" onClick={() => this.changeShipped()} disabled={this.state.shipDisabled} /> Shipped
            &nbsp; &nbsp;
            <input type="checkbox" name="late" onClick={() => this.showDate()} disabled={this.state.lateDisabled} /> Late
            &nbsp; &nbsp;
            <input type="checkbox" name="prodQuestionCheck" onClick={() => this.showProdQuestion()} disabled={this.state.prodQuestionDisabled} /> Production Question
            <p></p>
            <div style={show}>
              <p>New Ship Date:</p><input type="date" name="newShipDate" value={this.state.newShipDate} onChange={this.handleChange} />
              <p></p>
            </div>

            <div style={showPQ}>Production Question:
              <br /><textarea name="prodQuestion" value={this.state.prodQuestion} onChange={this.handleChange}></textarea>
              <p></p>
            </div>
            <button type="submit" className="btn btn-basic" id="yes-button" onClick={() => this.putApi(putURL)}>Enter Status Update</button>
          </form>
        </td>
      </tr>
    );
  }
}

export default AwardedRow;

// Production Question: &nbsp;<i id="arrow" className={arrow} onClick={() => this.changeArrow()}></i>

/*<input type="checkbox" name="shipped" onClick={() => this.changeShipped()} disabled={this.state.shipDisabled} /> Partially Shipped
&nbsp; &nbsp; */
