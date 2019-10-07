import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center'
    },
    paper: {
      width: 540,
      height: '100%',
      marginTop: 203,
      padding: `${theme.spacing(5)}px ${theme.spacing(4)}px`,
      [theme.breakpoints.down('sm')]: {
        width: `100%`
      }
    }
  };
};

const ForgotPasswordLayout = ({ classes, children }) => {
  return (
    <main className={classes.root}>
      <Paper className={classes.paper}>
        {children}
      </Paper >
    </main>
  );
};

export default withStyles(styles, { withTheme: true })(ForgotPasswordLayout);
