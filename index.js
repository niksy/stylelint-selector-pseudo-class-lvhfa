var stylelint = require('stylelint');
var _ = require('lodash');
var parseSelector = require('stylelint/dist/utils/parseSelector').default;

var ruleName = 'plugin/selector-pseudo-class-lvhfa';

var messages = stylelint.utils.ruleMessages(ruleName, {
	expected: 'Expected pseudo class selectors to follow LVHFA order.'
});

var correctOrder = [
	':link',
	':visited',
	':hover',
	':focus',
	':active'
];

module.exports = stylelint.createPlugin(ruleName, function ( bool ) {

	return function ( cssRoot, result ) {

		var validOptions = stylelint.utils.validateOptions(result, ruleName, {
			actual: bool
		});

		if ( !validOptions ) {
			return;
		}

		cssRoot.walkRules(function ( rule ) {
			parseSelector(rule.selector, result, rule, function ( selector ) {

				var inputOrder = [];
				var finalOrder = [];
				var finalResult;

				selector.walkPseudos(function ( pseudo ) {
					if ( correctOrder.indexOf(pseudo.value) !== -1 ) {
						inputOrder.push(pseudo.value);
					}
				});

				inputOrder = _.uniq(inputOrder);
				finalOrder = _.without.apply(_, [correctOrder].concat(_.difference(correctOrder, inputOrder)));
				finalResult = _.every(finalOrder, function ( pseudo, index ) {
					return pseudo === inputOrder[index];
				});

				if ( !finalResult ) {
					stylelint.utils.report({
						ruleName: ruleName,
						result: result,
						node: rule,
						message: messages.expected
					});
				}

			});
		});

	};

});

module.exports.ruleName = ruleName;
module.exports.messages = messages;
