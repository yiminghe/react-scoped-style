var ScopedStyle = require('./lib/ScopedStyle');
ScopedStyle.transformElement = require('./lib/transform');
ScopedStyle.createStyleSheet = require('./vendor/css-parse');
module.exports = ScopedStyle;
