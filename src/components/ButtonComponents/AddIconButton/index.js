
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/AddCircle';

const styles = theme => {
  return {
    root: {
      color: theme.palette.buttonColor,
      width: 'fit-content'
    }
  };
};

const AddIconButton = ({ classes, ...props }) => {
  return (
    <IconButton
      className={classes.root}
      {...props}>
      <AddIcon />
    </IconButton>
  );
};

export default withStyles(styles, { withTheme: true })(AddIconButton);
