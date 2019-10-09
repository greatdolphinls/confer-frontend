import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Paper } from '@material-ui/core';

import { PrimaryButton } from '../../../../components';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      margin: `${theme.spacing(3.5)}px 0`,
      padding: theme.spacing(25),
      backgroundColor: theme.palette.borderColor,
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        padding: theme.spacing(2)
      }
    },
    description: {
      width: 246,
      textAlign: 'center',
      marginBottom: theme.spacing(3)
    },
    button: {
      width: 176
    }
  };
};

const ExceptProfile = ({ classes, onInit }) => {

  return (
    <Paper className={classes.root}>
      <Typography className={classes.description}>
        You’v e seen all of the relevant candidates.
        Select “start over” to review them again or
        enter a new search above.
      </Typography>
      <PrimaryButton
        classes={{ root: classes.button }}
        onClick={onInit}>
        Start over
      </PrimaryButton>
    </Paper>
  );
};

ExceptProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  onInit: PropTypes.func
};

ExceptProfile.defaultProps = {
};

export default withStyles(styles)(ExceptProfile);