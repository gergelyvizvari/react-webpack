const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const inProduction = (process.env.NODE_ENV === 'production');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    context: __dirname + '/src',
    entry: {
        app: [
            "./js/app.js",
            "./sass/app.scss",
        ],
    },
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: "js/[name].js"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: ['css-loader','sass-loader'],
                    fallback: 'style-loader',
                })
            },
            {
                test: /\.(eot|ttf|woff|woff2|svg)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'fonts/[name].[ext]',
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpeg|jpg|gif)$/,
                loaders: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'img/',
                            publicPath: '../',
                            name: '[name].[ext]',
                        }
                    },
                    'img-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                use: ['babel-loader']
            },
        ]
    },

    plugins: [
        new ExtractTextPlugin('css/[name].css'),
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),
        new CleanWebpackPlugin(['dist','build'], {
            root: __dirname,
            verbose : 'true',
            dry: false
        }),
        new LiveReloadPlugin()
    ]
};

if (inProduction) {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
    new webpack.DefinePlugin({
        "process.env": {
            NODE_ENV: JSON.stringify("production")
        }
    })
}
