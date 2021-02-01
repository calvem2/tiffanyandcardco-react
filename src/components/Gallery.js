import React, { Component } from 'react';
import CategorySelector from "./CategorySelector";
import style from './Gallery.css';
import * as _ from "underscore";
import Footer from "components/Footer";
import {getGoogleImages} from "components/utility";

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.initialCategory
        };
    }

    componentDidMount() {
        // clear loader
        setTimeout(function() {
            document.getElementById("loader-container").style.display = "none";
            document.getElementById(style['gallery']).style.display = "flex";
        }, 500);
    }

    componentDidUpdate() {
        // clear loader
        setTimeout(function() {
            document.getElementById("loader-container").style.display = "none";
            document.getElementById(style['gallery']).style.display = "flex";
        }, 500);
    }


    /**
     * Update the selected category value
     */
    updateCategory = (newCategory) => {
        // display loader
        document.getElementById("loader-container").style.display = "block";
        document.getElementById(style['gallery']).style.display = "none";
        this.setState({
            category: newCategory
        });
    };

    /**
     * Produces array img tags to be rendered on the page
     */
    makeGalleryImgs = () => {
        let images = getGoogleImages(this.state.category);
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
            console.log(descriptionText);
            // add bullet point for each element in description if it's not empty
            // descriptions start at index 1 bc index 0 is category
            for (let i = 1; i < descriptionText.length; i++) {
                description.push(<li>{descriptionText[i]}</li>)
            }

            imgs.push(
                <div className={style['img-container']}>
                    <img className={style['gallery-img']} src={src}/>
                    {this.state.category !== "home_page" &&
                    <div className={description.length !== 0 ? style.description : style['empty-description']}><ul>{description}</ul></div>
                    }
                </div>
            );
        }
        return imgs;
    };

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
        return rows;
    };


    render() {
        let rows = this.makeGalleryRows(this.makeGalleryImgs());
        return (
            <div>
            <div className={style.gallery}>
                {this.state.category !== "home_page" &&
                    <CategorySelector selected={this.state.category} onChange={this.updateCategory}/>
                }
                <div id="loader-container" className={style["loader-container"]}>
                    <div className={style.loader}></div>
                </div>
                <div className={style['gallery-container']} id={this.state.category === "home_page" ? style["home-gallery"] : style["gallery"]}>
                    {rows}

                </div>
            </div>
        {this.state.category !== "home_page" &&
        <Footer/>}
        </div>
        );
    }
}

export default Gallery;

