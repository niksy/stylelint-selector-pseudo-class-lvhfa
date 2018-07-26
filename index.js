import stylelint from 'stylelint';
import _ from 'lodash';
import parseSelector from 'stylelint/lib/utils/parseSelector';

const ruleName = 'plugin/selector-pseudo-class-lvhfa';

const messages = stylelint.utils.ruleMessages(ruleName, {
	expected: 'Expected pseudo class selectors to follow LVHFA order.'
});

const correctOrder = [
	':link',
	':visited',
	':hover',
	':focus',
	':active'
];

const plugin = stylelint.createPlugin(ruleName, ( bool ) => {

	return ( cssRoot, result ) => {

		const validOptions = stylelint.utils.validateOptions(result, ruleName, {
			actual: bool
		});

		if ( !validOptions ) {
			return;
		}

		cssRoot.walkRules(( rule ) => {
			parseSelector(rule.selector, result, rule, ( selector ) => {

				let inputOrder = [];

				selector.walkPseudos(( pseudo ) => {
					if ( correctOrder.indexOf(pseudo.value) !== -1 ) {
						inputOrder.push(pseudo.value);
					}
				});

				inputOrder = _.uniq(inputOrder);
				const finalOrder = _.without.apply(_, [correctOrder].concat(_.difference(correctOrder, inputOrder)));
				const finalResult = _.every(finalOrder, ( pseudo, index ) => pseudo === inputOrder[index]);

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
plugin.messages = messages;

export default plugin;
