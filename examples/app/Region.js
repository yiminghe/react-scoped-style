import React from 'react';
import ScopedStyle from 'react-scoped-style';
import regionStyle, { raw as regionStyleRaw } from './regionStyle';
import blockStyle, { raw as blockStyleRaw } from './blockStyle';

export default class Region extends React.Component {
  static propTypes = {
    children: React.PropTypes.any,
  };

  render() {
    return (<ScopedStyle style={[blockStyle, regionStyle]}>
      <div className="container">
        <h2 className="block">css:</h2>
        <p className="block">
          {blockStyleRaw}
          {regionStyleRaw}
        </p>
        {this.props.children}
      </div>
    </ScopedStyle>);
  }
}
