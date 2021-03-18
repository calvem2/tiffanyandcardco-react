import React, { Component } from 'react';
import CategorySelector from "./CategorySelector";
import style from './Gallery.css';
import * as _ from "underscore";
import Footer from "components/Footer";
const GSheetReader = require('g-sheets-api');

// Displays grid of images
class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.initialCategory,   // category of images to display in gallery
            imageData: []                           // metadata more images to display
        };
    }

    componentDidMount() {
        // clear loader
        setTimeout(function() {
            document.getElementById("loader-container").style.display = "none";
            document.getElementById("g-gallery").style.display = "flex";
        }, 500);

        // fetch image data
        let options = {
            sheetId: '1S_GLsf_4g2aDGEnJPsDvkvokQ0V8sIvLN5_py09fIxY',
            sheetNumber: 1,
            returnAllResults: false,
        };

        // fetch data
        GSheetReader(options, results => {
            this.setState({
                imageData: results
            });
        }).catch(err => {
            console.log(err);
        });
    }

    componentDidUpdate() {
        // clear loader
        setTimeout(function() {
            document.getElementById("loader-container").style.display = "none";
            document.getElementById("g-gallery").style.display = "flex";
        }, 500);
    }


    /**
     * Update the selected category value
     */
    updateCategory = (newCategory) => {
        // display loader
        document.getElementById("loader-container").style.display = "block";
        document.getElementById("g-gallery").style.display = "none";
        this.setState({
            category: newCategory
        });
    };

    /**
     * Produces array img tags to be rendered on the page
     */
    makeGalleryImgs = () => {
        let imageData = this.state.imageData;
        let category = this.state.category;
        // filter images
        if (category !== "all" && category !== "home_page") {
            imageData = this.state.imageData.filter(function(img) {
                return img.category === category;
            });
        }

        // only display a subset of images if we're on the home page
        if (this.state.category === "home_page") {
            imageData = _.sample(imageData, 20);
        }

        // create tags for individual elements
        let imgs = [];
        for (let img of imageData) {
            let descriptionText = img.materials !== undefined ? img.materials.split(";") : [];

            // add bullet point for each element in description if it's not empty
            let description = [];
            for (let i = 0; i < descriptionText.length; i++) {
                description.push(<li>{descriptionText[i]}</li>)
            }

            imgs.push(
                <div className={style['img-container']}>
                    <img className={style['gallery-img']} src={img.url}/>
                    {this.state.category !== "home_page" &&
                    <div className={description.length !== 0 ? style.description : style['empty-description']}><ul>{description}</ul></div>
                    }
                </div>
            );
        }

        return imgs;
    };

    render() {
        return (
            <div className={style["render-container"]}>
                <div className={style.gallery}>
                    {this.state.category !== "home_page" &&
                        <CategorySelector selected={this.state.category} onChange={this.updateCategory}/>
                    }
                    <div id="loader-container" className={style["loader-container"]}>
                        <div className={style.loader}></div>
                    </div>
                    <div id="g-gallery" className={style['gallery-container']}>
                        {this.makeGalleryImgs()}
                    </div>
                </div>
                {this.state.category !== "home_page" && <Footer/>}
            </div>
        );
    }
}

export default Gallery;

