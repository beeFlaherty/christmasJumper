/* eslint no-console: 0 */
const readdir = require('recursive-readdir');
const config = require('./config');
const buildPage = require('./buildPage');

function processFiles(files) {
	// if there are any files, build pages for them
	if (files && files.length) {
		let totalPages = 0;
		let successes = 0;
		let failures = 0;

		console.time('Completed in');

		files.forEach((file) => {
			const result = buildPage(file);
			if (result === 'success') {
				successes += 1;
			} else {
				failures += 1;
			}
			totalPages += 1;
		});

		if (successes > 0) {
			console.info(`\u{1b}[32m✓\u{1b}[0m Successfully built ${successes} out of ${totalPages} page(s)\n`);
		}

		if (failures > 0) {
			console.error(`\u{1b}[31m✗\u{1b}[0m ${failures} page(s) didn't build correctly\n`);
		}

		console.timeEnd('Completed in');
		console.log('\n');
	}
}

const processData = (pages) => {
	if (pages && pages.length) {
		// if array of files paths are passed here, process them
		processFiles(pages);
	} else {
		// otherwise, recursively iterate the data directory for files
		readdir(config.dataDirectory, (error, files) => {
			if (error) {
				console.log(`Error processing data: ${error}`);
			}
			processFiles(files);
		});
	}
};

module.exports = processData;
