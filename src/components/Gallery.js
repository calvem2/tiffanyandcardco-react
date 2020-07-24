import React, { Component } from 'react';
import doggy from '../images/doggy.png'
// import style from './Gallery.css';

// interface GalleryProps {
//     images: string;     // folder with images to be displayed in the gallery
// }

// constructor(props: GalleryProps) {
//     super(props);
// }


class Gallery extends Component {
    /**
     * Load images
     */
    importAll = (r) => {
        // let images = {};
        return r.keys().map(r);
        // r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
        // console.log("here are the images");
        // console.log(images);
        // return images
    }

    render() {
        // const images = loadImages(require.contexts(this.props.images, false, /\.(png|jpe?g|svg)$/));
        // console.log(doggy);
        const images = this.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
        console.log("these are the images");
        console.log(images);
        let imgs = [];
        for (let [index, module] of Object.entries(images)) {
            // let path = "../images/".concat(src);
            // let path = images('./' + props.imageName);
            console.log(index);
            console.log(module['default']);
            imgs.push(<img src={module['default']}/>);
        }
        // console.log("here are the tags");
        // console.log(imgs);


        // console.log("here's the values");
        console.log(images['doggy.png']);
        // console.log(images[0]);
        return (
            <div style={{border: '3px solid green'}}>
                <p>GALLERY</p>
                {imgs}
                <img src={images['doggy.png']}/>
                <img src={doggy} style={{border: '3px solid blue'}} />
                <img src={doggy} style={{border: '3px solid blue'}} />
            </div>
        );
    }
}

export default Gallery;

