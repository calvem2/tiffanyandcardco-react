const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const getFilesFromDir = require("./config/files");
const PAGE_DIR = path.join("src", "pages", path.sep);

const htmlPlugins = getFilesFromDir(PAGE_DIR, [".html"]).map( filePath => {
    const fileName = filePath.replace(PAGE_DIR, "");
    return new HtmlWebPackPlugin({
        chunks:[fileName.replace(path.extname(fileName), ""), "vendor"],
        template: filePath,
        filename: fileName
    })
});

const entry = getFilesFromDir(PAGE_DIR, [".js"]).reduce( (obj, filePath) => {
    const entryChunkName = filePath.replace(path.extname(filePath), "").replace(PAGE_DIR, "");
    obj[entryChunkName] = `./${filePath}`;
    return obj;
}, {});

module.exports = {
    entry: entry,
    plugins: [
        ...htmlPlugins
    ],
    resolve:{
        alias:{
            src: path.resolve(__dirname, "src"),
            components: path.resolve(__dirname, "src", "components")
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader:"babel-loader",
                    options:{
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            {'plugins': ['@babel/plugin-proposal-class-properties']}
                        ],
                    }
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", {loader: "css-loader", options: {modules: true}}],
                exclude: /node_modules/,
            },
            {
                test: /\.(jpg|png|jpeg)$/,
                use: {
                    loader: 'url-loader',
                },
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    chunks: "initial",
                    name: "vendor",
                    enforce: true
                }
            }
        }
    }
};