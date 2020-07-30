import React, { Component } from 'react';
import style from "./Form.css"

class DesignChooser extends Component {
    // props
    // currentStep: current step in multi-form
    // choices: category of choices to display (cards, stamps, inventory)

    /**
     * Load images
     */
    importAll = (r) => {
        return r.keys().map(r);
    }

    /**
     * Load images from text files containing info about images stored on google drive
     */
    getGoogleImages = () => {
        let images;
        if (this.props.choices === "cards") {
            images = this.importAll(require.context('../card_images/all', false, /\.txt$/));
        } else if (this.props.choices === "stamps") {
            images = this.importAll(require.context('../card_images/stamps', false, /\.txt$/));
        } else if (this.props.choices === "inventory") {
            images = this.importAll(require.context('../card_images/inventory', false, /\.txt$/));
        }
        return images[0]['default'].split('\n').filter(x => x);
    }

    /**
     * Produce checkbox choices to be displayed for given images
     */
    makeCheckboxes = (images) => {
        let choices = [];
        for (let imgInfo of images) {
            let src = imgInfo.split(",")[0];
            choices.push(
                <li>
                    <input type="checkbox" id={src}/>
                    <label for={src}>
                        <img src={src}/>
                    </label>
                </li>
            );
        }
        return choices;
    }


    render() {
        if (this.props.currentStep !== 1) {
            return null;
        }

        if (this.props.choices !== "stamps") {
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
                        <p>category</p>
                        <ul>
                            {this.makeCheckboxes(images)}
                        </ul>
                    </div>

                )
            }
            return (
                <div className={style.form-group}>
                    {sections}
                </div>
            );
        }

    }
}

export default DesignChooser;