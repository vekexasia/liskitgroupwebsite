'use strict'
const webpack           = require('webpack');
const {
        createConfig,
        customConfig,
        devServer,
        defineConstants,
        env,
        entryPoint,
        setOutput,
        sourceMaps,
        addPlugins,
        resolveAliases,
      }                 = require('webpack-blocks');
const ts                = require('webpack-blocks-ts')
const vue               = require('webpack-blocks-vue')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const autoprefixer      = require('autoprefixer')
const config            = require('config');
const fs                = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const basePlugins       = [
  // Generate skeleton HTML file
  new HtmlWebpackPlugin({
    inject  : true,
    template: './src/index.html'
  }),
  // Show nice progress bar
  new ProgressBarPlugin(),
  // new ExtractTextPlugin("styles.css"),
  new CopyWebpackPlugin([
    { from: 'src/assets', to: 'assets' },
    { from: 'delegates.json', to: 'assets' }
  ])
]
;

const productionPlugins = [
  // Support older plugins/loaders that still use global options
  // see https://webpack.js.org/plugins/loader-options-plugin/
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug   : false
  }),
  // new ExtractTextPlugin('styles.css'),
  // Minify JavaScript
  new webpack.optimize.UglifyJsPlugin({
    compress : {
      warnings: false
    },
    output   : {
      comments: false
    },
    screwIe8 : true,
    sourceMap: false
  })
];
fs.writeFileSync(`${__dirname}/config.json`, JSON.stringify(Object.assign({}, config, { priv: null }), null, 2));
fs.writeFileSync(`${__dirname}/delegates.json`, JSON.stringify({
  delegates: config.members.map(m => m.name).concat('fulig'),
  link: 'https://liskitalian.group',
  label: 'LIG'
}, null, 2));

module.exports = createConfig([
  // This will use ./src/index.* based on extension resolution order
  entryPoint('./src'),

  // Always incude the [hash] because the URL is injected into the skeleton
  // generated by the HtmlWebpackPlugin
  setOutput({ path: `${__dirname}/build/`, filename: 'bundle-[hash].js', publicPath: '/' }),

  // TypeScript loader options are specified in tsconfig.json
  ts({
    appendTsSuffixTo: [/\.vue$/],
    compilerOptions: {
      rootDir: './src'
    }
  }),

  // Vue loader must play nice with TypeScript so we use esModule option
  vue({
    // Make compatible with TS loader
    esModule  : true,
    // Use autoprefixer
    postcss   : [autoprefixer()],
    loaders   : {
      'scss': 'vue-style-loader!css-loader!sass-loader',
      'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
    },
    extractCSS: true

  }),


  // Make process.env.NODE_ENV available in the client code
  defineConstants({
    'process.env.NODE_ENV': process.env.NODE_ENV,

  }),

  // Add all the base plugins
  addPlugins(basePlugins),
  customConfig({
    node  : {
      fs           : 'empty',
      child_process: 'empty'
    },
    module: {
      rules: [
        {
          test   : /\.(ico|jpg|gif|png|eot|svg|ttf|woff|woff2)$/,
          loader : 'file-loader',
          options: {
            name: '[name].[ext]?[hash]'
          }
        }
      ],
    }
  }),

  resolveAliases({
    'moment': `${__dirname}/node_modules/moment/min/moment.min.js`,
    'config': `${__dirname}/config.json`,
  }),
  env('development', [
    // In development mode, activate dev server and source maps
    devServer(),
    sourceMaps(),
  ]),

  env('production', [
    // Add all the production plugins
    addPlugins(productionPlugins)
  ])
]);