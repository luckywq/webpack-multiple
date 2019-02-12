// @ts-nocheck

const WebpackMerge = require('webpack-merge');
const common = require('./webpack.common');
const Webpack = require('webpack');

console.log('############### Mode: Development ###############');

module.exports = WebpackMerge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		index: 'home.html',
		open: true,
		https: false,
		hot: true,
		host: '0.0.0.0', // local area network enabled
		port: 8082,
		useLocalIp: true,
		compress: true,
		headers: {},
		proxy: {
			// '/storage': {
			// 	target: 'http://localhost:9527'
			// }
		},
		before(app) {}, /* eslint-disable-line */
		after(app) {}, /* eslint-disable-line */
	},
	plugins: [
		new Webpack.HotModuleReplacementPlugin()
	]
});