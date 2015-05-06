var React = require('react');

function flatten(element, ret) {
  if (React.isValidElement(element)) {
    ret = ret || [];
    ret.push(element);
    React.Children.forEach(element.props.children, function (c) {
      flatten(c, ret);
    });
  }
  return ret;
}

module.exports = flatten;
