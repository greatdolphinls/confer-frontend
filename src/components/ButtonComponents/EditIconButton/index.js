
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';

const styles = theme => {
  return {
    root: {
      color: theme.palette.buttonColor,
      width: 'fit-content'
    }
  };
};

const EditIconButton = ({ classes, ...props }) => {
  return (
    <IconButton
      className={classes.root}
      {...props}>
      <EditIcon />
    </IconButton>
  );
};

export default withStyles(styles, { withTheme: true })(EditIconButton);
