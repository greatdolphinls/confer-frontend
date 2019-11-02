
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import { CandidatePhoto, RecommendCard } from '../../../../../components';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      backgroundColor: theme.palette.mainBackColor,
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    candidatePhoto: {
      width: 230,
      height: 230,
      minWidth: 230
    }
  };
};

const ProductSnapshot = ({ classes, recommend }) => {
  const { candidate } = recommend;

  return (
    <Paper className={classes.root}>
      <CandidatePhoto
        isSmall={true}
        candidate={candidate}
        classes={{ root: classes.candidatePhoto }} />
      <RecommendCard
        isSmall={true}
        recommend={recommend} />

    </Paper>
  );
};

ProductSnapshot.propTypes = {
  classes: PropTypes.object.isRequired
};

ProductSnapshot.defaultProps = {
  recommend: {
    whichCapacity: 'Direct Report',
    howYouKnow: 'Worked with Adara @Apple for two years',
    whyGreat: `“Adara designed our MVP in two weeks and led a 
    product team of 10 people to get it built in half the time 
    I budgeted.”`,
    candidate: {
      firstName: 'Adara',
      lastName: 'Omari',
      avatar: 'https://images.unsplash.com/photo-1571914000632-e8df0117f2a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      linkedInURL: 'https://www.linkedin.com/in/elizabethdelliott/',
      employmentHistories: [
        {
          companyName: 'Airbnb',
          title: 'Senior Product Manager',
          startYear: '2017',
          startMonth: 'Dec',
          currentlyWorks: true
        }
      ]
    },
    referrer: {
      firstName: 'Diego',
      lastName: 'Lazarez',
      avatar: 'https://images.unsplash.com/photo-1571914000632-e8df0117f2a8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      linkedInURL: 'https://www.linkedin.com/in/elizabethdelliott/',
      employmentHistories: [
        {
          companyName: 'Palantir',
          title: 'Chief tech officer',
          startYear: '2017',
          startMonth: 'Dec',
          currentlyWorks: true
        }
      ]
    }
  }
};

export default withStyles(styles, { withTheme: true })(ProductSnapshot);
