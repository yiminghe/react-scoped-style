var React = require('react');
var transform = require('./transform');
var cssParse = require('../vendor/css-parse');

class ScopedStyle extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    var props = this.props;
    var style = this.props.style;
    if (typeof style === 'string') {
      style = cssParse(style);
    }
    var child = React.Children.only(props.children);
    if (style) {
      return transform(child, style);
    } else {
      return child;
    }
  }
}

ScopedStyle.defaultProps = {
  scoped: true
};

ScopedStyle.__ScopedStyle__ = 1;

module.exports = ScopedStyle;
