import React, { Component } from 'react';
import './App.css';
import ProductTable from './ProductTable/ProductTable.js';
import AwardTable from './AwardTable/AwardTable.js';
import AwardedTable from './AwardedTable/AwardedTable.js';
import BidOnTable from './BidOnTable/BidOnTable.js';
import axios from 'axios';

// Gets the salesOrderID from the URL and assigns it to a var
let urlID = window.location.pathname;
// Removes the / from urlID
let ordNum = urlID.slice(1);
// Gets the length of the ordNum
let ordNumLength = ordNum.length;
// Defines vendor as anything past the order number in the URL
let vendor = ordNum.slice(7, ordNumLength);
// Initialize a link to the vendor page
let vendorLink;
const homeLink = "/";
// Get the last letter of the ordNum
let lastLetter = ordNum[ordNumLength - 1];
// Check if the last letter is a number
let numberOrNot = Number(lastLetter);
//
let currentDate = new Date();
let currentMillisec = currentDate.getTime();
//

class App extends Component {
  // Defines empty lists for the rows in the tables
  // Also defines states for which table is showing and which are hidden
  state = {
    rows: [],
    awardRows: [],
    awardedRows: [],
    prod: true,
    award: false,
    awarded: false,
    bidOn: false
  };

  // After the page is rendered, this.callApi and this.changeContents is called
  componentDidMount() {
      this.callApi()
      this.changeContents()
  }

  // Define a function that deletes a product from the database
  deleteProduct = (input) => {
    axios.delete(input)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }


  // let putURL = "/products/" + productID + "/" + vendor;
  // Define a function that gets all of the products from the database an puts them in a list
  // The list is filtered based on different needs
  callApi = async () => {
    const response = await fetch('/products' + urlID);
    const body = await response.json();
    const data = [...body];
    // Initiates empty lists for the filtered results
    let prodData = [];
    let awardData = [];
    let awardedData = [];
    //
    // Delete all products that have not been bid on after 2 days
    for(var m = 0; m < data.length; m++) {
      let productID = data[m].productID;
      let vendor = data[m].vendor;
      let deleteURL = "/products/" + productID + "/" + vendor;
      let unitPrice = data[m].unitPrice;
      let createdDate = data[m].createdDate;
      let daysToBidOn = data[m].daysToBidOn;
      let datePlusDaysToBid = createdDate + daysToBidOn;
      if(currentMillisec > datePlusDaysToBid && unitPrice === null) {
        this.deleteProduct(deleteURL);
      }
    };
    /* *****Order data from newest to oldest in each filter***** */
    // Filters the data for products without a bid price
    for(var i = 0; i < data.length; i++) {
      let totalPrice = data[i].totalPrice;
      if(totalPrice === null) {
        prodData.unshift(data[i]);
      }
    };
    // Filters the data for products that have a price but have not been awarded
    for(var j = 0; j < data.length; j++) {
      let award = data[j].award;
      let totalPrice = data[j].totalPrice;
      if(award === false && totalPrice !== null) {
        awardData.unshift(data[j]);
      }
    };
    // Filters the data for products that have been bid on and awarded
    for(var l = 0; l< data.length; l++) {
      let award = data[l].award;
      //let accept = data[l].accept;
      if(award === true) {
        awardedData.unshift(data[l]);
      }
    };
    // Assigns the proper filtered data for each state
    this.setState({ rows: prodData, awardRows: awardData, awardedRows: awardedData});
  }

  // Define a function that changes titles, buttons, and what tables are available based on which page the user is currently on
  changeContents = () => {
    // Grab the titles and the buttons that are interchanged in different displays
    let title = document.querySelector("#title");
    let subTitle = document.querySelector("#sub-title");
    let yourOrdersBtn = document.querySelector("#your-orders");
    let allOrdersBtn = document.querySelector("#all-orders");
    let prodBtn = document.querySelector("#product-table-btn");
    let awardBtn = document.querySelector("#award-table-btn");
    let bidOnBtn = document.querySelector("#bid-table-btn");
    let awardedBtn = document.querySelector("#awarded-table-btn");
    //
    // Conditional statements that determine what content is displayed based on what page the user is on
    // If you are on the homepage(/products)...
    if(ordNumLength === 0) {
      // Set the main title to "All Orders"
      // Hide the Sub Title, Your Orders, ProductTable, and AcceptTable buttons
      title.innerHTML = "All Orders";
      subTitle.style = "display: none;";
      yourOrdersBtn.style = "display: none;";
      allOrdersBtn.style = "display: none;";
      prodBtn.style = "display: none;";
      bidOnBtn.style = "display: none;";
      awardBtn.style = "display: none;";
      awardedBtn.style = "display: none;";
      // Display the AwardTable
      this.setState({
        prod: false,
        award: true,
        awarded: false,
        bidOn: false
  		});
      // If you are on /products/salesOrderName...
    } else if (ordNumLength === 6) {
      // Set the main title as the order Number
      title.innerHTML = "Order Number: " + ordNum;
      // Hide the Sub Title, Your Orders, ProductTable, and AcceptTable buttons
      subTitle.style = "display: none;";
      yourOrdersBtn.style = "display: none;";
      prodBtn.style = "display: none;";
      bidOnBtn.style = "display: none;";
      awardBtn.style = "display: none;";
      awardedBtn.style = "display: none;";
      // Display the AwardTable
      this.setState({
        prod: false,
        award: true,
        awarded: false,
        bidOn: false
  		});
      // If you are on a vendor page...
    } else if (ordNumLength > 6 && isNaN(numberOrNot) === true) {
      // Set the main title as the vendor's name
      title.innerHTML = vendor;
      // Hide the Sub Title, Your Orders, AwardTable, and AwardedTable buttons
      subTitle.style = "display: none;";
      yourOrdersBtn.style = "display: none;";
      allOrdersBtn.style = "display: none;";
      awardBtn.style = "display: none;";
      //bidOnBtn.style = "display: none;";
      // Display the ProductTable
      this.setState({
        prod: true,
        award: false,
        awarded: false,
        bidOn: false
  		});
      // If you are on a vendor-order page...
    } else {
      // Set the main title as the vendor's name
      title.innerHTML = vendor.slice(0, -7);
      // Set the sub title as the order number
      subTitle.innerHTML = "Order: " + vendor.slice(-6, ordNumLength - 1);
      // Add a link back to the vendor's page
      vendorLink = "/vendor/" + vendor.slice(0, -7);
      // Hide the ProductTable, AwardTable, AcceptTable, and AcceptedTable buttons
      allOrdersBtn.style = "display: none;";
      prodBtn.style = "display: none;";
      awardBtn.style = "display: none;";
      //bidOnBtn.style = "display: none;";
      awardedBtn.style = "display: none;";
      // Display the ProductTable
      this.setState({
  			prod: true,
        award: false,
        awarded: false,
        bidOn: false
  		});
    }
  }

