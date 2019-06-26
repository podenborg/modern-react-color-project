import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import { generatePalette } from './colorHelpers';

// Project GitHub repo
// https://github.com/Colt/react-colors/tree/master

class App extends Component {
  render() {
    return (
      <div className="App">
        <Palette palette={generatePalette(seedColors[4])} />
      </div>
    );
  }
}

export default App;
