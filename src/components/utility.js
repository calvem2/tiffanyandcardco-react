// google sheet: https://docs.google.com/spreadsheets/d/e/2PACX-1vSR6hThdodXUYq3JZ_K200uyLO0mkml2EGMpJ1eE8eJAFAsA-BOLHTrjSVpjumca_QI8TIyPfQDS_qq/pub?output=csv
// https://docs.google.com/spreadsheets/d/1S_GLsf_4g2aDGEnJPsDvkvokQ0V8sIvLN5_py09fIxY/edit?usp=sharing
export const CATEGORIES = ["baby", "best wishes", "birthday", "calendar", "congratulations", "get well", "graduation",
    "greeting", "holiday", "retirement", "thank you", "wedding"];
export const CARD_IMAGES = loadImages();
const GSheetReader = require('g-sheets-api');
import regeneratorRuntime from "regenerator-runtime";
// loadCardImageData();


/**
 * Helper function for loading image from a context
 */
export function importAll(r) {
    return r.keys().map(r);
}

/**
 * Load card image data from google sheet
 */
export async function loadCardImageData(category) {
    // todo: filter calendar from cards fetch (done somewhere else)
    // set options for fetching from sheet
    let options = {
        sheetId: '1S_GLsf_4g2aDGEnJPsDvkvokQ0V8sIvLN5_py09fIxY',
        sheetNumber: 1,
        returnAllResults: false,
    };
    // filter by category if necessary
    if (!(category === "home_page" || category === "all" || category === "cards")) {
        options.filter = {
            'category': category,
        };
        options.filterOptions = {
            matching: 'strict'
        };
    }

    // fetch data
    let test;
    await GSheetReader(options, async function(results) {
         console.log(results);
        test = await results;
        console.log(test);
        // return test;
    }).catch(err => {
        // do something with the error message here
        console.log(err);
    });
    console.log(test);
    // return test;
}


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
    images.set("inventory", importAll(require.context('../card_images/inventory', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
    images.set("stamps", importAll(require.context('../card_images/stamps', false, /\.txt$/))[0]['default'].split('\n').filter(x => x).map(s => s.trim()));
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
                images = images.concat(CARD_IMAGES.get(CATEGORIES[i]));
            }
        }
        return images
    }

    return CARD_IMAGES.get(category);
}