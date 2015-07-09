var React = require('react');
var ScopedStyle = require('react-scoped-style');
var Region = require('./Region');
var SubRegion = require('./SubRegion');

class App extends React.Component {
  render() {
    return <div className="container">

      <Region>
        <SubRegion/>
      </Region>
    </div>;
  }
}

module.exports = App;
