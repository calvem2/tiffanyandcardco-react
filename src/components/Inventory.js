import React, { Component } from 'react';
import DesignChooser from "./DesignChooser";

class Inventory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 1,
            cards: [],
            quantity: null,
            email: ""
        };
    }

    render() {
        return (
            <DesignChooser currentStep={this.state.currentStep} choices="inventory"/>
        );
    }
}

export default Inventory;