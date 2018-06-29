const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const glob = require("glob");
const fs = require("fs");


function resolve (dir) {
	return path.join(__dirname, '.', dir)
}

// --------------------------------------------------template
// Our function that generates our html plugins
function generateHtmlPlugins (templateDir) {
	// Read files in template directory
	const templateFiles = fs.readdirSync(path.resolve(__dirname, templateDir))
	return templateFiles.map(item => {
	  // Split names and extension
	  const parts = item.split('.')
	  const name = parts[0]
	  const extension = parts[1]
	  // Create new HTMLWebpackPlugin with options
	  return new HtmlWebpackPlugin({
		filename: `${name}.html`,
		template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
	  })
	})
}
const htmlPlugins = generateHtmlPlugins('./src/template/pages');

// -------------------------------------------------- javascript
function generateJavascript(templateDir){
	var newItem = {};
	// Read files in template directory
	const templateFiles = fs.readdirSync(path.resolve(__dirname,templateDir))
	templateFiles.forEach(item => {
		// Split names and extension
		const parts = item.split('.')
		const name = parts[0]
		const extension = parts[1]

		newItem[name] = `${templateDir}/${name}.${extension}`;
	});
	return newItem;
}
const javascriptEntry = generateJavascript("./src/scripts/bootstrap");


// --------------------------------------------- run command
module.exports = {
  	entry:javascriptEntry ,
  	devtool : "eval",
	output: {
		filename: 'scripts/[name].bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: "./"
	},
	resolve: {
		extensions: ['.js', '.twig' , '.json'],
		alias: {
		  	'src': resolve('src'),
			'assets': resolve('src/assets'),
			'lib': resolve('src/lib')
		}
	  },
	module: {
	    loaders: [
			{ test: /\.(scss|css)(\?.*)?$/, loader: ExtractTextPlugin.extract({
					publicPath:"/",
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			},
			{ 
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			},
			{ 
				test: /\.twig$/, 
				exclude: /node_modules/,
				loader: 'twig-loader'
			},
			{ 
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader:'file-loader',
				options:{
					name: "[name].[hash].[ext]",
					outputPath: './assets/images',
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'file-loader',
				options:{
					name: "[name].[hash].[ext]",
					outputPath: './assets/media'
				}
			  },
			  {
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader',
				options:{
					name: "[name].[hash].[ext]",
					outputPath: './assets/fonts',
					publicPath:"../assets/fonts"
				}
			  }
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			// { from: './src/inline-scripts', to:'./inline-scripts'},
		]),
		new webpack.ProvidePlugin({
            $: "jquery",
			jQuery: "jquery",
			_:"underscore"
        }),
		new ExtractTextPlugin({
			filename: "styles/[name].bundle.css"
		}),  
    ]
	.concat(htmlPlugins)
};