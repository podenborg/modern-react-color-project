import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Palette from './Palette';
import seedColors from './seedColors';
import PaletteList from './PaletteList';
import NewPaletteForm from './NewPaletteForm';
import { generatePalette } from './colorHelpers';
import SingleColorPalette from './SingleColorPalette';

// Project GitHub repo
// https://github.com/Colt/react-colors/tree/master

class App extends Component {
  findPalette(id) {
    return seedColors.find(function(palette) {
      return palette.id === id;
    })
  }
  render() {
    return (
      <Switch>
        <Route exact path='/palette/new' render={() => <NewPaletteForm />} />
        <Route 
          exact 
          path='/' 
          render={(routeProps) => <PaletteList palettes={seedColors} {...routeProps} />} 
        />
        <Route 
          exact 
          path='/palette/:id' 
          render={(routeProps) => 
            <Palette 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.id)
            )}/>
        }/>
        <Route 
          exact 
          path='/palette/:paletteId/:colorId'
          render={(routeProps) => 
            <SingleColorPalette
              colorId={routeProps.match.params.colorId} 
              palette={generatePalette(
                this.findPalette(routeProps.match.params.paletteId)
              )} 
            />
          } 
        />
      </Switch>
      // <div className="App">
      //   <Palette palette={generatePalette(seedColors[4])} />
      // </div>
    );
  }
}

export default App;
