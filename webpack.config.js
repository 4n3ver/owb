/* @flow */
"use strict";

const path = require("path");
const fs = require("fs");

const nodeModules = {};
fs.readdirSync("node_modules")
  .filter(x => [".bin"].indexOf(x) === -1)
  .forEach(mod => nodeModules[mod] = `commonjs ${mod}`);

module.exports = [
    {
        name     : "Client Build",
        entry    : {
            app: path.resolve(__dirname, "src/client/app.jsx")
        },
        output   : {
            path    : path.join(__dirname, "build", "public"),
            filename: "js/[name].bundle.js"
        },
        target   : "web",
        module   : {
            loaders: [
                {
                    test          : /\.jsx?$/,
                    exclude       : /(node_modules)/,
                    loader        : "babel-loader",
                    cacheDirectory: true,
                    query         : {
                        presets: [
                            "es2015",
                            "react"
                        ],
                        plugins: [
                            "transform-flow-strip-types"
                        ]
                    }
                },
                {   // copy static (public) resources to build folder
                    test   : /\.(html|css|js)$/,
                    exclude: /(node_modules|src)/,
                    loader : `file-loader?name=[path][name].[ext]&context=${
                        path.resolve(__dirname, "public/")}`
                }
            ]
        },
        resolve  : {
            extensions: ["", ".js", ".jsx"]
        },
        devServer: {
            historyApiFallback: true,
            inline            : true,
            colors            : true,
            progress          : false,
            open              : true,
            quiet             : true,
            contentBase       : path.resolve(__dirname, "public/"),
            port              : 7777
        },
        devtool  : "source-map"
    },
    {
        name     : "Server Build",
        entry    : path.resolve(__dirname, "src/server/app.js"),
        output   : {
            path    : path.join(__dirname, "build"),
            filename: "app.js"
        },
        externals: nodeModules,
        target   : "node",
        module   : {
            loaders: [
                {
                    test          : /\.js$/,
                    exclude       : /(node_modules)/,
                    loader        : "babel-loader",
                    cacheDirectory: true,
                    query         : {
                        presets: [
                            "es2015"
                        ],
                        plugins: [
                            "transform-flow-strip-types"
                        ]
                    }
                }
            ]
        },
        node     : {
            console   : true,
            global    : true,
            process   : true,
            Buffer    : true,
            __filename: false,
            __dirname : false
        },
        devtool  : "source-map"
    }
];
