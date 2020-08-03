import React, {Component} from 'react';
import Quantity from "components/Quantity";
import Notes from "components/Notes";
import style from "./Form.css";
import customCard from "../images/doggy.png";

class CheckOut extends Component {
    // props
    // currentStep: current step in multi-form
    // formType: type of form (inventory, custom, ready-made)
    // selections: choices selected
    // handleChange: event handler for change to form

    /**
     * Update the choice selection's with the given id.
     * Change the selection's infoType (quantity or notes) to the new value
     */
    handleInfoChange = (infoType, id, newValue) => {
        let selections = this.props.selections;
        if (infoType === "quantity") {
            selections.get(id)["quantity"] = newValue;
        } else {
            selections.get(id)["notes"] = newValue;
        }

        this.props.handleChange({selections: selections});
    }

    /**
     * Produce quantity and notes section for each of user's this.props.selections
     */
    makeSections = () => {
        // if this is custom card form, set selections to custom card image
        let selections = this.props.formType === "custom" ? [{customCard}] : this.props.selections;

        // create section for each selection
        let sections = [];
        for (let [id, info] of selections) {
            sections.push(
                <div className={style.product}>
                    <img src={id}/>
                    <div className={style["product-info"]}>
                        <Quantity
                            id={id}
                            quantity={info["quantity"]}
                            onChange={this.handleInfoChange}
                        />
                        {/*// todo: change back to inventory*/}
                        {this.props.formType !== "" &&
                        <Notes
                            id={id}
                            note={info["notes"]}
                            onChange={this.handleInfoChange}
                        />}
                    </div>
                </div>
            )
        }

        return sections;
    }

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