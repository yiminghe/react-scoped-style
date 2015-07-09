'use strict';

var React = require('react');

function flatten(element, ret) {
  if (React.isValidElement(element)) {
    if (element.type.__ScopedStyle__ && element.props.scoped) {
      return ret;
    }
    ret = ret || [];
    ret.push(element);
    React.Children.forEach(element.props.children, (c) => {
      flatten(c, ret);
    });
  }
  return ret;
}

module.exports = flatten;
