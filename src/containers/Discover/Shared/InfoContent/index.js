import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(1)
    },
    description: {
      fontSize: 20,
      fontWeight: 500,
      marginBottom: theme.spacing(0.5)
    },
    footer: {
      opacity: 0.6
    }
  };
};

const InfoContent = ({ classes, footer, children }) => {

  return (
    <div className={classes.root}>
      <Typography className={classes.description}>
        {children}
      </Typography>
      {!!footer &&
        <Typography className={classes.footer}>
          {footer || ''}
        </Typography>
      }
    </div>
  );
};

export default withStyles(styles)(InfoContent);