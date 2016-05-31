// make element has dom node interface
import React from 'react';

export default function domify(element, start) {
  start = start || [1];
  if (React.isValidElement(element)) {
    const order = start[0];
    start[0] += 1;
    const children = element.props.children;
    let lastChild;
    const newChildren = [];
    React.Children.forEach(children, (c) => {
      if (React.isValidElement(c)) {
        c = React.cloneElement(c, {
          __reactScopedCss__anchor: {
            __reactScopedCss__parentNode: element,
            __reactScopedCss__previousSilbling: lastChild,
          },
        });
        if (lastChild) {
          lastChild.props.__reactScopedCss__anchor.__reactScopedCss__nextSilbling = c;
        }
        newChildren.push(domify(c, start));
        lastChild = c;
      } else {
        newChildren.push(c);
      }
    });

    return React.cloneElement(element, {
      style: element.props.style || {},
      __reactScopedCss__mountOrder: order,
    }, ...newChildren);
  }
  return element;
}
