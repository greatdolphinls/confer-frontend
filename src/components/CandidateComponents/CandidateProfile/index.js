import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Paper } from '@material-ui/core';

import { RecommendInfo, CandidateSnapshot } from '../..';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      margin: `${theme.spacing(2.5)}px 0`,
      padding: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: theme.spacing(2),
      }
    }
  };
};

const CandidateProfile = ({ classes, recommend }) => {

  return (
    <Paper className={classes.root}>
      <RecommendInfo recommend={recommend} />
      <CandidateSnapshot recommend={recommend} />
    </Paper>
  );
};

CandidateProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  recommend: PropTypes.object
};

export default withStyles(styles)(CandidateProfile);