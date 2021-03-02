import React, { Component } from 'react';
import style from "components/Form.css";

// Selector menu for type of request for Form
class FormMenu extends Component {
    // props
    // formType: form type (inventory, choose from design, start from scratch)
    // handleChange: event handler for change to form menu

    /**
     * Handles menu selection
     */
    onClick = (event) => {
        let formType = event.target.dataset.id;
        let designChoices = {};
        if (formType === "custom") {
            designChoices["custom"] = {
                quantity: 1,
                notes: "",
                stamps: [],
                colors: [],
                occasion: ""
            }
        }
        this.props.handleChange({
            formType: formType,
            designChoices: designChoices
        })
    };

    render() {
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