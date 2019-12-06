/* eslint no-console: 0 */
const fs = require('fs');
const handlebars = require('handlebars');
const { minify } = require('html-minifier');
const config = require('./config');

function buildPage(inputFilePath) {
	// limit to specific file type
	if (!inputFilePath.endsWith(config.inputExtension)) {
		console.info(`\u{1b}[31mNot a ${config.inputExtension} file, skipping...\u{1b}[0m\n`);
		return false;
	}

	// Read file from input path
	const file = fs.readFileSync(inputFilePath, config.encoding);
	if (!file) {
		console.error(`\u{1b}[31mError reading page file ${inputFilePath}:\u{1b}[0m\n`);
		return false;
	}

	// if there is file content, try to parse as valid json
	let data = {};
	try {
		if (file) {
			data = JSON.parse(file);
		}
	} catch (parseFileContentError) {
		// otherwise skip this file
		console.error(`\u{1b}[31mError parsing file content from: ${inputFilePath}\u{1b}[0m\n${parseFileContentError}\n`);
		return false;
	}

	// Log out warning if template isn't specified in data
	if (!data.template) {
		console.info(`Warning: no template specified, using default: ${config.defaultTemplate}\n`);
	}

	// dynamically load correct template based on data
	const srcPath = config.templateDirectory
					+ (data.template || config.defaultTemplate)
					+ config.templateExtension;

	const readFile = fs.readFileSync(srcPath, config.encoding);

	if (!readFile) {
		console.error(`\u{1b}[31mError reading template file from ${srcPath}:\u{1b}[0m\n`);
	}

	// pass data for template compilation
	let html = '';
	try {
		const template = handlebars.compile(readFile);
		html = template(data);
	} catch (templateCompilationError) {
		console.error(`\u{1b}[31mError compiling template from ${srcPath}:\u{1b}[0m\n${templateCompilationError}\n`);
	}

	if (config.minifyBuildOutput) {
		// minify build output if required
		// (intended for use in production)
		html = minify(html, {
			collapseWhitespace: true,
			removeComments: true,
		});
	}

	// construct array from output folders
	// NOTE: These are Windows-only, we might need refactoring for other OSes
	const outputFolders = inputFilePath
		.replace(/\\/g, '/') // replace back slashes with forward slashes
		.split('/') // create array from individual path entities
		.filter((_, index) => index > 1); // filter out first couple of entities from src

	// remove last item in path and store (this is the original filename)
	const targetFileName = outputFolders.pop();

	// join remaining items back into readable path
	const outputPath = data.path
		? `${config.outputDirectory}${data.path}`// optionally override output path
		: `${config.outputDirectory}${outputFolders.length
			? `/${outputFolders.join('/').trim()}` : ''}`;

	// Use the original target name for output file,
	// swapping out original extension for html extension
	const targetPathWithFileName = `${outputPath}/${targetFileName.replace(config.inputExtension, config.outputExtension)}`;

	// Check if output path exists
	if (!fs.existsSync(outputPath)) {
		// if not, recursively create folders to match output path
		fs.mkdirSync(outputPath, { recursive: true }, (createOutputPathError) => {
			if (createOutputPathError) {
				console.error(`\u{1b}[31mError creating directory: ${outputPath}\u{1b}[0m\n${createOutputPathError}\n`);
			} else {
				console.info(`Created directory path: ${outputPath}`);
			}
		});
	}

	// save the handlebars output html to file
	try {
		fs.writeFileSync(targetPathWithFileName, html);
		return 'success';
	} catch (error) {
		return false;
	}
}

module.exports = buildPage;
