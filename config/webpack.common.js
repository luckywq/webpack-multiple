// @ts-nocheck

const path = require('path');
const Webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Mapper = require('./mapper')();
const devMode = process.env.NODE_ENV === 'development';

module.exports = {
	entry: Mapper.entries,
	output: {
		path: path.resolve(__dirname, '../dist'),
		filename: 'js/[name].[hash].js',
	},
	module: {
		rules: [
			{
				enforce: 'pre', // preloader
				test: /\.js$/i,
				exclude: /node_modules/,
				use: {
					loader: 'eslint-loader',
				}
			},
			{
				test: /\.js$/i,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							'@babel/transform-runtime' // async support
						]
					}
				}
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
					'css-loader',
					'postcss-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|svg|jpe*g|gif|mp3|ogg|ttf|woff|woff2|ico)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name() {
								return devMode ? '[path][name].[ext]' : '[hash].[ext]';
							},
							outputPath: devMode ? '' : 'src/'
						}
					}
				]
			},
			{
				test: /\.html$/i,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: !devMode
						}
					}
				]
			}
		]
	},
	resolve: {
		extensions: ['.js'],
		alias: {
			'@': path.resolve(__dirname, '../node_modules/bootstrap/dist')
		}
	},
	plugins: [
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, '../')
		}),
		new MiniCssExtractPlugin({
			filename: devMode ? '[name].css' : 'css/[name].[hash].css',
			chunkFilename: devMode ? '[id].css' : 'css/[id].[hash].css',
		}),
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, '../src/assets'),
				to: 'assets',
				ignore: [ '.DS_Store' ]
			}
		]),
		new Webpack.ProvidePlugin({
			$: 'jquery'
		})
	].concat(Mapper.plugins),
	optimization: {
		splitChunks: {
			cacheGroups: {
				vandor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vandor',
					chunks: 'all'
				},
				// styles: {
				//   name: 'styles',
				//   test: /\.css$/,
				//   chunks: 'all'
				// }
			},
		}
	}
};
