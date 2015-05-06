# react-scoped-style
---

scope react element by transform external style into inline styles

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]
[![Sauce Test Status](https://saucelabs.com/buildstatus/react-scoped-style)](https://saucelabs.com/u/react-scoped-style)

[![Sauce Test Status](https://saucelabs.com/browser-matrix/react-scoped-style.svg)](https://saucelabs.com/u/react-scoped-style)

[npm-image]: http://img.shields.io/npm/v/react-scoped-style.svg?style=flat-square
[npm-url]: http://npmjs.org/package/react-scoped-style
[travis-image]: https://img.shields.io/travis/react-component/react-scoped-style.svg?style=flat-square
[travis-url]: https://travis-ci.org/react-component/react-scoped-style
[coveralls-image]: https://img.shields.io/coveralls/react-component/react-scoped-style.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/react-component/react-scoped-style?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/react-component/react-scoped-style.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/react-component/react-scoped-style
[node-image]: https://img.shields.io/badge/node.js-%3E=_0.10-green.svg?style=flat-square
[node-url]: http://nodejs.org/download/
[download-image]: https://img.shields.io/npm/dm/react-scoped-style.svg?style=flat-square
[download-url]: https://npmjs.org/package/react-scoped-style


## Development

```
npm install
npm start
```

## Example

http://localhost:8000/examples/

online example: http://react-component.github.io/react-scoped-style/build/examples/


## Feature

* support ie8,ie8+,chrome,firefox,safari
* does not support css priority (just apply rules by css order in source text)

## install

[![react-scoped-style](https://nodei.co/npm/react-scoped-style.png)](https://npmjs.org/package/react-scoped-style)

## Usage

```js
var scopedStyle = require('react-scoped-style');
var React = require('react');
var css = scopedStyle.parseCss(`
.test {
  color:red;
  zoom:1.5;
}
div>span{
  color:green;
  zoom:1.5;
}
`);

var html = <div>
  <h1 className="test">scope react element by transform external style into inline styles</h1>
  {
    scopedStyle.transformElement(<div>
      <span>green zoom</span>
      <span style={{color:'blue'}}>blue zoom</span>
      <p>
        <span>black</span>
        <span>  -   </span>
        <a className='test'>red zoom</a>
      </p>
    </div>, css)
    }
</div>;

React.render(html, document.getElementById('__react-content'));
```

## API

### methods

- ParsedCssResult parseCss(css:String)  parse css into object


- ReactElement transformElement(root:ReactElement, css:String|ParsedCssResult)


## Test Case

http://localhost:8000/tests/runner.html?coverage

## Coverage

http://localhost:8000/node_modules/rc-server/node_modules/node-jscover/lib/front-end/jscoverage.html?w=http://localhost:8000/tests/runner.html?coverage

## License

react-scoped-style is released under the MIT license.
