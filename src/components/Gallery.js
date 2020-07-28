import React, { Component } from 'react';
import CategorySelector from "./CategorySelector";
import style from './Gallery.css';
import * as _ from "underscore";

const categories = ["all", "birthday", "calendar", "congratulations", "get_well", "graduation",
                    "holiday", "retirement", "thank_you", "wedding"];

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.initialCategory
        };
    }


    /**
     * Update the selected category value
     */
    updateCategory = (newCategory) => {
        this.setState({
            category: newCategory
        });
    }

    /**
     * Load images
     */
    importAll = (r) => {
        return r.keys().map(r);
    }

    getLocalImages = () => {
        // FOR LOCAL
        const images = this.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
        console.log("these are the images");
        console.log(images);
        let imgs = [];
        for (let [index, module] of Object.entries(images)) {
            console.log(index);
            console.log(module['default']);
            imgs.push(<img src={module['default']}/>);
        }
        return imgs;
    }

    /**
     * Load images from text files containing info about images stored on google drive
     */
    getGoogleImages = () => {
        switch (this.state.category) {
            case "home_page":
            case "all":
                return this.importAll(require.context('../card_images/all', false, /\.txt$/));
            case "best_wishes":
                return this.importAll(require.context('../card_images/best_wishes', false, /\.txt$/));
            case "birthday":
                return this.importAll(require.context('../card_images/birthday', false, /\.txt$/));
            case "calendar":
                return this.importAll(require.context('../card_images/calendar', false, /\.txt$/));
            case "congratulations":
                return this.importAll(require.context('../card_images/congratulations', false, /\.txt$/));
            case "get_well":
                return this.importAll(require.context('../card_images/get_well', false, /\.txt$/));
            case "graduation":
                return this.importAll(require.context('../card_images/graduation', false, /\.txt$/));
            case "greeting":
                return this.importAll(require.context('../card_images/greeting', false, /\.txt$/));
            case "holiday":
                return this.importAll(require.context('../card_images/holiday', false, /\.txt$/));
            case "retirement":
                return this.importAll(require.context('../card_images/congratulations', false, /\.txt$/));
            case "thank_you":
                return this.importAll(require.context('../card_images/congratulations', false, /\.txt$/));
            case "wedding":
                return this.importAll(require.context('../card_images/congratulations', false, /\.txt$/));
        }
    }

    /**
     * Produces array img tags to be rendered on the page
     */
    makeGallery = () => {
        let imageFile = this.getGoogleImages();
        let imgs = [];

        let images = imageFile[0]['default'].split('\n').filter(x => x);
        // only display a subset of images if we're on the home page
        if (this.state.category === "home_page") {
            images = _.sample(images, 20);
        }
        // for (let imgInfo of images) {
        //
        //     // let category = img.split(/:(.+)/)[0];
        //     // let src = img.split(/:(.+)/)[1];
        //     let src = imgInfo.split(",")[0];
        //     let description = imgInfo.split(",")[1].split(";");
        //     console.log(description);
        //     console.log(src);
        //     imgs.push(<img src={src}/>);
        // }git

        // construct rows of five images
        let i;
        for (i = 0; i < images.length - 5; i+= 5) {
            imgs.push(
                <div className={style.row}>
                    <img src={images[i].split(",")[0]}/>
                    <img src={images[i + 1].split(",")[0]}/>
                    <img src={images[i + 2].split(",")[0]}/>
                    <img src={images[i + 3].split(",")[0]}/>
                    <img src={images[i + 4].split(",")[0]}/>
                </div>
            );
        }

        // construct last row of any leftover images
        let lastRow = [];
        for (i; i < images.length; i++) {
            lastRow.push(<img src={images[i].split(",")[0]}/>);
        }
        imgs.push(<div className={style.row}>{lastRow}</div>);

        return imgs;
    }


    render() {
        let imgs = this.makeGallery();

        return (
            <div id={style.gallery}>
                {this.state.category !== "home_page" &&
                    <CategorySelector selected={this.state.category} categories={categories} onChange={this.updateCategory}/>
                }
                <div id={style['gallery-container']}>{imgs}</div>
            </div>
        );
    }
}

export default Gallery;

