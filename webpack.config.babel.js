"use strict"
const path = require('path')
const glob = require('glob')
const webpack = require('webpack')
const BabiliPlugin = require('babel-minify-webpack-plugin')

const ENV = process.env.NODE_ENV === 'production' ? 'production' : 'development'
console.log(`
webpack-start
${ENV}
`)

let pluginsList = [
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': `"${ENV}"`
    }
  }),
  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery'
  })
]

const entryPath = path.resolve(__dirname, 'src/')

const targets = glob.sync(entryPath+'/*.ts')

const entries = {};
targets.forEach(value => {
  const re = new RegExp(entryPath+'/')
  const key = value.replace(re, '').replace('.ts', '')
  entries[key] = value
})

console.log(entries)

const webpackConfig = {
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              "presets": [
                [
                  "@babel/preset-env",
                  {
                    "useBuiltIns": "usage",
                    "debug": true,
                    "modules": false
                  }
                ]
              ]
            },
          },
          {
            loader: "ts-loader"
          }
        ],
        exclude: /(node_modules|bower_components)/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js' // 'vue/dist/vue.common.js' webpack 1 用
    }
  },
  plugins: pluginsList,
  externals: {
    jquery: 'jQuery'
  }
}

// uglify ES2015~
if (ENV === 'production') {
  webpackConfig.plugins.push(
    new BabiliPlugin({
      removeConsole: true
    })
  )
}else  {
  webpackConfig.devtool = 'inline-source-map'
}

module.exports = webpackConfig
