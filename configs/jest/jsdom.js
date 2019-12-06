'use strict';

// Make sure we're in a Browser-like environment before importing polyfills
// This prevents `fetch()` from being imported in a Node test environment
if (typeof window !== 'undefined') {
	// fetch() polyfill for making API calls.
	/* eslint-disable global-require */
	/* eslint-disable import/no-extraneous-dependencies */
	require('whatwg-fetch');
	/* eslint-enable import/no-extraneous-dependencies */
	/* eslint-enable global-require */
}
