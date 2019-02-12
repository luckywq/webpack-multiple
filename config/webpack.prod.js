// @ts-nocheck

const WebpackMerge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJSWebpackPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

console.log('############### Mode: Production ###############');

module.exports = WebpackMerge(common, {
	mode: 'production',
	optimization: {
		minimizer: [
			new UglifyJSWebpackPlugin({
				uglifyOptions: {
					ie8: false,
					compress: true,
					mangle: true,
					// warnings: false,
					// parallel: true,
					cache: true,
					// sourceMap: true
				}
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	}
});