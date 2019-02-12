// @ts-nocheck

const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const REG = /components\/(\w+)/;
const JS_ENTRY_FILE = '*.js';
const HTML_ENTRY_FILE = '*.html';

module.exports = (
	root = 'src/components/**/',
	favicon = './src/favicon.ico',
	publicChunks = [ 'vandor' ]
) => {

	// Generate Entries
	const entries = glob.sync(root + JS_ENTRY_FILE).reduce((prev, next) => {
		const name = next.match(REG)[1];
		const path = './' + next;
		prev[name] = path;
		return prev;
	}, {});

	// Generate HtmlWebpackPlugins
	const plugins = glob.sync(root + HTML_ENTRY_FILE).map(file => {
		const name = file.match(REG)[1];
		const template = './' + file;
		const chunks = [ name ].concat(publicChunks);
		return new HtmlWebpackPlugin({
			filename: name + '.html',
			template,
			favicon,
			chunks
		});
	});

	return { entries, plugins };
};