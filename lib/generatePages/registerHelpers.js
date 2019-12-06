const fs = require('fs');
const handlebars = require('handlebars');
const config = require('./config');

// Dynamically register handlebars helpers from directory
const registerHelpers = () => fs.readdirSync(config.helpersDirectory).forEach((fileName) => {
	const helper = require(`../.${config.helpersDirectory}${fileName}`); // eslint-disable-line global-require, import/no-dynamic-require
	helper(handlebars);
});

module.exports = registerHelpers;
