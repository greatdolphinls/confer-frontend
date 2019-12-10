
import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import Icon from '@material-ui/icons/NoSimOutlined';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      margin: '100px auto'
    },
    icon: {
      fontSize: 90,
      color: theme.palette.buttonColor,
      alignSelf: 'center'
    },
    label: {
      alignSelf: 'center',
      color: theme.palette.buttonColor,
      margin: theme.spacing(2)
    }
  };
};

const NotFound = ({ classes, label }) => {
  return (
    <div className={classes.root}>
      <Icon className={classes.icon} />
      <Typography className={classes.label}>
        {label}
      </Typography>
    </div >
  );
};

NotFound.defaultProps = {
  label: 'Not Found'
};

export default withStyles(styles, { withTheme: true })(NotFound);
