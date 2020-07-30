import React from "react";
import ReactDOM from "react-dom";
import Inventory from "components/Inventory";
import Header from "components/Header";

ReactDOM.render(<Header menuValue="request"/>, document.getElementById("header"));
ReactDOM.render(<Inventory/>, document.getElementById("inventory"));