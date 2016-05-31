webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(187);


/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _reactScopedStyle = __webpack_require__(41);
	
	var _reactScopedStyle2 = _interopRequireDefault(_reactScopedStyle);
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(57);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var style = (0, _reactScopedStyle.createStyleSheet)('\n.test {\n  color:red;\n  zoom:1.5;\n}\ndiv>span{\n  color:green;\n  zoom:1.5;\n}\n');
	
	var html = _react2.default.createElement(
	  'div',
	  null,
	  _react2.default.createElement(
	    'p',
	    { className: 'test' },
	    'scope react element by transform external style into inline styles'
	  ),
	  _react2.default.createElement(
	    'p',
	    null,
	    _react2.default.createElement(
	      'a',
	      { href: 'https://github.com/react-component/react-scoped-style' },
	      'repo'
	    )
	  ),
	  _react2.default.createElement(
	    _reactScopedStyle2.default,
	    { style: style },
	    _react2.default.createElement(
	      'div',
	      null,
	      _react2.default.createElement(
	        'span',
	        null,
	        'green zoom'
	      ),
	      _react2.default.createElement(
	        'span',
	        { style: { color: 'blue' } },
	        'blue zoom'
	      ),
	      _react2.default.createElement(
	        'p',
	        null,
	        _react2.default.createElement(
	          'span',
	          null,
	          'black'
	        ),
	        _react2.default.createElement(
	          'span',
	          null,
	          ' - '
	        ),
	        _react2.default.createElement(
	          'a',
	          { className: 'test' },
	          'red zoom'
	        )
	      ),
	      _react2.default.createElement(
	        _reactScopedStyle2.default,
	        null,
	        _react2.default.createElement(
	          'a',
	          { className: 'test' },
	          'black isolate'
	        )
	      ),
	      _react2.default.createElement(
	        _reactScopedStyle2.default,
	        { scoped: false },
	        _react2.default.createElement(
	          'a',
	          { className: 'test' },
	          'red zoom penetrate'
	        )
	      )
	    )
	  )
	);
	
	_reactDom2.default.render(html, document.getElementById('__react-content'));

/***/ }

});
//# sourceMappingURL=simple.js.map