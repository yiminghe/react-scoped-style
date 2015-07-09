var React = require('react');
var ScopedStyle = require('react-scoped-style');
var regionStyle = require('./regionStyle');
var blockStyle = require('./blockStyle');

class Region extends React.Component {
  render() {
    return <ScopedStyle style={[blockStyle, regionStyle]}>
      <div className="container">
        <h2 className="block">css:</h2>
        <p className="block">
        {blockStyle.raw}
        {regionStyle.raw}
        </p>
      {this.props.children}
      </div>
    </ScopedStyle>;
  }
}

module.exports = Region;
