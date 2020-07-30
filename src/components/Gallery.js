import React, { Component } from 'react';
import CategorySelector from "./CategorySelector";
import style from './Gallery.css';
import * as _ from "underscore";

const categories = ["all", "birthday", "calendar", "congratulations", "get_well", "graduation",
                    "greeting", "holiday", "retirement", "thank_you", "wedding"];

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
            // console.log(index);
            // console.log(module['default']);
            imgs.push(<img src={module['default']}/>);
        }
        return imgs;
    }

    /**
     * Load images from text files containing info about images stored on google drive
     */
    getGoogleImages = () => {
        let images;
        switch (this.state.category) {
            case "home_page":
            case "all":
                images = this.importAll(require.context('../card_images/all', false, /\.txt$/));
                break;
            case "best_wishes":
                images = this.importAll(require.context('../card_images/best_wishes', false, /\.txt$/));
                break;
            case "birthday":
                images = this.importAll(require.context('../card_images/birthday', false, /\.txt$/));
                break;
            case "calendar":
                images = this.importAll(require.context('../card_images/calendar', false, /\.txt$/));
                break;
            case "congratulations":
                images = this.importAll(require.context('../card_images/congratulations', false, /\.txt$/));
                break;
            case "get_well":
                images = this.importAll(require.context('../card_images/get_well', false, /\.txt$/));
                break;
            case "graduation":
                images = this.importAll(require.context('../card_images/graduation', false, /\.txt$/));
                break;
            case "greeting":
                images = this.importAll(require.context('../card_images/greeting', false, /\.txt$/));
                break;
            case "holiday":
                images = this.importAll(require.context('../card_images/holiday', false, /\.txt$/));
                break;
            case "retirement":
                images = this.importAll(require.context('../card_images/retirement', false, /\.txt$/));
                break;
            case "thank_you":
                images = this.importAll(require.context('../card_images/thank_you', false, /\.txt$/));
                break;
            case "wedding":
                images = this.importAll(require.context('../card_images/wedding', false, /\.txt$/));
        }
        // return images;
        return images[0]['default'].split('\n').filter(x => x)
    }

    /**
     * Produces array img tags to be rendered on the page
     */
    makeGalleryImgs = () => {
        // let imageFile = this.getGoogleImages();
        // let images = imageFile[0]['default'].split('\n').filter(x => x);
        let images = this.getGoogleImages();
        // only display a subset of images if we're on the home page
        if (this.state.category === "home_page") {
            images = _.sample(images, 20);
        }
        // create tags for individual elements
        let imgs = [];
        for (let imgInfo of images) {
            let src = imgInfo.split(",")[0];
            let descriptionText = imgInfo.split(",")[1].split(";");
            let description = [];
            for (let line of descriptionText) {
                description.push(<p>{line}</p>)
            }
            imgs.push(
                <div className={style['img-container']}>
                    <img className={style['gallery-img']} src={src}/>
                    {this.state.category !== "home_page" &&
                    <div className={style.description}>{description}</div>
                    }
                </div>
            );
        }
        return imgs;
    }

    /**
     * Produces array of rows of images for gallery
     */
    makeGalleryRows = (imgs) => {
        // construct rows of five images
        let rows = [];
        let numPerRow = (this.state.category === "home_page") ? 5 : 4;
        let numRows = imgs.length / numPerRow;
        for (let i = 0; i < numRows; i++) {
            rows.push(
                <div className={style.row}>
                    {imgs.splice(0, numPerRow)}
                </div>
            );
        }
        // add any leftover images to last row
        if (imgs.length > 0) {
            rows.push(
                <div className={style.row}>
                    {imgs.splice(0, imgs.length)}
                </div>
            );
        }
        // for (i = 0; i < imgs.length - numPerRow; i+= numPerRow) {
        //     rows.push(
        //         <div className={style.row}>
        //             {/*{imgs[i]}*/}
        //             {/*{imgs[i + 1]}*/}
        //             {/*{imgs[i + 2]}*/}
        //             {/*{imgs[i + 3]}*/}
        //             {/*{imgs[i + 4]}*/}
        //             {/*<img src={images[i + 1].split(",")[0]}/>*/}
        //             {/*<img src={images[i + 2].split(",")[0]}/>*/}
        //             {/*<img src={images[i + 3].split(",")[0]}/>*/}
        //             {/*<img src={images[i + 4].split(",")[0]}/>*/}
        //         </div>
        //     );
        // }

        // construct last row of any leftover images
        // let lastRow = [];
        // for (i; i < imgs.length; i++) {
        //     lastRow.push(imgs[i]);
        //     // lastRow.push(<img src={images[i].split(",")[0]}/>);
        // }
        // rows.push(<div className={style.row}>{lastRow}</div>);

        return rows;
    }


    render() {
        let rows = this.makeGalleryRows(this.makeGalleryImgs());
        return (
            <div>
                {this.state.category !== "home_page" &&
                    <CategorySelector selected={this.state.category} categories={categories} onChange={this.updateCategory}/>
                }
                <div id={style['gallery-container']}>{rows}</div>
            </div>
        );
    }
}

export default Gallery;

