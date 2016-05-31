import React from 'react';
import Region from './Region';
import SubRegion from './SubRegion';

export class App extends React.Component {
  render() {
    return (<div className="container">
      <Region>
        <SubRegion/>
      </Region>
    </div>);
  }
}

module.exports = App;
