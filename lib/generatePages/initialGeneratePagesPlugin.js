const generatePages = require('.');

class initialGeneratePagesPlugin {
	constructor() {
		this.hasRun = false;
	}

	apply(compiler) {
		compiler.hooks.make.tap(
			'initialGeneratePagesPlugin', () => {
				if (!this.hasRun) {
					generatePages();
				}
			}
		);
		compiler.hooks.done.tap(
			'initialGeneratePagesPlugin', () => {
				if (!this.hasRun) {
					this.hasRun = true;
				}
			}
		);
	}
}

module.exports = initialGeneratePagesPlugin;
