'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
var webpack= require('webpack')
var autoprefixer = require('autoprefixer')

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
        
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
        }
    },
    module: {
        rules: [
            ...(config.dev.useEslint ? [{
                test: /\.(js|vue)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [resolve('src'), resolve('test')],
                options: {
                  formatter: require('eslint-friendly-formatter'),
                  emitWarning: !config.dev.showEslintErrorsInOverlay
                }
            }] : []),
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                // options: {
                //     limit: 10000,
                //     name: utils.assetsPath('img/[name].[hash:7].[ext]')
                // }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    plugins: [ 
        // new webpack.optimize.CommonsChunkPlugin('common.js'),
        // {
        //     //name对应入口文件中的名字，我们起的是jQuery
        //     name:['jquery','underscore'],
        //     //把文件打包到哪里，是一个路径
        //     filename:"assets/js/[name].js",
        //     //最小打包的文件模块数，这里直接写2就好
        //     minChunks:2
        // }
        new webpack.ProvidePlugin({ 
          _:'underscore'
        }),
        // new webpack.LoaderOptionsPlugin({
        //   test:   /\.css$/,loader: "style-loader!css-loader!postcss-loader",
        //   options: {
        //     postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
        //   }
        // })
      ] 
}