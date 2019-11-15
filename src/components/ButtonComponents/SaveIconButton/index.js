
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';

const styles = theme => {
  return {
    root: {
      color: theme.palette.buttonColor,
      width: 'fit-content'
    }
  };
};

const SaveIconButton = ({ classes, ...props }) => {
  return (
    <IconButton
      className={classes.root}
      {...props}>
      <SaveIcon />
    </IconButton>
  );
};

export default withStyles(styles, { withTheme: true })(SaveIconButton);