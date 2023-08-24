import function_ from '../index.js';
import { runCodeTest } from './util/index.js';

// @ts-ignore
const { ruleName, messages } = function_;

runCodeTest({
	ruleName: ruleName,
	config: true,

	accept: [
		{
			input: 'a:link, a:visited, a:hover, a:focus, a:active {}',
			result: []
		},
		{
			input: 'a:link, a:foo, a:visited, b:bar, a:hover, c:baz, a:focus, a:active {}',
			result: []
		},
		{
			input: 'a:link::before, a:visited:before, a:hover, a:focus::after, a:active:after {}',
			result: []
		},
		{
			input: 'a:link, a:link, a:visited, a:hover, a:hover, a:focus, a:active {}',
			result: []
		},
		{
			input: 'a:foo, a:bar, b:baz, b:bad {}',
			result: []
		}
	],
	reject: [
		{
			input: 'a:visited, a:link, a:hover, a:focus, a:active {}',
			result: [
				{
					column: 1,
					line: 1,
					endColumn: 49,
					endLine: 1,
					text: messages.expected
				}
			]
		},
		{
			input: 'a:visited, a:foo, a:link, b:bar, a:hover, c:baz, a:focus, a:active {}',
			result: [
				{
					column: 1,
					line: 1,
					endColumn: 70,
					endLine: 1,
					text: messages.expected
				}
			]
		},
		{
			input: 'a:link::before, a:hover, a:visited:before, a:focus::after, a:active:after {}',
			result: [
				{
					column: 1,
					line: 1,
					endColumn: 77,
					endLine: 1,
					text: messages.expected
				}
			]
		},
		{
			input: 'a:link, a:link, a:hover, a:hover, a:focus, a:visited, a:active {}',
			result: [
				{
					column: 1,
					line: 1,
					endColumn: 66,
					endLine: 1,
					text: messages.expected
				}
			]
		}
	]
});

runCodeTest({
	ruleName: ruleName,
	config: true,
	customSyntax: 'postcss-scss',

	accept: [
		{
			input: 'a { &:link, &:visited, &:hover, &:focus, &:active {} }',
			result: []
		},
		{
			input: 'a { &:link, &:foo, &:visited, b:bar, &:hover, c:baz, &:focus, &:active {} }',
			result: []
		},
		{
			input: 'a { &:link::before, &:visited:before, &:hover, &:focus::after, &:active:after {} }',
			result: []
		},
		{
			input: 'a { &:link, &:link, &:visited, &:hover, &:hover, &:focus, &:active {} }',
			result: []
		},
		{
			input: 'a { &:link, &:visited, &:hover, &:focus, &:active { b { &:link, &:visited, &:hover, &:focus, &:active {} } } }',
			result: []
		},
		{
			input: 'a { &:foo, &:bar {} } b { &:baz, &:bad {} }',
			result: []
		}
	],
	reject: [
		{
			input: 'a { &:visited, &:link, &:hover, &:focus, &:active {} }',
			result: [
				{
					column: 5,
					line: 1,
					endColumn: 53,
					endLine: 1,
					text: messages.expected
				}
			]
		},
		{
			input: 'a { &:visited, &:foo, &:link, b:bar, &:hover, c:baz, &:focus, &:active {} }',
			result: [
				{
					column: 5,
					line: 1,
					endColumn: 74,
					endLine: 1,
					text: messages.expected
				}
			]
		},
		{
			input: 'a { &:link::before, &:hover, &:visited:before, &:focus::after, &:active:after {} }',
			result: [
				{
					column: 5,
					line: 1,
					endColumn: 81,
					endLine: 1,
					text: messages.expected
				}
			]
		},
		{
			input: 'a { &:link, &:link, &:hover, &:hover, &:focus, &:visited, &:active {} }',
			result: [
				{
					column: 5,
					line: 1,
					endColumn: 70,
					endLine: 1,
					text: messages.expected
				}
			]
		},
		{
			input: 'a { &:visited, &:link, &:hover, &:focus, &:active { b { &:link, &:visited, &:hover, &:focus, &:active {} } } }',
			result: [
				{
					column: 5,
					line: 1,
					endColumn: 109,
					endLine: 1,
					text: messages.expected
				}
			]
		}
	]
});
