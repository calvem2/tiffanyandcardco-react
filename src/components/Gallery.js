import React, { Component } from 'react';
import doggy from './images/doggy.png'
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
    loadImages = (folder) => {
        let images = {};
        folder.keys().map((item, index) => {
            images[item.replace('./', '')] = folder(item);
        });
        return images
    }

    render() {
        const images = loadImages(require.context('./images', false, /\.(png|jpe?g|svg)$/));
        return (
            <div>
                <img src={images['doggy.png']}/>
            </div>
        );
    }
}

export default Gallery;