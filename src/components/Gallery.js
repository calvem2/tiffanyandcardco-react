import React, { Component } from 'react';
// import doggy from '../images/doggy.png'
// import style from './Gallery.css';
// import txt from '../google_images/home_page.txt'

// interface GalleryProps {
//     images: string;     // folder with images to be displayed in the gallery
// }

// constructor(props: GalleryProps) {
//     super(props);
// }


class Gallery extends Component {
    componentDidMount() {
        // let path = '../google_images/';
        // path = path.concat(folder).concat(".txt");
        // let links = require(path);
        // console.log(links);
    }
    /**
     * Load images
     */
    importAll = (r) => {
        return r.keys().map(r);
    }

    /**
     * Load google images
     */
    importImages = (folder) => {

        // const lineReader = require('line-reader');
        // let links = [];s
        // let path = '../google_images/'
        // lineReader.open(path.concat(folder), function(reader) {
        //     if (reader.hasNextLine()) {
        //         reader.nextLine(function(line) {
        //             links.push(line);
        //             console.log(line);
        //         });
        //     }
        // });
        // console.log(links);
    }



    render() {
        // FOR LOCAL
        // const images = this.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
        // console.log("these are the images");
        // console.log(images);
        // let imgs = [];
        // for (let [index, module] of Object.entries(images)) {
        //     console.log(index);
        //     console.log(module['default']);
        //     imgs.push(<img src={module['default']}/>);
        // }

        const images = this.importAll(require.context('../google_images', false, /\.txt$/));
        console.log(images);

        let imgs = [];
        for (let [index, module] of Object.entries(images)) {
            let links = module['default'].split('\n').filter(x => x);
            for (let link of links) {
                let category = link.split(/:(.+)/)[0];
                let src = link.split(/:(.+)/)[1];
                // TODO: clean up and filter by category
                console.log(category);
                console.log(src);
                imgs.push(<img src={src}/>);
            }
            console.log(links);
            console.log(module['default']);
        }
        return (
            <div style={{border: '3px solid green'}}>
                <p>GALLERY</p>
                {imgs}
                {/*<img src='https://drive.google.com/uc?export=view&id=1OaL9ky8ppnhRxpoFR2zEvzauX8Ksl9iS'/>*/}
            </div>
        );
    }
}

export default Gallery;

