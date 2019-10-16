
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      borderRadius: 0,
      color: theme.palette.mainBackColor,
      backgroundColor: theme.palette.buttonColor,
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.24), 0px 0px 2px rgba(0, 0, 0, 0.12)',
      '&:hover': {
        backgroundColor: theme.palette.buttonHoverColor,
      }
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
      className={classNames(classes.root, { [classes.disabled]: disabled })}
      {...props}>
      {children}
    </Button>
  );
};

export default withStyles(styles, { withTheme: true })(PrimaryButton);
