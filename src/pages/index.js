import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";
import Gallery from "components/Gallery";

ReactDOM.render(<Header/>, document.getElementById("header"));
ReactDOM.render(<Gallery imageFolder='home_page'/>, document.getElementById("gallery"));
// ReactDOM.render(<Gallery/>, document.getElementById("gallery"));