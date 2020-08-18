import React, { Component } from 'react';
import style from "./Form.css"

const MAX_SELECTIONS = 3; // max number of choice selections allowed

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
            // console.log(imgInfo);
            let src = imgInfo.split(",")[0];
            // let id = src;
            // set id to stamp set name for custom; img src otherwise
            let id = this.props.formType === "custom" ? imgInfo.split(",")[1].split(";")[1] : src;

            // let id = this.props.formType === "custom" ? imgInfo.split(",")[1].split(";")[1].replace(/ /g, "") : src;
            // console.log(id);
            // Check to see if card image or stamp image for custom card has been checked
            // let checked = this.props.designChoices.hasOwnProperty(src) ||
            //     (this.props.designChoices.hasOwnProperty("custom") && this.props.designChoices["custom"]["stamps"].includes(id));
            choices.push(
                <li>
                    <input
                        type="checkbox"
                        onChange={this.handleCheckboxChange}
                        id={id}
                        // checked={false}
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
        if (!event.target.checked) {
            if (this.props.formType !== "custom") {
                delete selections[event.target.id];
            } else {
                selections["custom"]["stamps"].splice(selections["custom"]["stamps"].indexOf(event.target.id), 1);
            }
            // TODO: change to check case for custom and less than max and not custom and less than
        } else if (Object.keys(selections).length < MAX_SELECTIONS) {
            // update appropriate data for custom card or inventory/from existing
            if (this.props.formType !== "custom") {
                selections[event.target.id] = {quantity: 1, notes: ""};
            } else {
                let stampSelections = selections.hasOwnProperty("custom") ? selections["custom"]["stamps"] : [];
                // TODO: consider formatting google drive description as url,category;stamp-set-name
                stampSelections.push(event.target.id);
                selections["custom"] = {quantity: 1, notes: "", stamps: stampSelections, colors: [], occasion: ""};
            }
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
        let stamps = {};
        let images = this.getGoogleImages();
        for (let imgInfo of images) {
            // TODO: you'll have to change this (split on ; too) if you add stamp set names
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
                <h2>STAMPS</h2>
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
                <input type="color" value="#e66465" onChange={this.onColorChange}/>
            </div>
        );
    };

    /**
     * Handles change to color choosers
     */
    onColorChange = (event) => {
        console.log(event.target.value);s
    };

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