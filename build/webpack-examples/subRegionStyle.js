var ScopedStyle = require('react-scoped-style');
var css = require('raw!./SubRegion.css');
module.exports = ScopedStyle.createStyleSheet(css);
module.exports.raw = css;
