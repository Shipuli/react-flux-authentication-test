var Webpack = require('webpack'),
	path = require('path'),
	nodeModulesPath = path.resolve(__dirname, 'node_modules'),
	mainPath = path.resolve(__dirname, 'src', 'index.js'),
	buildPath = path.resolve(__dirname, 'public');

var config = {
	devtool: 'eval',
	entry: [
		'webpack/hot/dev-server',
		'webpack-dev-server/client?http://localhost:8080',
		mainPath
	],
	output: {
		path: buildPath,
		filename:'bundle.js',
		publicPath: '/public/'
	},
	module: {
		loaders:[
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: [nodeModulesPath]
			},
			{
				test: /\.scss$/,
				loader: 'style!css!sass'
			}
		]
	},
	plugins: [new Webpack.HotModuleReplacementPlugin()]
};


module.exports = config;