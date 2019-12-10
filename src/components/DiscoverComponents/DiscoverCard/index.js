import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';

import { CandidateProfile, CandidateRecommend } from '../..';

const styles = theme => {
  return {
    root: {
      maxWidth: 760,
      width: '100%'
    }
  };
};

const DiscoverCard = ({ classes, recommend }) => {
  return (
    <main className={classes.root}>
      <CandidateProfile
        recommend={recommend} />
      <CandidateRecommend
        recommend={recommend} />
    </main>
  );
};

DiscoverCard.propTypes = {
  classes: PropTypes.object.isRequired,
  recommend: PropTypes.object
};

export default withStyles(styles)(DiscoverCard);