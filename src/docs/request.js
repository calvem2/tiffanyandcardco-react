import React from "react";
import ReactDOM from "react-dom";
import Form from "components/Form";
import Header from "components/Header";

ReactDOM.render(<Header menuValue="request"/>, document.getElementById("header"));
ReactDOM.render(<Form/>, document.getElementById("request"));