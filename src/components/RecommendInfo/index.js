import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { CandidateInfo, ReferrerInfo } from '../index';

const styles = theme => {
  return {
    root: {
      width: '100%'
    },
    infoContainer: {
      padding: `${theme.spacing(1)}px 0`,
    },
    recommendText: {
      display: 'flex',
      alignItems: 'center',
      textAlign: 'center',
      justifyContent: 'space-between',
      width: '100%',
      fontWeight: 'bold',
      fontSize: 20
    },
    recommendLine: {
      width: '30%',
      height: 1,
      backgroundColor: theme.palette.mainForeColor,
      [theme.breakpoints.down('xs')]: {
        width: '15%',
      }
    },
  };
};

const RecommendInfo = ({ classes, recommend }) => {

  return (
    <div className={classes.root}>
      <CandidateInfo
        classes={{ root: classes.infoContainer }}
        recommend={recommend}
      />
      <Typography className={classes.recommendText}>
        <span className={classes.recommendLine} />
        Recommended by
        <span className={classes.recommendLine} />
      </Typography>
      <ReferrerInfo
        classes={{ root: classes.infoContainer }}
        recommend={recommend}
      />
    </div>
  );
};

RecommendInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  recommend: PropTypes.object
};

export default withStyles(styles)(RecommendInfo);