import React from 'react';
import transform from './transform';
import cssParse from '../vendor/css-parse';

export default class ScopedStyle extends React.Component {
  render() {
    const props = this.props;
    let style = props.style;
    if (typeof style === 'string') {
      style = cssParse(style);
    }
    const child = React.Children.only(props.children);
    if (style) {
      return transform(child, style);
    }
    return child;
  }
}

ScopedStyle.defaultProps = {
  scoped: true,
};
ScopedStyle.__ScopedStyle__ = 1;
