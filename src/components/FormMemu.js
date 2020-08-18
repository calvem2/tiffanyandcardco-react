import React, { Component } from 'react';
import style from "components/Form.css";
// import DesignChooser from "./DesignChooser";
// import CheckOut from "components/CheckOut";
// import style from "./Form.css"
// import startImage from "../images/request_start.jpg";
// import classNames from 'classnames/bind';
// import OrderReview from "components/OrderReview";

// const cx = classNames.bind(style);

class FormMenu extends Component {
    // props
    // formType: form type (inventory, choose from design, start from scratch)
    // handleChange: event handler for change to form menu

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         currentStep: 0,                 // current step in the form
    //         designChoices: new Map(),       // user design selections; id mapped to quantity and notes
    //         email: "",                      // user email address
    //         insta: ""                       // user instagram handle
    //     };
    // }

    onClick = (event) => {
        // console.log(event.target.dataset.id);
        let formType = event.target.dataset.id;
        let designChoices = {};
        if (formType === "custom") {
            designChoices["custom"] = {
                quantity: 1,
                notes: "",
                stamps: [],
                colors: ["transparent", "#FFFFFF", "#FFFFFF"],
                occasion: ""
            }
        }
        this.props.handleChange({
            formType: formType,
            designChoices: designChoices
        })
    };

    render() {
        // TODO: check if this data attribute can be used anywhere else to make clearer
        return (
            <div className={style["form-group"]} id={style["form-menu"]}>
                <p
                    data-id="inventory"
                    className={this.props.formType === "inventory" ? style.selected : style.unselected}
                    onClick={this.onClick}
                >
                    inventory
                </p>
                <p
                    data-id="cards"
                    className={this.props.formType === "cards" ? style.selected : style.unselected}
                    onClick={this.onClick}
                >
                    choose existing design
                </p>
                <p
                    data-id="custom"
                    className={this.props.formType === "custom" ? style.selected : style.unselected}
                    onClick={this.onClick}
                >
                    start from scratch
                </p>
            </div>
        );
    }
}

export default FormMenu;