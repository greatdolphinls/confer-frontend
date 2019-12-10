
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => {
  return {
    root: {
      color: theme.palette.buttonColor,
      padding: theme.spacing(0.5),
      width: 'fit-content',
      '& svg': {
        width: 20,
        height: 20
      }
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
