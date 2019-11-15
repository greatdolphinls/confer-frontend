import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      marginTop: theme.spacing(2)
    },
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      textTransform: 'uppercase',
      marginBottom: theme.spacing(0.5),
    }
  };
};

const InfoContainer = ({ classes, title, children }) => {

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {title}
      </Typography>
      {children}
    </div>
  );
};

export default withStyles(styles)(InfoContainer);