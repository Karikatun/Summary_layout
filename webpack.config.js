const path = require('path');

const SRC_DIR = path.resolve(__dirname, 'src');
const DIST_DIR = path.resolve(__dirname, 'dist');
const ASSET_PATH = process.env.ASSET_PATH || '';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: SRC_DIR + '/index.js'
    },
    output: {
        path: DIST_DIR,
        filename: '[name].bundle.js',
        publicPath: ASSET_PATH
    },
    resolve: {
        modules: [SRC_DIR, "node_modules"],
        extensions: ['.js', '.css', '.scss']
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            },

            { 
                test: /\.pug$/,
                use: [{
                    loader: 'pug-loader',                    
                }]
            },
            // images
            {
                test: /\.(png|svg|jpg|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[ext]',
                        outputPath: '',                                                
                        useRelativePath: true
                    }
                }]
            },
            // fonts
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader:'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]',
                        outputPath: ''
                    }
                }]
            }
        ]
    },
    plugins: [        
        new ExtractTextPlugin('style.css'),
        new HtmlWebpackPlugin({
            template: './src/index.pug'
          })
        
    ]
};