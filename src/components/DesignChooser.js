import React, { Component } from 'react';
import style from "./Form.css"

class DesignChooser extends Component {
    // props
    // currentStep: current step in multi-form
    // formType: type of form (inventory, custom, ready-made)
    // maxSelections: max number of selections allowed
    // selections: choices selected
    // handleChange: event handler for change to form

    /**
     * Load images
     */
    importAll = (r) => {
        return r.keys().map(r);
    };

    /**
     * Load images from text files containing info about images stored on google drive
     */
    getGoogleImages = () => {
        let images;
        if (this.props.formType === "cards") {
            images = this.importAll(require.context('../card_images/all', false, /\.txt$/));
        } else if (this.props.formType === "scratch") {
            images = this.importAll(require.context('../card_images/stamps', false, /\.txt$/));
        } else if (this.props.formType === "inventory") {
            images = this.importAll(require.context('../card_images/inventory', false, /\.txt$/));
        }
        return images[0]['default'].split('\n').filter(x => x);
    };

    /**
     * Produce checkbox choices to be displayed for given images
     */
    makeCheckboxes = (images) => {
        let choices = [];
        for (let imgInfo of images) {
            let src = imgInfo.split(",")[0];
            choices.push(
                <li>
                    <input
                        type="checkbox"
                        id={src} onChange={this.handleCheckboxChange}
                        checked={this.props.selections.has(src)}
                    />
                    <label htmlFor={src}>
                        <img src={src}/>
                    </label>
                </li>
            );
        }
        return choices;
    };

    /**
     * Handle change to checkbox
     */
    handleCheckboxChange = (event) => {
        let selections = this.props.selections;
        if (!event.target.checked) {
            selections.delete(event.target.id);
        } else if (this.props.maxSelections === undefined ||
                    selections.length < this.props.maxSelections) {
            selections.set(event.target.id, {quantity: 1, notes: ""});
            event.target.checked = true;
        } else {
            event.target.checked = false;
        }
        this.props.handleChange({designChoices: selections})
    };


    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }

        if (this.props.formType !== "stamps") {
            let checkboxes = this.makeCheckboxes(this.getGoogleImages());
            return (
                <div className={style["form-group"]}>
                    <div className={style.section}>
                        <ul>
                            {checkboxes}
                        </ul>
                    </div>
                </div>
            );
        } else {
            // sort stamp images into categories
            let stamps = new Map();
            let images = this.getGoogleImages();
            for (let imgInfo of images) {
                let category = imgInfo.split(",")[1];
                if (stamps.get(category) === undefined) {
                    stamps.set(category, []);
                }
                stamps.get(category).push(imgInfo);
            }

            // get checkboxes for each category
            let sections = [];
            for (let [category, images] of stamps) {
                sections.push(
                    <div className={style.section}>
                        <h2>{category}</h2>
                        <ul>
                            {this.makeCheckboxes(images)}
                        </ul>
                    </div>

                )
            }
            return (
                <div className={style["form-group"]}>
                    {sections}
                </div>
            );
        }

    }
}

export default DesignChooser;