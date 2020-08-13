import React, { Component } from 'react';
import style from "./Form.css"

const MAX_SELECTIONS = 3; // max number of choice selections allowed

class DesignChooser extends Component {
    // props
    // currentStep: current step in multi-form
    // formType: type of form (inventory, custom, cards)
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
        } else if (this.props.formType === "custom") {
            images = this.importAll(require.context('../card_images/stamps', false, /\.txt$/));
        } else if (this.props.formType === "inventory") {
            images = this.importAll(require.context('../card_images/inventory', false, /\.txt$/));
        }
        console.log(images);
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
                    <label htmlFor={src} className={style["design-choice"]}>
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
        } else if (this.props.formType !== "custom" || selections.size < MAX_SELECTIONS) {
            selections.set(event.target.id, {quantity: 1, notes: ""});
            event.target.checked = true;
        } else {
            event.target.checked = false;
        }
        this.props.handleChange({designChoices: selections})
    };

    /**
     * Render design options
     */
    designOptions = () => {
        // render on section for card images if not custom request form
        if (this.props.formType !== "custom") {
            let checkboxes = this.makeCheckboxes(this.getGoogleImages());
            return (
                <div className={style["design-sections"]}>
                    <div className={style.section}>
                        <ul>
                            {checkboxes}
                        </ul>
                    </div>
                </div>
            );
        }

        // render section for each category of stamps for custom request form
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
                    <h3>{category}</h3>
                    <ul>
                        {this.makeCheckboxes(images)}
                    </ul>
                </div>

            )
        }
        return (
            <div className={style["design-sections"]}>
                <h2>STAMPS</h2>
                {sections}
            </div>
        );
    };

    /**
     * Renders section for choosing color preferences
     */
    colorChooser = () => {
        return (
            <div className={style.section}>
                <h2>COLORS</h2>
                <input type="color" value="#e66465"/>
            </div>
        );
    }

    /**
     * Render short intro message
     */
    greeting = () => {
        if (this.props.formType === "custom") {
            return (
                <p className={style["greeting-msg"]}>
                    Tell me a little bit about what you're looking for!
                    Select some stamps you vibe with, choose your color color preferences, and
                    I'll whip something up for you!
                </p>);
        }
        return null;
    }

    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }

        return (
            <div className={style["form-group"]}>
                {/*{this.greeting()}*/}
                {this.designOptions()}
                {this.colorChooser()}
            </div>
        );


    }
}

export default DesignChooser;