webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },

/***/ 1:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _App = __webpack_require__(39);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _reactDom = __webpack_require__(57);
	
	var _reactDom2 = _interopRequireDefault(_reactDom);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_reactDom2.default.render(_react2.default.createElement(_App2.default, null), document.getElementById('__react-content'));

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.App = undefined;
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _Region = __webpack_require__(40);
	
	var _Region2 = _interopRequireDefault(_Region);
	
	var _SubRegion = __webpack_require__(54);
	
	var _SubRegion2 = _interopRequireDefault(_SubRegion);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var App = exports.App = function (_React$Component) {
	  _inherits(App, _React$Component);
	
	  function App() {
	    _classCallCheck(this, App);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  App.prototype.render = function render() {
	    return _react2.default.createElement(
	      'div',
	      { className: 'container' },
	      _react2.default.createElement(
	        _Region2.default,
	        null,
	        _react2.default.createElement(_SubRegion2.default, null)
	      )
	    );
	  };
	
	  return App;
	}(_react2.default.Component);
	
	module.exports = App;

/***/ },

/***/ 40:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactScopedStyle = __webpack_require__(41);
	
	var _reactScopedStyle2 = _interopRequireDefault(_reactScopedStyle);
	
	var _regionStyle = __webpack_require__(50);
	
	var _regionStyle2 = _interopRequireDefault(_regionStyle);
	
	var _blockStyle = __webpack_require__(52);
	
	var _blockStyle2 = _interopRequireDefault(_blockStyle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var Region = function (_React$Component) {
	  _inherits(Region, _React$Component);
	
	  function Region() {
	    _classCallCheck(this, Region);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  Region.prototype.render = function render() {
	    return _react2.default.createElement(
	      _reactScopedStyle2.default,
	      { style: [_blockStyle2.default, _regionStyle2.default] },
	      _react2.default.createElement(
	        'div',
	        { className: 'container' },
	        _react2.default.createElement(
	          'h2',
	          { className: 'block' },
	          'css:'
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'block' },
	          _blockStyle.raw,
	          _regionStyle.raw
	        ),
	        this.props.children
	      )
	    );
	  };
	
	  return Region;
	}(_react2.default.Component);
	
	Region.propTypes = {
	  children: _react2.default.PropTypes.any
	};
	exports.default = Region;
	module.exports = exports['default'];

/***/ },

/***/ 50:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.raw = undefined;
	
	var _reactScopedStyle = __webpack_require__(41);
	
	var _Region = __webpack_require__(51);
	
	var _Region2 = _interopRequireDefault(_Region);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	console.log(_Region2.default);
	exports.raw = _Region2.default;
	exports.default = (0, _reactScopedStyle.createStyleSheet)(_Region2.default);

/***/ },

/***/ 51:
/***/ function(module, exports) {

	module.exports = ".container {\n  border-style: solid;\n  border-color: red;\n  margin: 10px;\n  padding:50px;\n  border-width: 10px;\n}\n"

/***/ },

/***/ 52:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.raw = undefined;
	
	var _reactScopedStyle = __webpack_require__(41);
	
	var _block = __webpack_require__(53);
	
	var _block2 = _interopRequireDefault(_block);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.raw = _block2.default;
	exports.default = (0, _reactScopedStyle.createStyleSheet)(_block2.default);

/***/ },

/***/ 53:
/***/ function(module, exports) {

	module.exports = "div > h2.block {\n  color: red;\n}\n"

/***/ },

/***/ 54:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactScopedStyle = __webpack_require__(41);
	
	var _reactScopedStyle2 = _interopRequireDefault(_reactScopedStyle);
	
	var _subRegionStyle = __webpack_require__(55);
	
	var _subRegionStyle2 = _interopRequireDefault(_subRegionStyle);
	
	var _blockStyle = __webpack_require__(52);
	
	var _blockStyle2 = _interopRequireDefault(_blockStyle);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }
	
	var SubRegion = function (_React$Component) {
	  _inherits(SubRegion, _React$Component);
	
	  function SubRegion() {
	    _classCallCheck(this, SubRegion);
	
	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }
	
	  SubRegion.prototype.render = function render() {
	    return _react2.default.createElement(
	      _reactScopedStyle2.default,
	      { style: [_blockStyle2.default, _subRegionStyle2.default] },
	      _react2.default.createElement(
	        'div',
	        { className: 'container' },
	        _react2.default.createElement(
	          'h2',
	          { className: 'block' },
	          'Sub Region css'
	        ),
	        _react2.default.createElement(
	          'p',
	          { className: 'block' },
	          _blockStyle.raw,
	          _subRegionStyle.raw
	        )
	      )
	    );
	  };
	
	  return SubRegion;
	}(_react2.default.Component);
	
	exports.default = SubRegion;
	module.exports = exports['default'];

/***/ },

/***/ 55:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.raw = undefined;
	
	var _reactScopedStyle = __webpack_require__(41);
	
	var _SubRegion = __webpack_require__(56);
	
	var _SubRegion2 = _interopRequireDefault(_SubRegion);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = (0, _reactScopedStyle.createStyleSheet)(_SubRegion2.default);
	exports.raw = _SubRegion2.default;

/***/ },

/***/ 56:
/***/ function(module, exports) {

	module.exports = ".container {\n  border: 1px solid green;\n  margin: 100px;\n}\n"

/***/ }

});
//# sourceMappingURL=app.js.map