
import React from 'react';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      fontWeight: 'bold',
      border: `1px solid ${theme.palette.mainForeColor}`,
      color: theme.palette.mainForeColor,
      '&:hover': {
        borderColor: theme.palette.buttonColor,
        backgroundColor: theme.palette.buttonColor,
        color: theme.palette.whiteColor
      }
    },
    disabled: {
      backgroundColor: theme.palette.darkGreyButtonColor
    }
  };
};

const OutlineButton = ({ classes, children, disabled = false, ...props }) => {
  return (
    <Button
      disabled={disabled}
      className={classNames(classes.root, { [classes.disabled]: disabled })}
      {...props}>
      {children}
    </Button>
  );
};

export default withStyles(styles, { withTheme: true })(OutlineButton);
