import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import styles from './styles/PaletteFormNavStyles';
import PaletteMetaForm from './PaletteMetaForm';

// import material ui styled components
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';

class PaletteFormNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPaletteName: '',
      formShowing: false
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  showForm = () => {
    this.setState({ formShowing: true });
  }
  hideForm = () => {
    this.setState({ formShowing: false });
  }

  render() {
    const { open, classes, palettes, handleSubmit, handleDrawerOpen  } = this.props;
    
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position='fixed'
          color='default'
          className={classNames(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar disableGutters={!open}>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={handleDrawerOpen}
              className={classNames(classes.menuButton, open && classes.hide)}
            >
              <AddToPhotosIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              Create a Palette
            </Typography>
          </Toolbar>
          <div className={classes.navBtns}>
            <Link to='/'>
              <Button variant='contained' color='secondary' className={classes.button}>Go Back</Button>
            </Link>
            <Button
              className={classes.button}
              variant='contained'
              color='primary'
              onClick={this.showForm}
            >
              Save
            </Button>
          </div>
        </AppBar>
        {this.state.formShowing && 
        <PaletteMetaForm 
          hideForm={this.hideForm}
          palettes={palettes} 
          handleSubmit={handleSubmit}
        />}
      </div>
    )
  }
}

export default withStyles(styles, { withTheme: true })(PaletteFormNav);
