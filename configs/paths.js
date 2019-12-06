const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolvePath = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
	entryPoint: resolvePath('src/client/index.js'),
	buildFolder: resolvePath('build'),
	jsFilename: 'js/main.js',
	cssFilename: 'css/main.css'
};
