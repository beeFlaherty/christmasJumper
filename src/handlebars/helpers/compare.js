/* eslint valid-typeof: 0 */
/**
 * Render a block when a comparison of the first and third
 * arguments returns true. The second argument is
 * the [arithemetic operator][operators] to use. You may also
 * optionally specify an inverse block to render when falsy.
 *
 * @param `a`
 * @param `operator` The operator to use.
 * Operators must be enclosed in quotes: `">"`, `"="`, `"<="`, and so on.
 * @param `b`
 * @param {Object} `options` Handlebars provided options object
 * @return {String} Block, or if specified the inverse block is rendered if falsey.
 * @block
 */

function compare(handlebars) {
	handlebars.registerHelper('compare', (a, operator, b, options) => {
		let result;
		switch (operator) {
			case '===':
				result = a === b;
				break;
			case '!==':
				result = a !== b;
				break;
			case '<':
				result = a < b;
				break;
			case '>':
				result = a > b;
				break;
			case '<=':
				result = a <= b;
				break;
			case '>=':
				result = a >= b;
				break;
			case 'typeof':
				result = typeof a === b;
				break;
			default: {
				throw new Error(`helper {{compare}}: invalid operator: ${operator}`);
			}
		}
		return result ? options.fn(this) : options.inverse(this);
	});
}

module.exports = compare;
