import React, {Component} from 'react';
import Quantity from "components/Quantity";
import Notes from "components/Notes";
import style from "./Form.css";
import customCard from "../images/doggy.png";

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
        } else {
            selections[id]["notes"] = newValue;
        }

        this.props.handleChange({selections: selections});
    }

    /**
     * Produce quantity and notes section for each of user's this.props.designChoices
     */
    makeSections = () => {
        // return design info for custom card
        // if (this.props.formType === "custom") {
        //     return (
        //         <div className={style.product}>
        //             <img src={customCard}/>
        //             <div className={style["product-info"]}>
        //                 <Quantity
        //                     id={product}
        //                     quantity={selections[product]["quantity"]}
        //                     onChange={this.handleInfoChange}
        //                 />
        //                 <Notes
        //                     id={product}
        //                     note={selections[product]["notes"]}
        //                     formType={this.props.formType}
        //                     onChange={this.handleInfoChange}
        //                 />
        //             </div>
        //         </div>
        //     );
        // }
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