import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';

// Project GitHub repo
// https://github.com/Colt/react-colors/tree/master

function App() {
  return (
    <div className="App">
      <Palette {...seedColors[4]}/>
    </div>
  );
}

export default App;
