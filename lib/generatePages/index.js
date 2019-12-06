const registerHelpers = require('./registerHelpers');
const registerPartials = require('./registerPartials');
const processData = require('./processData');

function generatePages(pages) {
	// Output something to show the script has started
	console.info('Building html pages...\n'); // eslint-disable-line no-console

	registerHelpers();
	registerPartials();
	processData(pages);
}

// if script is ran outside a require, i.e. via npm scripts
if (!module.parent) {
	generatePages(); // generate all pages
}

module.exports = generatePages;
