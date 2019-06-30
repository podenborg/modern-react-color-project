import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import ColorBox from './ColorBox';
import PaletteFooter from './PaletteFooter';

class SingleColorPalette extends Component {
  constructor(props) {
    super(props);
    this._shades = this.gatherShades(this.props.palette, this.props.colorId);
    this.state = { format: 'hex' };
    this.changeFormat = this.changeFormat.bind(this);
  }
  changeFormat(val) {
    this.setState({ format: val });
  }
  gatherShades(palette, colorToFilterBy) {
    let shades = [];
    let allColors = palette.colors;
    for (let key in allColors) {
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFilterBy)
      )
    }
    return shades.slice(1);
  }
  render() {
    const { format } = this.state;
    const { paletteName, emoji, id } = this.props.palette;

    const colorBoxes = this._shades.map(color => (
      <ColorBox key={color.name} name={color.name} background={color[format]} showingFullPalette={false} />
    ));

    return (
      <div className='SingleColorPalette Palette'>
        <Navbar 
          showingAllColors={false}
          handleChange={this.changeFormat}
        />
        <div className='Palette-colors'>
          {colorBoxes}
          <div className='go-back ColorBox'>
            <Link to={`/palette/${id}`} className='back-button'>
              GO BACK
            </Link>
          </div>
        </div>
        <PaletteFooter paletteName={paletteName} emoji={emoji} />
      </div>
    )
  }
}

export default SingleColorPalette;
