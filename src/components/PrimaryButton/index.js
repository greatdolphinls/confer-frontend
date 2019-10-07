
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      color: theme.palette.mainBackColor,
      backgroundColor: theme.palette.buttonColor,
    }
  };
};

const PrimaryButton = ({ classes, children, ...props }) => {
  return (
    <Button
      className={classes.root}
      {...props}>
      {children}
    </Button>
  );
};

export default withStyles(styles, { withTheme: true })(PrimaryButton);
