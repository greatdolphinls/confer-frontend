
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      background: theme.palette.subBackColor1,
      boxShadow: '0px 8px 12px rgba(0, 0, 0, 0.3)',
      borderRadius: 2,
      padding: theme.spacing(2.5)
    }
  };
};

const BoxLayout = ({ classes, children }) => {

  return (
    <Paper className={classes.root}>
      {children}
    </Paper>
  );
};

BoxLayout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(BoxLayout);
