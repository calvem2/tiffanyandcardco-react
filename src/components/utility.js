export const CATEGORIES = ["baby", "birthday", "calendar", "congratulations", "get well", "graduation",
    "greeting", "holiday", "retirement", "thank you", "wedding"];
export const IMAGES = loadImages();

/**
 * Heplper function for loading image from a context
 */
export function importAll(r) {
    return r.keys().map(r);
}

// getLocalImages = () => {
//     // FOR LOCAL
//     const images = this.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
//     // console.log("these are the images");
//     // console.log(images);
//     let imgs = [];
//     for (let [index, module] of Object.entries(images)) {
//         // console.log(index);
//         // console.log(module['default']);
//         imgs.push(<img src={module['default']}/>);
//     }
//     return imgs;
// };

/**
 * Load images from text files containing info about images stored on google drive
 */
function loadImages() {
    let images = new Map();
    images.set("best wishes", importAll(require.context('../card_images/best_wishes', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("baby", importAll(require.context('../card_images/baby', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("birthday", importAll(require.context('../card_images/birthday', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("calendar", importAll(require.context('../card_images/calendar', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("congratulations", importAll(require.context('../card_images/congratulations', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("get well", importAll(require.context('../card_images/get_well', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("graduation", importAll(require.context('../card_images/graduation', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("greeting", importAll(require.context('../card_images/greeting', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("holiday", importAll(require.context('../card_images/holiday', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("retirement", importAll(require.context('../card_images/retirement', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("thank you", importAll(require.context('../card_images/thank_you', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("wedding", importAll(require.context('../card_images/wedding', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    return images;
}

/**
 * Load appropriate images for a category
 */
export function getGoogleImages(category){
    let images = [];
    if (category === "home_page" || category === "all" || category === "cards") {
        for (let i = 0; i < CATEGORIES.length; i++) {
            // exclude calendar category from card images
            if (!(CATEGORIES[i] === "calendar" && category === "cards")) {
                images = images.concat(IMAGES.get(CATEGORIES[i]));
            }
        }
        return images
    }
    return IMAGES.get(category);
}