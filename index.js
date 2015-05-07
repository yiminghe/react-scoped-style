var ScopedStyle = require('./lib/ScopedStyle');
ScopedStyle.transformElement = require('./lib/transform');
ScopedStyle.parseStyle = ScopedStyle.parseCss = require('./vendor/css-parse');
module.exports = ScopedStyle;
