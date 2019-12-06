module.exports = {
	extends: [
		'@amazerealise/eslint-config',
		'@amazerealise/eslint-config/node'
	],
	rules: {
		"no-plusplus": 0,
		"no-param-reassign": ["error", { "props": false }],
		"prefer-arrow-callback": 1,
		"no-use-before-define": ["warning", { "functions": false, "classes": true }]
	}
};
