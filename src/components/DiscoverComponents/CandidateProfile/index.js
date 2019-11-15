import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { CandidatePhoto, RecommendCard } from '../..';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      paddingTop: theme.spacing(3),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        paddingTop: theme.spacing(2),
      }
    },
    recommendCard: {
      padding: `0 ${theme.spacing(3)}px`,
      [theme.breakpoints.down('sm')]: {
        padding: 0
      }
    }
  };
};

const CandidateProfile = ({ classes, recommend }) => {
  const { candidate } = recommend;

  return (
    <main className={classes.root}>
      <CandidatePhoto
        candidate={candidate} />
      <RecommendCard
        recommend={recommend}
        classes={{ root: classes.recommendCard }} />
    </main>
  );
};

CandidateProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  recommend: PropTypes.object
};

export default withStyles(styles)(CandidateProfile);