import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { RecommendInfo, BoxLayout } from '../../../../components';
import CandidateAvatar from '../../../../assets/img/users/jan_doe.jpg'
import ReferrerAvatar from '../../../../assets/img/users/mark_geoson.jpg'

const styles = theme => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding: `${theme.spacing(6)}px 0`,
      [theme.breakpoints.down('sm')]: {
        display: 'none'
      }
    },
    title: {
      position: 'inherit',
      fontSize: 10,
      marginBottom: theme.spacing(1)
    },
    box: {
      position: 'inherit',
      left: 90,
      width: 550
    }
  };
};

const RecommendsContent = ({ classes, recommend }) => {

  return (
    <main className={classes.root}>
      <Typography className={classes.title}>
        A sneak peak
      </Typography>
      <BoxLayout classes={{ root: classes.box }}>
        <RecommendInfo recommend={recommend} />
      </BoxLayout>
    </main>
  );
};

RecommendsContent.propTypes = {
  classes: PropTypes.object.isRequired,
  recommends: PropTypes.array
};

RecommendsContent.defaultProps = {
  recommend: {
    expertiseArea: 'Product management',
    subExpertises: ['consumer'],
    howYouKnow: 'Worked with Jane for 2 years at Voray',
    whyGreat: 'Jane designed our MVP in two weeks and led a product team of 10 people to get it built in half the time I budgeted.',
    candidate: {
      firstName: 'Jane',
      lastName: 'Doe',
      avatar: CandidateAvatar,
      location: 'Greater New York City Area',
      linkedInURL: 'https://www.linkedin.com/in/elizabethdelliott/',
      yearsOfExperience: 11,
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
      firstName: 'Mark',
      lastName: 'Gerson',
      avatar: ReferrerAvatar,
      linkedInURL: 'https://www.linkedin.com/in/elizabethdelliott/',
      shortDescription: 'Founder of GLG'
    }
  }
};

export default withStyles(styles)(RecommendsContent);