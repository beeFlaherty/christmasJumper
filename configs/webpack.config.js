'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const imageminMozjpeg = require('imagemin-mozjpeg');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const WebpackBar = require('webpackbar');
const yn = require('../lib/yn');
const getEnvironment = require('./env');
const paths = require('./paths');
const initialGeneratePagesPlugin = require('../lib/generatePages/initialGeneratePagesPlugin');
const chokidar = require('chokidar');
const generatePages = require('../lib/generatePages');

module.exports = function webpackConfig() {
	const env = getEnvironment();
	const isEnvProduction = (process.env.NODE_ENV === 'production');

	return {
		entry: [
			paths.entryPoint // Entry point for our actual JS
		],
		output: { // This where output will be generated
			publicPath: '/',
			filename: paths.jsFilename,
			path: path.resolve(process.cwd(), paths.buildFolder)
		},

		mode: isEnvProduction ? 'production' : 'development',

		devtool: isEnvProduction ? 'source-map' : 'inline-cheap-module-source-map', // Create sourcemap for JS

		devServer: { // Configure the local web server
			port: 8080,
			contentBase: path.resolve(
				process.cwd(),
				paths.buildFolder
			), // Serve files from the build directory
			open: yn(env.AR_CORE_OPEN_BROWSER), // Launch served content in the browser once ready
			writeToDisk: true, // Actual create output files (rather than doing it all in memory)
			clientLogLevel: 'error', // Minimising logs in the browser
			after: function(app, server) {
				chokidar.watch([
					'src/pages/**/*.json', 
					'src/handlebars/templates/**/*.hbs', 
					'src/handlebars/partials/**/*.hbs',
					'src/handlebars/helpers/**/*.js',
				], {
					// Without this config, this event will fire when a file first 
					// appears on disk before the entire file has been written,
					// which ends up firing two 'change' events
					awaitWriteFinish: {
						stabilityThreshold: 500,
						pollInterval: 100,
					},
				}).on('change', function(changedFilePath) {

					if (changedFilePath.endsWith('.json')) {
						generatePages([ changedFilePath ]); // re-compile only the page that has been updated
					} else {
						generatePages(); // generate all pages
					}

					// refresh page after content change
					server.sockWrite(server.sockets, 'content-changed');
				})
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/, // JavaScript files
					exclude: /(node_modules)/,
					use: [
						{
							loader: 'babel-loader'
						}, // Transpile through Babel
						(isEnvProduction || yn(env.AR_CORE_LINT_DURING_DEV)) ? 'eslint-loader' : false // JavaScript linting
					].filter(Boolean) // Wee trick to not include loaders (see the ternary)
				},
				{
					test: /\.(sc|sa|c)ss$/, // CSS and SCSS
					use: [
						{ // Creates style nodes from JS strings
							loader: 'style-loader',
							options: { sourceMap: true }
						},
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								hmr: !isEnvProduction
							}
						},
						{ // Translates CSS into CommonJS
							loader: 'css-loader',
							options: { sourceMap: true, url: false }
						},
						{ // Do PostCSS (autoprefixing, minificaiton)
							loader: 'postcss-loader',
							options: {
								config: { path: './configs/postcss.config.js' } // Got out config file in non-default location
							}
						},
						{ // Compiles Sass to CSS, using Node Sass by default
							loader: 'sass-loader',
							options: { sourceMap: true }
						}
					].filter(Boolean)
				}
			]
		},

		plugins: [
			new CleanWebpackPlugin(), // Clean the output directory first
			new MiniCssExtractPlugin({ // Actually write CSS as seperate files
				filename: paths.cssFilename
			}),
			new CopyPlugin([ // Copy files directly to the output folder
				{ from: './src/images', to: './images' },
				{ from: './src/static', to: './' }
			]),
			new ImageminPlugin({ // Image minification
				disable: !isEnvProduction, // Disable during development
				test: /\.(jpe?g|png|gif|svg)$/i,
				pngquant: {
					quality: '90'
				},
				plugins: [
					imageminMozjpeg({ quality: 80 }) // Use the much better Mozjpeg plugin for JPEGs
				]
			}),
			new WebpackBar({
				basic: isEnvProduction,
				fancy: !isEnvProduction,
			}),
			new initialGeneratePagesPlugin(),
			
			(isEnvProduction || yn(env.AR_CORE_LINT_DURING_DEV))
				? new StyleLintPlugin()
				: false // S/CSS linting
		].filter(Boolean),

		// This determines what bundle information is displayed in the terminal output
		stats: {
			children: false,
			chunks: false,
			chunkModules: false,
			chunkOrigins: false,
			entrypoints: false,
			hash: false,
			modules: false,
			excludeAssets: [/.map/, /.ico/, /.hot-update.*/],
			version: false,
		},
	};
};
