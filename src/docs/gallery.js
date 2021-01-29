import React from "react";
import ReactDOM from "react-dom";
import Header from "components/Header";
import Gallery from "components/Gallery";

ReactDOM.render(<Header menuValue="gallery"/>, document.getElementById("header"));
ReactDOM.render(<Gallery initialCategory="all"/>, document.getElementById("gallery"));