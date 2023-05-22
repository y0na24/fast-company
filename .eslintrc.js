module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'standard'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['react'],
	rules: {
		'space-before-function-paren': [
			'error',
			{ anonymous: 'always', named: 'never' },
		],
		'multiline-ternary': ['off'],
		indent: 'off',
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'comma-dangle': 'off',
		'object-curly-spacing': [2, 'always'],
	},
}
