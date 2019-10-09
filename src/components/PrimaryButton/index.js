
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      color: theme.palette.mainBackColor,
      backgroundColor: theme.palette.buttonColor,
    },
    disabled: {
      backgroundColor: theme.palette.subButtonColor1
    }
  };
};

const PrimaryButton = ({ classes, children, disabled = false, ...props }) => {
  return (
    <Button
      disabled={disabled}
      className={classNames(classes.root, {[classes.disabled]: disabled})}
      {...props}>
      {children}
    </Button>
  );
};

export default withStyles(styles, { withTheme: true })(PrimaryButton);
