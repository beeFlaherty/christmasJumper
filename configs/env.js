const path = require('path');
const dotenv = require('dotenv');

const { NODE_ENV } = process.env;
if (!NODE_ENV) {
	throw new Error(
		'The NODE_ENV environment variable is required but was not specified.'
	);
}

module.exports = () => {
	const environmentSpecificLocalEnv = dotenv.config({
		path: path.resolve(`.env.${NODE_ENV}.local`),
	});

	const localEnv = NODE_ENV === 'test'
		? {}
		: dotenv.config({
			path: path.resolve('.env.local'),
		});

	const environmentSpecificEnv = dotenv.config({
		path: path.resolve(`.env.${NODE_ENV}`),
	});

	const defaultEnv = dotenv.config({ path: path.resolve('.env') });

	return Object.assign(
		{},
		defaultEnv.parsed,
		environmentSpecificEnv.parsed,
		localEnv.parsed,
		environmentSpecificLocalEnv.parsed
	);
};
