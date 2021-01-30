import React, { Component } from 'react';
// import { SwatchesPicker } from 'react-color';
import style from "./Form.css"
import ColorPicker from "components/ColorPicker";

const MAX_STAMPS = 3; // max number of stamp selections allowed for custom card

class DesignChooser extends Component {
    // props
    // currentStep: current step in multi-form
    // formType: type of form (inventory, custom, cards)
    // designChoices: choices selected
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
            // TODO: make seperate folder for this?
            images = this.importAll(require.context('../card_images/all', false, /\.txt$/));
        } else if (this.props.formType === "custom") {
            images = this.importAll(require.context('../card_images/stamps', false, /\.txt$/));
        } else if (this.props.formType === "inventory") {
            images = this.importAll(require.context('../card_images/inventory', false, /\.txt$/));
        }
        // console.log(images[0]['default'].split('\n').filter(x => x));
        return images[0]['default'].split('\n').filter(x => x);
    };

    /**
     * Produce checkbox choices to be displayed for given images
     */
    makeCheckboxes = (images) => {
        let choices = [];
        for (let imgInfo of images) {
            let src = imgInfo.split(",")[0];
            // set id to stamp set name for custom; img src otherwise
            let id = this.props.formType === "custom" ? imgInfo.split(",")[1].split(";")[1] : src;

            // Check to see if card image or stamp image for custom card has been checked
            let checked = this.props.designChoices.hasOwnProperty(src) ||
                (this.props.designChoices.hasOwnProperty("custom") && this.props.designChoices["custom"]["stamps"].includes(id));

            // make checkbox for each choice
            choices.push(
                <li>
                    <input
                        type="checkbox"
                        onChange={this.handleCheckboxChange}
                        id={id}
                        checked={checked}
                    />
                    <label htmlFor={id} className={style["design-choice"]}>
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
        let selections = this.props.designChoices;
        // remove design choice if it was unchecked by user; otherwise add it if room for more selections
        if (!event.target.checked) {
            if (this.props.formType !== "custom") {
                delete selections[event.target.id];
            } else {
                selections["custom"]["stamps"].splice(selections["custom"]["stamps"].indexOf(event.target.id), 1);
            }
        } else if (this.props.formType !== "custom") {
            // update appropriate data for inventory/from existing
            selections[event.target.id] = {quantity: 1, notes: ""};
            event.target.checked = true;
        } else if (this.props.formType === "custom" && selections["custom"]["stamps"].length < MAX_STAMPS) {
            // update appropriate data for custom card
            selections["custom"]["stamps"].push(event.target.id);
            event.target.checked = true;
        } else {
            event.target.checked = false;
        }
        this.props.handleChange({designChoices: selections})
    };

    /**
     * Render design options (cards or stamps)
     */
    designOptions = () => {
        // render one section for card images if not custom request form
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
        let stamps = {};
        let images = this.getGoogleImages();
        for (let imgInfo of images) {
            let category = imgInfo.split(",")[1].split(";")[0];
            if (!stamps.hasOwnProperty(category)) {
                stamps[category] = [];
            }
            stamps[category].push(imgInfo);
        }

        // get checkboxes for each category
        let sections = [];
        for (let category in stamps) {
            sections.push(
                <div className={style.section}>
                    <h3>{category}</h3>
                    <ul>
                        {this.makeCheckboxes(stamps[category])}
                    </ul>
                </div>

            )
        }
        return (
            <div className={style["design-sections"]}>
                {/*<h2>STAMPS</h2>*/}
                {sections}
            </div>
        );
    };

    /**
     * Renders section for choosing color preferences
     */
    colorChooser = () => {
        if (this.props.formType !== "custom") {
            return null;
        }

        return (
            <div className={style.section}>
                <h2>COLORS</h2>
                <div id={style["color-choosers"]}>
                    <ColorPicker
                        handleChange={this.onColorChange}
                        // selectable={this.props.designChoices["custom"]["colors"].length < MAX_SELECTIONS}
                        selected={this.props.designChoices["custom"]["colors"]}
                    />
                </div>
            </div>
        );
    };

    /**
     * Handles change to color chooser: removes color if it already exists in design choices; adds otherwise
     */
    onColorChange = (color) => {
        let designChoices = this.props.designChoices;
        if (designChoices["custom"]["colors"].includes(color)) {
            designChoices["custom"]["colors"].splice(designChoices["custom"]["colors"].indexOf(color), 1);
        } else {
            designChoices["custom"]["colors"].push(color);
        }
        this.props.handleChange({designChoices: designChoices})
    };

    /**
     * Render short intro message
     */
    greeting = () => {
        if (this.props.formType === "custom") {
            return (
                <p className={style["greeting-msg"]}>
                    Tell me a little bit about what you're looking for!
                    Select some stamps you vibe with, and I'll whip something up for you!
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
                {this.greeting()}
                {this.designOptions()}
                {/*{this.colorChooser()}*/}
            </div>
        );


    }
}

export default DesignChooser;