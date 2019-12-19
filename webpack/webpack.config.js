const path = require('path');
const webpack = require('webpack');
const __debug= true;
const replacePlugin = require('./replace');
module.exports = {
    entry: {
        main: './src/index.js',
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    resolve: {
        modules: [
            'node_modules',
            path.join(__dirname, '../packages')
        ]
    },
    module: {
        rules: [
            {
                loader: "babel-loader",
                include: [
                    path.join(__dirname, '../packages'),
                    path.join(__dirname, './src'),
                ],
                
                options: {
                    babelrc: false,
                    exclude: '/**/node_modules/**',
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                targets: {
                                    esmodules: true,
                                    browsers: "> 0.25%, not dead"
                                },
                                debug: __debug,
                                modules: 'umd',
                                forceAllTransforms: !__debug,
                                useBuiltIns: false
                            }
                        ],
                        [
                            "@babel/preset-react",
                            {
                                development: true
                            }
                        ],
                        '@babel/preset-flow'
                    ],
                    plugins: [
                        [
                            require('../scripts/babel/transform-replace-console-calls'),
                            {
                                shouldError: false,
                            },
                        ],
                        require('../scripts/error-codes/transform-error-messages'),
                        '@babel/plugin-proposal-class-properties',
                        '@babel/plugin-proposal-object-rest-spread'
                    ]
                }
            },
        ]
    },
    mode: 'development',
    plugins: [
        new webpack.DefinePlugin({
            __DEV__: 'true',
            __PROFILE__: 'true',
            __UMD__: 'true',
            __EXPERIMENTAL__: true,
            'process.env.NODE_ENV': "'development'"
        }),
        new replacePlugin()
    ],
    devServer: {
        port: 3100
    }
}