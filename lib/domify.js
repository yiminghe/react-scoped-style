// make element has dom node interface
var React = require('react');

function domify(element, start) {
  /*jshint camelcase: false */
  start = start || [1];
  if (React.isValidElement(element)) {
    var order = start[0];
    start[0] += 1;
    var children = element.props.children;
    var lastChild;
    var newChildren = [];
    React.Children.forEach(children, function (c) {
      if (React.isValidElement(c)) {
        c = React.cloneElement(c, {
          __reactScopedCss__parentNode: element
        });
        c.props.__reactScopedCss__previousSilbling = lastChild;
        if (lastChild) {
          lastChild.props.__reactScopedCss__nextSilbling = c;
        }
        newChildren.push(domify(c, start));
        lastChild = c;
      } else {
        newChildren.push(c);
      }
    });

    return React.cloneElement(element, {
      style: element.props.style || {},
      __reactScopedCss__mountOrder: order
    }, ...newChildren);
  }
  return element;
}

module.exports = domify;
