// Default configuration settings

const config = {
	dataDirectory: 'src/pages',	// src directory of our data (.json) files
	defaultTemplate: 'homepage', // if no other page template is specificied, this will be used instead
	encoding: 'utf-8', // this will likely never change but this value is re-used multiple times
	helpersDirectory: './src/handlebars/helpers/', // handlebars custom helpers folder
	inputExtension: '.json', // validation for the type of our data files
	minifyBuildOutput: process.env.NODE_ENV === 'production', // Minify the output HTML files if in production
	outputExtension: '.html', // this will likely never change but this value is re-used multiple times
	outputDirectory: './build', // this will likely never change but this value is re-used multiple times
	partialsDirectory: './src/handlebars/partials/', // handlebars partials src folder
	templateDirectory: './src/handlebars/templates/', // handlebars templates src folder
	templateExtension: '.hbs', // Preferred handlebars template file extension
};

module.exports = config;
