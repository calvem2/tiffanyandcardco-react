import React, { Component } from 'react';
import style from "./Form.css"
const GSheetReader = require('g-sheets-api');

const MAX_STAMPS = 3; // max number of stamp selections allowed for custom card

// Component for choosing card from a gallery of images
class DesignChooser extends Component {
    // props
    // currentStep: current step in multi-form
    // formType: type of form (inventory, custom, cards)
    // designChoices: choices selected
    // handleChange: event handler for change to form

    constructor(props) {
        super(props);
        this.state = {
            imageData: []       // metadata for images to display
        };
    }

    componentDidMount() {
        // fetch images from google sheet
        let types = ["cards", "stamps", "inventory"];
        let imageData = {};
        for (let i = 0; i < types.length; i++) {
            let options = {
                sheetId: '1S_GLsf_4g2aDGEnJPsDvkvokQ0V8sIvLN5_py09fIxY',
                sheetNumber: i + 1,
                returnAllResults: false,
            };

            // fetch data
            GSheetReader(options, results => {
                // map form type to images, excluding calendars from 'cards' form type
                if (types[i] === "cards") {
                    imageData[types[i]] = results.filter(function(img) {
                        return img.category !== "calendar";
                    });
                } else {
                    imageData[types[i]] = results;
                }
            }).catch(err => {
                console.log(err);
            });
        }

        this.setState({
            imageData: imageData
        });
    }

    /**
     * Get images for the current form type
     */
    loadImages = () => {
        let category = this.props.formType !== "custom" ? this.props.formType : "stamps";
        return this.state.imageData[category];
    };

    /**
     * Produce checkbox choices to be displayed for given images
     */
    makeCheckboxes = (imageData) => {
        let choices = [];
        for (let img of imageData) {
            // set id to stamp set name for custom; img src otherwise
            let id = this.props.formType === "custom" ? img.name : img.url;

            // Check to see if card image or stamp image for custom card has been checked
            let checked = this.props.designChoices.hasOwnProperty(img.url) ||
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
                        <img src={img.url}/>
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

            // update max quantity for inventory
            if (this.props.formType === "inventory") {
                let imgInfo = this.state.imageData["inventory"].filter(img => {
                    return img.url === event.target.id
                })[0];
                selections[event.target.id]["maxQuantity"] = imgInfo.quantity;
            }

            event.target.checked = true;
        } else if (this.props.formType === "custom") {
            if (selections["custom"]["stamps"].length < MAX_STAMPS) {
                // update appropriate data for custom card
                selections["custom"]["stamps"].push(event.target.id);
                event.target.checked = true;
            } else {
                alert("please choose a max of " + MAX_STAMPS + " stamp sets - a card is only so big!");
            }
        } else {
            event.target.checked = false;
        }
        this.props.handleChange({designChoices: selections})
    };

    /**
     * Render design options (cards or stamps)
     */
    designOptions = () => {
        // render section for each category of card/stamp for request form
        // sort images into categories
        let categories = {};
        let imageData = this.loadImages();
        for (let img of imageData) {
            if (!categories.hasOwnProperty(img.category)) {
                categories[img.category] = [];
            }
            categories[img.category].push(img);
        }

        // get checkboxes for each category
        let sections = [];
        for (let category in categories) {
            sections.push(
                <div className={style.section}>
                    <h3>{category}</h3>
                    <ul>
                        {this.makeCheckboxes(categories[category])}
                    </ul>
                </div>

            )
        }
        return (
            <div className={style["design-sections"]}>
                {sections}
            </div>
        );
    };

    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }

        return (
            <div className={style["form-group"]}>
                {this.designOptions()}
            </div>
        );
    }
}

export default DesignChooser;