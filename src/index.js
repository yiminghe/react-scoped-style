'use strict';

var ScopedStyle = require('./ScopedStyle');
ScopedStyle.transformElement = require('./transform');
ScopedStyle.createStyleSheet = require('../vendor/css-parse');
module.exports = ScopedStyle;
