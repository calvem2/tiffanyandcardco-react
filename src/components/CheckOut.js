import React, {Component} from 'react';
import Quantity from "components/Quantity";
import Notes from "components/Notes";
import style from "./Form.css";
import customCard from "../images/custom_card.jpg";
import Occasion from "components/Occasion";

// Checkout page of request Form
class CheckOut extends Component {
    // props
    // currentStep: current step in multi-form
    // formType: type of form (inventory, custom, cards)
    // designChoices: choices selected
    // handleChange: event handler for change to form

    /**
     * Update the choice selection's with the given id.
     * Change the selection's infoType (quantity or notes) to the new value
     */
    handleInfoChange = (infoType, id, newValue) => {
        let selections = this.props.designChoices;
        if (infoType === "quantity") {
            selections[id]["quantity"] = newValue;
        } else if (infoType === "notes") {
            selections[id]["notes"] = newValue;
        } else {
            selections[id]["occasion"] = newValue;
        }

        this.props.handleChange({selections: selections});
    };

    /**
     * Render description for card
     */
    description = () => {
        if (this.props.formType !== "custom") {
            return null;
        }
        let design = this.props.designChoices["custom"];
        return (
            <div id={style.description}>
                <p>stamps: {design["stamps"].toString().replace(/,/g, ", ")}</p>
            </div>
        );
    };

    /**
     * Produce quantity and notes section for each of user's this.props.designChoices
     */
    makeSections = () => {
        // create section for each selection
        let selections = this.props.designChoices;
        let sections = [];
        for (let product in selections) {
            let src = product === "custom" ? customCard : product;
            sections.push(
                <div className={style.product}>
                    <img src={src}/>
                    {/* add description if this is custom product*/}
                    <div className={style["product-info"]}>
                        {this.description()}
                        {this.props.formType === "custom" &&
                        <Occasion
                            id={product}
                            occasion={selections[product]["occasion"]}
                            onChange={this.handleInfoChange}
                        />
                        }
                        <Quantity
                            id={product}
                            quantity={selections[product]["quantity"]}
                            onChange={this.handleInfoChange}
                        />
                        <Notes
                            id={product}
                            note={selections[product]["notes"]}
                            formType={this.props.formType}
                            onChange={this.handleInfoChange}
                        />
                    </div>
                </div>
            )
        }

        return sections;
    };

    render() {
        if (this.props.currentStep !== 2) {
            return null;
        }

        let sections = this.makeSections();
        return (
            <div className={style["form-group"]}>
                {sections}
            </div>
        );
    }
}

export default CheckOut;