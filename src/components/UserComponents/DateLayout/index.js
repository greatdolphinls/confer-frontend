
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {},
    container: {
      width: 'fit-content',
      marginRight: theme.spacing(4)
    }
  };
};

const DateLayout = ({ classes, label, children }) => {
  return (
    <div className={classes.root}>
      <Typography>
        {`${label}:`}
      </Typography>
      <div className={classes.container}>
        {children}
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(DateLayout);
