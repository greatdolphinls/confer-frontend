
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => {
  return {
    root: {
      color: theme.palette.buttonColor
    }
  };
};

const CloseIconButton = ({ classes, ...props }) => {
  return (
    <IconButton
      className={classes.root}
      {...props}>
      <CloseIcon />
    </IconButton>
  );
};

export default withStyles(styles, { withTheme: true })(CloseIconButton);