  // Displays the ProductTable and hides all other tables
  toggleProd = () => {
    this.setState({
			prod: true,
      award: false,
      awarded: false,
      bidOn: false
		});
  }

  // Displays the AwardTable and hides all other tables
  toggleAward = () => {
    this.setState({
      prod: false,
      award: true,
      awarded: false,
      bidOn: false
		});
  }

  // Displays the AcceptTable and hides all other tables
  toggleBidOn = () => {
    this.setState({
      prod: false,
      award: false,
      awarded: false,
      bidOn: true
		});
  }

  // Displays the AwardedTable and hides all other tables
  toggleAwarded = () => {
    this.setState({
      prod: false,
      award: false,
      awarded: true,
      bidOn: false
		});
  }

  // Render the contents
  render() {
    // Define a variable for the prod state. Show the contents if prod=true and hide the contents if prod=false
    const prod = {
			display: this.state.prod ? "block" : "none"
		};

    // Define a variable for the award state. Show the contents if award=true and hide the contents if award=false
    const award = {
			display: this.state.award ? "block" : "none"
		};

    // Define a variable for the awarded state. Show the contents if awarded=true and hide the contents if awarded=false
    const awarded = {
			display: this.state.awarded ? "block" : "none"
		};

    // Define a variable for the awarded state. Show the contents if awarded=true and hide the contents if awarded=false
    const bidOn = {
			display: this.state.bidOn ? "block" : "none"
		};


    return (
      // Define a div for all the page content
      <div>

        {/* Initialize a main title and a sub title with a line under them */}
        <h2 id="title">Loading...</h2>
        <h3 id="sub-title">Hidden</h3>
        <hr />

        {/* Create a div for the navigation buttons */}
        <div id="nav-btns">
          {/* Create a button that shows the ProductTable */}
          <button className="btn btn-default" id="product-table-btn" onClick={() => this.toggleProd()}>All Orders to Bid On</button>
          {/* Create a button that shows the AwardTable */}
          <button className="btn btn-default" id="award-table-btn" onClick={() => this.toggleAward()}>Award Orders</button>
          {/* Create a button that shows the AcceptTable */}
          <button className="btn btn-default" id="bid-table-btn" onClick={() => this.toggleBidOn()}>All Orders that have been Bid On</button>
          {/* Create a button that shows the AwardedTable */}
          <button className="btn btn-default" id="awarded-table-btn" onClick={() => this.toggleAwarded()}>Awarded Orders</button>
          {/* Create a button that takes the user back to the vendor page */}
          <a href={vendorLink} className="btn btn-default" id="your-orders">Your Orders</a>
          <a href={homeLink} className="btn btn-default" id="all-orders">All Orders</a>
        </div>

        {/* Div for the ProductTable */}
        <div style={prod} id="product-table">
          <h4 className="table-title">Orders to Bid On</h4>
          <ProductTable products={this.state.rows} />
        </div>

        {/* Div for the AwardTable */}
        <div style={award} id="award-table">
          <p></p>
          <AwardTable products={this.state.awardRows} />
        </div>

        {/* Div for the AwardedTable */}
        <div style={awarded} id="awarded-table">
          <h4 className="table-title">Awarded Orders</h4>
          <AwardedTable products={this.state.awardedRows} />
        </div>

        {/* Div for the BidOnTable */}
        <div style={bidOn}>
          <h4 className="table-title">Orders Bid On</h4>
          <BidOnTable products={this.state.awardRows} />
        </div>

      </div>
    );
  }
}

export default App;

//<h4 className="table-title">Award Orders</h4> style={bidOn}
