import React from 'react';
import ScopedStyle from 'react-scoped-style';
import subRegionStyle, { raw as subRegionStyleRaw } from './subRegionStyle';
import blockStyle, { raw as blockStyleRaw } from './blockStyle';

export default class SubRegion extends React.Component {
  render() {
    return (<ScopedStyle style={[blockStyle, subRegionStyle]}>
      <div className="container">
        <h2 className="block">Sub Region css</h2>
        <p className="block">
          {blockStyleRaw}
          {subRegionStyleRaw}
        </p>
      </div>
    </ScopedStyle>);
  }
}
