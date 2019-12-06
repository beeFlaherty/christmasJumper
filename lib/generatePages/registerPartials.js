/* eslint no-console: 0 */
const handlebars = require('handlebars');
const fs = require('fs');
const config = require('./config');

// Dynamically register handlebars partials from directory
const registerPartials = () => fs.readdirSync(config.partialsDirectory).forEach((partial) => {
	// Iterate over partials directory
	fs.readFile(`${config.partialsDirectory}/${partial}`, config.encoding, (readError, output) => {
		// attempt to read file, show error if can't
		if (readError) {
			console.log(`Error reading partial: ${readError}`);
		}
		if (output) {
			// if file has content, then register the content
			// as a partial, with the slug as it's alias.
			const slug = partial.replace(config.templateExtension, '');
			handlebars.registerPartial(slug, output);
		}
	});
});

module.exports = registerPartials;
