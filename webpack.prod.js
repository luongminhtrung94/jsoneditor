const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');

 module.exports = merge(common, {
 	devtool: 'source-map',
   	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/assets', to:'./assets'}
		]),
    	new UglifyJSPlugin({
			sourceMap: true
    	})
   	]
 });