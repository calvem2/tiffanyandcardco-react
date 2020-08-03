import React from "react";
import ReactDOM from "react-dom";
import Form from "components/Form";
import Header from "components/Header";

ReactDOM.render(<Header menuValue="request-inventory"/>, document.getElementById("header"));
ReactDOM.render(<Form formType="inventory"/>, document.getElementById("inventory"));