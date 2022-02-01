// @ts-check
'use strict';

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
    'env': {
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended'
    ],
    'rules': {
        'semi': 'error',
        'linebreak-style': ['error', 'unix'],
        'strict': ['error', 'global'],
        'eol-last': ['error', 'never'],
        'quotes': ['error', 'single'],
        'no-trailing-spaces': 'error',
        'array-bracket-spacing': ['error', 'never'],
        'object-curly-spacing': ['error', 'never'],
        'key-spacing': 'error',
        'no-whitespace-before-property': 'error',
        'padded-blocks': ['error', 'never'],
        'brace-style': ['error', '1tbs'],
        'func-call-spacing': ['error', 'never'],
        'space-in-parens': 'error',
        'no-mixed-spaces-and-tabs': 'error',
        'comma-spacing': 'error',
        'comma-dangle': ['error', 'never'],
        'indent': ['error', 4]
    },
    'ignorePatterns': ['node_modules']
};