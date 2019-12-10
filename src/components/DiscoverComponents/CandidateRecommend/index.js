import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { CandidateSnapshot, RecommendInfo } from '../..';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column'
      }
    },
    recommendCard: {
      marginLeft: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        padding: 0,
        marginLeft: 0
      }
    }
  };
};

const CandidateRecommend = ({ classes, recommend }) => {
  return (
    <main className={classes.root}>
      <CandidateSnapshot
        candidate={recommend.candidate} />
      <RecommendInfo
        recommend={recommend}
        classes={{ root: classes.recommendCard }} />
    </main>
  );
};

CandidateRecommend.propTypes = {
  classes: PropTypes.object.isRequired,
  recommend: PropTypes.object
};

export default withStyles(styles)(CandidateRecommend);