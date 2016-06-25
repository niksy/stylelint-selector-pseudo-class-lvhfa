var test = require('stylelint-test-rule-tape');
var fn = require('../');

test(fn.rule, {
	ruleName: fn.ruleName,
	config: true,
	skipBasicChecks: true,

	accept: [
		{
			code: 'a:link, a:visited, a:hover, a:focus, a:active {}'
		},
		{
			code: 'a:link, a:foo, a:visited, b:bar, a:hover, c:baz, a:focus, a:active {}'
		},
		{
			code: 'a:link::before, a:visited:before, a:hover, a:focus::after, a:active:after {}'
		},
		{
			code: 'a:link, a:link, a:visited, a:hover, a:hover, a:focus, a:active {}'
		},
		{
			code: 'a:foo, a:bar, b:baz, b:bad {}'
		}
	],
	reject: [
		{
			code: 'a:visited, a:link, a:hover, a:focus, a:active {}',
			message: fn.messages.expected
		},
		{
			code: 'a:visited, a:foo, a:link, b:bar, a:hover, c:baz, a:focus, a:active {}',
			message: fn.messages.expected
		},
		{
			code: 'a:link::before, a:hover, a:visited:before, a:focus::after, a:active:after {}',
			message: fn.messages.expected
		},
		{
			code: 'a:link, a:link, a:hover, a:hover, a:focus, a:visited, a:active {}',
			message: fn.messages.expected
		}
	]
});

test(fn.rule, {
	ruleName: fn.ruleName,
	config: true,
	skipBasicChecks: true,
	syntax: 'scss',

	accept: [
		{
			code: 'a { &:link, &:visited, &:hover, &:focus, &:active {} }'
		},
		{
			code: 'a { &:link, &:foo, &:visited, b:bar, &:hover, c:baz, &:focus, &:active {} }'
		},
		{
			code: 'a { &:link::before, &:visited:before, &:hover, &:focus::after, &:active:after {} }'
		},
		{
			code: 'a { &:link, &:link, &:visited, &:hover, &:hover, &:focus, &:active {} }'
		},
		{
			code: 'a { &:link, &:visited, &:hover, &:focus, &:active { b { &:link, &:visited, &:hover, &:focus, &:active {} } } }'
		},
		{
			code: 'a { &:foo, &:bar {} } b { &:baz, &:bad {} }'
		}
	],
	reject: [
		{
			code: 'a { &:visited, &:link, &:hover, &:focus, &:active {} }',
			message: fn.messages.expected
		},
		{
			code: 'a { &:visited, &:foo, &:link, b:bar, &:hover, c:baz, &:focus, &:active {} }',
			message: fn.messages.expected
		},
		{
			code: 'a { &:link::before, &:hover, &:visited:before, &:focus::after, &:active:after {} }',
			message: fn.messages.expected
		},
		{
			code: 'a { &:link, &:link, &:hover, &:hover, &:focus, &:visited, &:active {} }',
			message: fn.messages.expected
		},
		{
			code: 'a { &:visited, &:link, &:hover, &:focus, &:active { b { &:link, &:visited, &:hover, &:focus, &:active {} } } }',
			message: fn.messages.expected
		}
	]
});
