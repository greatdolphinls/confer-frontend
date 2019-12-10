import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

const styles = theme => {
  return {
    root: {
      marginTop: theme.spacing(1)
    },
    title: {
      fontSize: 12,
      fontWeight: 'bold',
      textTransform: 'uppercase'
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