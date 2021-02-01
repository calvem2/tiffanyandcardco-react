import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";
import Footer from "components/Footer";
import About from "components/About";

ReactDOM.render(<Header menuValue="about"/>, document.getElementById("header"));
ReactDOM.render(<About/>, document.getElementById("about"));
ReactDOM.render(<Footer/>, document.getElementById("footer"));