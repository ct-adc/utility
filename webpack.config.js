/**
 * Created by rubyisapm on 16/12/21.
 */
var webpack=require('webpack');
module.exports = {
  entry: {
    index: './index'
  },
  output: {
    path: './lib',
    filename: 'utility.js',
    libraryTarget:'umd',
    library:'ct-adc-utility'
  },
  devtool:'eval'
};