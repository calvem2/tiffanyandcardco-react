import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";
import Gallery from "components/Gallery";

ReactDOM.render(<Header menuValue="home"/>, document.getElementById("header"));
ReactDOM.render(<Gallery initialCategory="home_page"/>, document.getElementById("gallery"));
// ReactDOM.render(<Gallery/>, document.getElementById("gallery"));