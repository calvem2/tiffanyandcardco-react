import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";
import Gallery from "components/Gallery";
import Footer from "components/Footer";


ReactDOM.render(<Header menuValue="home"/>, document.getElementById("header"));
ReactDOM.render(<Gallery initialCategory="home_page"/>, document.getElementById("gallery"));
ReactDOM.render(<Footer/>, document.getElementById("footer"));