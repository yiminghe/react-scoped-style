# react-scoped-style
---

scope react element by transform external style into inline styles

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][coveralls-image]][coveralls-url]
[![gemnasium deps][gemnasium-image]][gemnasium-url]
[![node version][node-image]][node-url]
[![npm download][download-image]][download-url]


[npm-image]: http://img.shields.io/npm/v/react-scoped-style.svg?style=flat-square
[npm-url]: http://npmjs.org/package/react-scoped-style
[travis-image]: https://img.shields.io/travis/yiminghe/react-scoped-style.svg?style=flat-square
[travis-url]: https://travis-ci.org/yiminghe/react-scoped-style
[coveralls-image]: https://img.shields.io/coveralls/yiminghe/react-scoped-style.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/yiminghe/react-scoped-style?branch=master
[gemnasium-image]: http://img.shields.io/gemnasium/yiminghe/react-scoped-style.svg?style=flat-square
[gemnasium-url]: https://gemnasium.com/yiminghe/react-scoped-style
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

online example: http://yiminghe.github.io/react-scoped-style/

## docs

- [介绍](https://github.com/yiminghe/react-scoped-style/blob/master/docs/zh-cn/intro.md)


## Feature

* support ie8,ie8+,chrome,firefox,safari
* does not support css priority (just apply rules by css order in source text)
* does not support css property inheritance (no shadow dom...)
* does not support :hover, :active ....
* does not support css media query

## install

[![react-scoped-style](https://nodei.co/npm/react-scoped-style.png)](https://npmjs.org/package/react-scoped-style)

## Usage

```js
import ScopedStyle, { createStyleSheet } from 'react-scoped-style';
import React from 'react';
import ReactDOM from 'react-dom';
var style = createStyleSheet(`
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
  <p className="test">scope react element by transform external style into inline styles</p>
  <p>
    <a href="https://github.com/yiminghe/react-scoped-style">repo</a>
  </p>

  <ScopedStyle style={style}>
    <div>
      <span>green zoom</span>
      <span style={{color: 'blue'}}>blue zoom</span>
      <p>
        <span>black</span>
        <span>  -   </span>
        <a className='test'>red zoom</a>
      </p>

      <ScopedStyle>
        <a className='test'>black isolate</a>
      </ScopedStyle>

      <ScopedStyle scoped={false}>
        <a className='test'>red zoom penetrate</a>
      </ScopedStyle>
    </div>
  </ScopedStyle>
</div>;

ReactDOM.render(html, document.getElementById('__react-content'));
```

## API

### props

<table class="table table-bordered table-striped">
    <thead>
    <tr>
        <th style="width: 100px;">name</th>
        <th style="width: 50px;">type</th>
        <th style="width: 50px;">default</th>
        <th>description</th>
    </tr>
    </thead>
    <tbody>
        <tr>
          <td>scoped</td>
          <td>Boolean</td>
          <td>true</td>
          <td>whether isolated from outside</td>
        </tr>
        <tr>
          <td>style</td>
          <td>String|ParsedCssResult</td>
          <td></td>
          <td>style to be applied</td>
        </tr>
    </tbody>
</table>

### methods

- ParsedCssResult createStyleSheet(css:String)  parse css into object

- ReactElement transformElement(root:ReactElement, css:String|ParsedCssResult)

## Test Case

```
npm test
npm run chrome-test
```

## Coverage

```
npm run coverage
```

open coverage/ dir

## License

react-scoped-style is released under the MIT license.
