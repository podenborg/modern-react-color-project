import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { arrayMove } from 'react-sortable-hoc';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import DraggableColorList from './DraggableColorList';

import PaletteFormNav from './PaletteFormNav';

// import material ui styled components
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Button from '@material-ui/core/Button';

const drawerWidth = 400;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    height: 'calc(100vh - 64px)',
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
});

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
  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
      this.state.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    ));
    ValidatorForm.addValidationRule('isColorUnique', (value) => (
      this.state.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
    ));
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
  handleSubmit = (newPaletteName) => {
    let newName = newPaletteName;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, '-'),
      colors: this.state.colors
    };
    this.props.savePalette(newPalette);
    this.props.history.push('/');
  }
  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  }
  addNewColor = () => {
    const newColor = { color: this.state.currentColor, name: this.state.newColorName };
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
    const { classes, theme, maxColors, palettes } = this.props;
    const { open, colors, currentColor } = this.state;
    const paletteIsFull = colors.length >= maxColors;

    return (
      <div className={classes.root}>
        <PaletteFormNav 
          open={open} 
          classes={classes} 
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
          <Typography variant='h4'>Design Your Palette</Typography>
          <div>
            <Button 
              variant='contained' 
              color='secondary' 
              onClick={this.clearColors}
            >
              Clear Palette
            </Button>
            <Button 
              variant='contained' 
              color='primary'
              disabled={paletteIsFull}
              onClick={this.addRandomColor}
            >
              Random Color
            </Button>
          </div>
          <ChromePicker 
            color={currentColor} 
            onChangeComplete={this.updateCurrentColor} 
          />
          <ValidatorForm onSubmit={this.addNewColor} ref='form'>
            <TextValidator
              name='newColorName' 
              value={this.state.newColorName} 
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={['This field is required', 'Color name must be unique', 'Color already used!']} 
            />
            <Button 
              variant='contained'
              type='submit' 
              color='primary'
              disabled={paletteIsFull} 
              style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
            >
              {paletteIsFull ? 'Palette Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
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
