/**
 * Parse yes/no like values
 * The following case-insensitive values are recognized:
 * 'y', 'yes', 'true', true, '1', 1, 'n', 'no', 'false', false, '0', 0
 *
 * @param {*} input Value that should be converted.
 * @param {object} options Use a key distance-based score to leniently accept typos of yes and no.
 * @returns {boolean} The parsed boolean value.
 */
const yn = (input, options) => {
	const parsedInput = String(input).trim();

	const parsedOptions = Object.assign({
		default: null
	}, options);

	if (parsedOptions.default !== null && typeof parsedOptions.default !== 'boolean') {
		throw new TypeError(`Expected the \`default\` option to be of type \`boolean\`, got \`${typeof parsedOptions.default}\``);
	}

	if (/^(?:y|yes|true|1)$/i.test(parsedInput)) {
		return true;
	}

	if (/^(?:n|no|false|0)$/i.test(parsedInput)) {
		return false;
	}

	return parsedOptions.default;
};

module.exports = yn;
