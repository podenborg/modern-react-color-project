import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { arrayMove } from 'react-sortable-hoc';
import DraggableColorList from './DraggableColorList';

import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import styles from './styles/NewPaletteFormStyles';

// import material ui styled components
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  };
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      newColorName: '',
      currentColor: 'teal',
      colors: this.props.palettes[0].colors,
    };
  }
  handleDrawerOpen = () => {
    this.setState({ open: true });
  }
  handleDrawerClose = () => {
    this.setState({ open: false });
  }
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit = (newPalette) => {
    newPalette.id = newPalette.paletteName.toLowerCase().replace(/ /g, '-');
    newPalette.colors = this.state.colors;
    
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }
  addNewColor = (newColor) => {
    this.setState({ colors: [ ...this.state.colors, newColor ] })
  }
  removeColor = (colorName) => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    });
  }
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(({ colors }) => ({
      colors: arrayMove(colors, oldIndex, newIndex),
    }));
  }
  clearColors = () => {
    this.setState({ colors: [] });
  }
  addRandomColor = () => {
    const allColors = this.props.palettes.map(p => p.colors).flat();
    const rand = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[rand];
    this.setState({ colors: [...this.state.colors, randomColor]})
  }
  render() {
    const { classes, maxColors, palettes } = this.props;
    const { open, colors } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav 
          open={open} 
          palettes={palettes} 
          handleSubmit={this.handleSubmit} 
          handleDrawerOpen={this.handleDrawerOpen} 
        />
        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.container}>
            <Typography variant='h4' gutterBottom>
              Design Your Palette
            </Typography>
            <div className={classes.buttons}>
              <Button 
                variant='contained' 
                color='secondary'
                className={classes.button} 
                onClick={this.clearColors}
              >
                Clear Palette
              </Button>
              <Button 
                variant='contained' 
                color='primary'
                className={classes.button}
                disabled={paletteIsFull}
                onClick={this.addRandomColor}
              >
                Random Color
              </Button>
            </div>
            <ColorPickerForm
              colors={colors} 
              paletteIsFull={paletteIsFull}
              addNewColor={this.addNewColor} 
            />
          </div>
        </Drawer>
        <main className={classNames(classes.content, {
          [classes.contentShift]: open
        })}>
          <div className={classes.drawerHeader} />
          <DraggableColorList 
            colors={colors} 
            removeColor={this.removeColor}
            axis='xy'
            onSortEnd={this.onSortEnd} 
          />
        </main>
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(NewPaletteForm);
