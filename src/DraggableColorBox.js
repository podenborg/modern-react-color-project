import React from 'react';
import { withStyles } from '@material-ui/styles';
import { SortableElement } from 'react-sortable-hoc';

import styles from './styles/DraggableColorBoxStyles';
import DeleteIcon from '@material-ui/icons/Delete';

const DraggableColorBox = SortableElement((props) => {
  const { color, name, classes, handleClick } = props;
  return (
    <div className={classes.root} style={{ backgroundColor: color}}>
      <div className={classes.boxContent}>
        <span>{name}</span>
        <span>
          <DeleteIcon 
            className={classes.deleteIcon} 
            onClick={handleClick} 
          />
        </span>
      </div>
    </div>
  )
})

export default withStyles(styles)(DraggableColorBox);
