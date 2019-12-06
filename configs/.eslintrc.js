module.exports = {
	extends: [
		'@amazerealise/eslint-config',
		'@amazerealise/eslint-config/node'
	],
	rules: {
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: [
					'./configs/*'
				]
			}
		],
		'node/no-unpublished-require': 'off',
		'filenames/match-exported': 'off',
		'strict': "off"
	}
};
