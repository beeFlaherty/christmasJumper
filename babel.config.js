/* eslint-disable filenames/match-exported */
module.exports = function config(api) {
	const isTest = api.env('test');

	const presets = [
		[
			'@babel/preset-env',
			{
				// Do not transform modules to CJS, Webpack will take care of that
				modules: isTest ? 'commonjs' : false,
				useBuiltIns: 'usage',
				// Don't log anything on the console
				debug: false,
				// Set the corejs version we are using to avoid warnings in console
				// This will need to change once we upgrade to corejs@3
				corejs: 3,
				// Exclude transforms that make all code slower
				exclude: ['transform-typeof-symbol']
			}
		]
	];

	const plugins = [
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-transform-runtime',
		'@babel/plugin-proposal-optional-chaining'
	];

	api.cache(true);

	return {
		presets,
		plugins
	};
};
/* eslint-enable filenames/match-exported */
