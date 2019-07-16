import React, { Component } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { Picker } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class PaletteMetaForm extends Component {
  state = {
    open: true,
    stage: 'form',
    newPaletteName: ''
  }

  componentDidMount() {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => (
      this.props.palettes.every(
        ({ paletteName }) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    ));
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  showEmojiPicker = () => {
    this.setState({ stage: 'emoji' });
  }
  savePalette = (emoji) => {
    const newPalette = { paletteName: this.state.newPaletteName, emoji: emoji.native };
    this.props.handleSubmit(newPalette);
  }

  render() {
    const { hideForm } = this.props;
    const { stage } = this.state;

    return (
      <>
        <Dialog open={stage === 'emoji'}>
          <DialogTitle id='emoji-dialog-title'>Choose an Emoji for this Palette</DialogTitle>
          <Picker title='Pick an Emoji' onSelect={this.savePalette} />
        </Dialog>
        <Dialog
          open={stage === 'form'}
          onClose={hideForm}
          arai-labelledby='form-dialog-title'
        >
          <DialogTitle id='form-dialog-title'>Choose a Palette Name</DialogTitle>
          <ValidatorForm onSubmit={this.showEmojiPicker}>
            <DialogContent>
              <DialogContentText>
                Please enter a name for your new palette. Make sure
                the name is unique.
              </DialogContentText>

              <TextValidator
                fullWidth
                margin='normal' 
                label='Palette Name'
                name='newPaletteName' 
                value={this.state.newPaletteName} 
                onChange={this.handleChange}
                validators={['required', 'isPaletteNameUnique']}
                errorMessages={['Enter Palette Name', 'Name already used']} 
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={hideForm} color='primary'>
                Cancel
              </Button>
              <Button type='submit' variant='contained' color='primary'>
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </>
    )
  }
}

export default PaletteMetaForm;
