# stylelint-selector-pseudo-class-lvhfa

[![Build Status][ci-img]][ci]

Stylelint rule for LVHFA order in link selectors.

## Install

```sh
npm install stylelint-selector-pseudo-class-lvhfa --save-dev
```

## Usage

Add this config to your `.stylelintrc`:

```json
{
	"plugins": [
		"stylelint-selector-pseudo-class-lvhfa"
	],
	"rules": [
		"plugin/selector-pseudo-class-lvhfa": true
	]
}
```

## Details

```css
    a:link,
    a:visited,
    a:hover,
    a:focus,
    a:active {}
/**   ↑
 * This type of pseudo-class selector */
```

When specifying link pseudo-classes, always do so in this order: **L**ink, **V**isited, **H**over, **F**ocus, **A**ctive. Any other order won’t work consistently. This rule is probably not valid anymore, but it helps to keep these selectors in consistent order.

For more information, read [Eric Meyer’s explanation](http://meyerweb.com/eric/thoughts/2007/06/11/who-ordered-the-link-states/).

To help you remember this order, there are a couple of mnemonics for that:

* LoVe, HAte
* Lord Vader Hates Furry Animals
* Lord Vader's Handle Formerly Anakin
* Lord Voldemort Has Foul Ambitions

### Options

#### `true`

The following patterns are considered warnings:

```css
a:visited,
a:link,
a:focus,
a:hover,
a:active {}
```

```css
a:visited,
a:link,
a:active {}
```

The following patterns are *not* considered warnings:

```css
a:link,
a:visited,
a:hover,
a:focus,
a:active {}
```

```css
a:link,
a:visited,
a:active {}
```

---

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

[ci]: https://travis-ci.org/niksy/stylelint-selector-pseudo-class-lvhfa
[ci-img]: https://img.shields.io/travis/niksy/stylelint-selector-pseudo-class-lvhfa/master.svg
