const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');
const BeautifyHtmlWebpackPlugin = require('beautify-html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    experiments: {
        asset: true,
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: 'assets/[hash][ext][query]',
        filename: 'main.bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.(ogg|mp3|wav|webm)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|fnt)$/i,
                type: 'asset/resource', 
                exclude: [
                    path.resolve(__dirname, './src/assets/spine')
                ],               
            }, 
            {
                test: /\.(png|jpg|jpeg|atlas)$/i,
                include: [
                    path.resolve(__dirname, './src/assets/spine')
                ], 
                use: [{
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: './assets/'
                    }
                  }]
            },                                
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: true,
                        },
                    },                    
                    {
                        loader: 'sass-loader',
                        options: {
                            // Prefer `dart-sass`
                            implementation: require('sass'),
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: 'expanded',
                            },
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            template: 'src/index.html',
        }),
        new MiniCssExtractPlugin({
            filename: 'main.bundle.css',
        }),
        new WebpackObfuscator({
            rotateStringArray: true,
        }),        
        new BeautifyHtmlWebpackPlugin(),
    ],
    devServer: {
        static: {
            directory: path.resolve(__dirname, './src'),
            publicPath: '/dist/',
        },
        host: '0.0.0.0',
        port: 3005,
        open: true,
        historyApiFallback: true, //single page app
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '/assets/spine': path.resolve(__dirname, './src/assets/spine'),
            '/assets/img': path.resolve(__dirname, './src/assets/img'),
            '/assets/audio': path.resolve(__dirname, './src/assets/audio')            
        },
    },
    performance: {
        maxEntrypointSize: 900000,
        maxAssetSize: 900000
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    output: {
                        comments: false,
                    },
                    compress: {
                        drop_console: true,
                    },
                },
            }),
        ],
    },
};
