/* eslint-disable no-unused-vars */
const webpack = require("webpack");
const path = require("path");
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require("html-webpack-plugin");

// Load environment variables from .env file
const env = dotenv.config().parsed;

// Convert the environment variables into a form usable by DefinePlugin
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

console.log('Environment Keys:', envKeys);



module.exports = {
  entry: [
    // entry point of our app
    "./client/main.jsx",
  ],
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: "bundle.js",
  },
  //   devtool: 'eval-source-map', ???

  //   mode: 'development',

  mode: process.env.NODE_ENV === "production" ? "production" : "development",

  devServer: {
    compress: true,
    host: "localhost",
    port: 8000,
    // match the output path
    static: {
      directory: path.resolve(__dirname, "build"),
      // match the output 'publicPath'
      //   publicPath: '/',
    },
    // enable HMR on the devServer
    hot: true,

    // fallback to root for other urls
    historyApiFallback: true,
    // headers: { "Access-Control-Allow-Origin": "*" },


    /**
     * proxy is required in order to make api calls to
     * express server while using hot-reload webpack server
     * routes api fetch requests from localhost:8080/api/* (webpack dev server)
     * to localhost:3000/api/* (where our Express server is running)
     */
    // proxy: {
    //   "/api/**": {
    //     target: "http://localhost:3000/",
    //     secure: false,
    //   },
    //   "/assets/**": {
    //     target: "http://localhost:3000/",
    //     secure: false,
    //   },
    // },

  },

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg|ico)$/,
        use: [
          {
            // loads files as base64 encoded data url if image file is less than set limit
            loader: "url-loader",
            options: {
              // if file is greater than the limit (bytes), file-loader is used as fallback
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/index.html",
    }),
    new webpack.DefinePlugin(envKeys),
  ],

  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: [".js", ".jsx"],
  },
};
