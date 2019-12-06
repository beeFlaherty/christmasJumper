module.exports = {
	collectCoverageFrom: ['src/**/*.{js,ts}', '!src/**/*.d.ts'],
	coverageDirectory: '.coverage',
	coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'],
	setupFiles: ['<rootDir>/configs/jest/jsdom.js'],
	setupFilesAfterEnv: [],
	testMatch: [
		'<rootDir>/src/**/__tests__/**/*.{js,ts}',
		'<rootDir>/src/**/*.{spec,test}.{js,ts}'
	],
	testEnvironment: 'jest-environment-jsdom-fourteen',
	transform: {
		'^.+\\.(js|ts)$': 'babel-jest',
		'^.+\\.css$': '<rootDir>/configs/jest/cssTransform.js'
	},
	transformIgnorePatterns: [
		'[/\\\\]node_modules[/\\\\].+\\.(js|ts)$',
		'^.+\\.module\\.(css|sass|scss)$'
	],
	modulePaths: [],
	moduleNameMapper: {
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy'
	},
	moduleFileExtensions: [
		'web.js',
		'js',
		'web.ts',
		'ts',
		'json',
		'node'
	],
	watchPlugins: [
		'jest-watch-typeahead/filename',
		'jest-watch-typeahead/testname'
	]
};
