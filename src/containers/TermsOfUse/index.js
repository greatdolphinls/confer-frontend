import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { Typography } from '@material-ui/core';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      marginTop: theme.spacing(7),
      marginBottom: theme.spacing(8)
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: theme.spacing(5)
    }
  };
};

const TermsOfUse = ({ classes }) => {
  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        Merit Terms of Service
      </Typography>
    </main>
  );
};

TermsOfUse.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TermsOfUse);
