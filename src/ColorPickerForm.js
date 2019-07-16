import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

// import material ui styled components
import Button from '@material-ui/core/Button';
import styles from './styles/ColorPickerFormStyles';

class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: 'teal',
      newColorName: '',
    };
  }
  componentDidMount() {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => (
      this.props.colors.every(
        ({ name }) => name.toLowerCase() !== value.toLowerCase()
      )
    ));
    ValidatorForm.addValidationRule('isColorUnique', (value) => (
      this.props.colors.every(
        ({ color }) => color !== this.state.currentColor
      )
    ));
  }
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleSubmit = () => {
    const newColor = { 
      color: this.state.currentColor, 
      name: this.state.newColorName 
    };
    this.props.addNewColor(newColor);
    this.setState({ newColorName: '' });
  }
  updateCurrentColor = (newColor) => {
    this.setState({ currentColor: newColor.hex });
  }
  render() {
    const { paletteIsFull, classes } = this.props;
    const { currentColor, newColorName } = this.state;
    return (
      <div>
        <ChromePicker 
            color={currentColor}
            className={classes.picker} 
            onChangeComplete={this.updateCurrentColor} 
          />
          <ValidatorForm onSubmit={this.handleSubmit} ref='form'>
            <TextValidator
              name='newColorName'
              className={classes.colorNameInput}
              margin='normal'
              variant='filled'
              placeholder='Color name' 
              value={newColorName} 
              onChange={this.handleChange}
              validators={['required', 'isColorNameUnique', 'isColorUnique']}
              errorMessages={['This field is required', 'Color name must be unique', 'Color already used!']} 
            />
            <Button 
              variant='contained'
              type='submit' 
              color='primary'
              className={classes.addColor}
              disabled={paletteIsFull} 
              style={{ backgroundColor: paletteIsFull ? 'grey' : currentColor }}
            >
              {paletteIsFull ? 'Palette Full' : 'Add Color'}
            </Button>
          </ValidatorForm>
      </div>
    )
  }
}

export default withStyles(styles)(ColorPickerForm);
