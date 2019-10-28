import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(1.5)
    },
    description: {},
    footer: {
      fontSize: 12,
      opacity: 0.6,
      fontWeight: 500
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