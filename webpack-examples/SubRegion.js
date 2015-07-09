var React = require('react');
var ScopedStyle = require('react-scoped-style');
var subRegionStyle = require('./subRegionStyle');
var blockStyle = require('./blockStyle');

class SubRegion extends React.Component {
  render() {
    return <ScopedStyle style={[blockStyle, subRegionStyle]}>
      <div className="container">
        <h2 className="block">Sub Region css</h2>
        <p className="block">
        {blockStyle.raw}
        {subRegionStyle.raw}
        </p>
      </div>
    </ScopedStyle>;
  }
}

module.exports = SubRegion;
