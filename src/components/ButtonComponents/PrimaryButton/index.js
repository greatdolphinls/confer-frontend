
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      fontWeight: 'bold',
      borderRadius: 0,
      borderBottom: `2px solid ${theme.palette.buttonColor}`,
      padding: `${theme.spacing(0.5)}px ${theme.spacing(0.5)}px 0`,
      color: theme.palette.mainForeColor,
      '&:hover': {
        backgroundColor: theme.palette.buttonColor,
        color: theme.palette.whiteColor
      }
    },
    disabled: {
      backgroundColor: theme.palette.darkGreyButtonColor
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
