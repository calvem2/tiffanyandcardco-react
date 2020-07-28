import React, { Component } from 'react';
import CategorySelector from "./CategorySelector";
import style from './Gallery.css';
import * as _ from "underscore";
// import doggy from '../images/doggy.png'
// import style from './Gallery.css';
// import txt from '../card_images/home_page.txt'

// interface GalleryProps {
//     initialCategory: string;     // initial category of images to display
// }

// constructor(props: GalleryProps) {
//     super(props);
// }
// interface GalleryState {
//     category: string;     // category of images to display
// }

const categories = ["all", "birthday", "thank_you"];

class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.initialCategory
        };
    }

    // componentDidMount() {
        // let path = '../card_images/';
        // path = path.concat(folder).concat(".txt");
        // let links = require(path);
        // console.log(links);
    // }

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
        if (this.state.category === 'home_page' || this.state.category === 'all') {
            return this.importAll(require.context('../card_images/all', false, /\.txt$/));
        } else if (this.state.category === 'birthday') {
            return this.importAll(require.context('../card_images/birthday', false, /\.txt$/));
        } else if (this.state.category === 'thank_you') {
            return this.importAll(require.context('../card_images/thank_you', false, /\.txt$/));
        }
        // const images = this.importAll(require.context('../card_images', false, /\.txt$/));
        // console.log(images);
    }

    /**
     * Produces array img tags to be rendered on the page
     */
    makeGallery = () => {
        let imageFile = this.getGoogleImages();
        let imgs = [];

        // console.log(imageFile[0]);
        // for (let [index, module] of Object.entries(imageFile)) {
            // split file by line, filtering out empty strings
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
        // }

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
            <div className={style.gallery}>
                {/*render selector if not on home page*/}
                {this.state.category !== "home_page" &&
                    <CategorySelector selected={this.state.category} categories={categories} onChange={this.updateCategory}/>
                }
                {imgs}
                {/*<img src='https://drive.google.com/uc?export=view&id=1OaL9ky8ppnhRxpoFR2zEvzauX8Ksl9iS'/>*/}
            </div>
        );
    }
}

export default Gallery;

