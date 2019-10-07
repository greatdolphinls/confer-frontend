import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography, Paper } from '@material-ui/core';

import { CandidateInfo, ReferrerInfo } from '../../../../components';
import { CandidateSnapshot } from '../index';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      margin: `${theme.spacing(3.5)}px 0`,
      padding: theme.spacing(3.5),
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: theme.spacing(2),
      }
    },
    recommendContainer: {},
    infoContainer: {
      padding: `${theme.spacing(2)}px 0`,
    },
    recommendText: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      fontWeight: 'bold',
      fontSize: 20
    },
    recommendLine: {
      width: '30%',
      height: 2,
      backgroundColor: theme.palette.mainForeColor,
      [theme.breakpoints.down('xs')]: {
        width: '15%',
      }
    },
  };
};

const CandidateProfile = ({ classes, recommend }) => {

  return (
    <Paper className={classes.root}>
      <div className={classes.recommendContainer}>
        <CandidateInfo
          showLinkedIn
          classes={{ root: classes.infoContainer }}
          candidate={recommend.candidate} />
        <Typography className={classes.recommendText}>
          <span className={classes.recommendLine} />
          Recommended by
          <span className={classes.recommendLine} />
        </Typography>
        <ReferrerInfo
          showLinkedIn
          classes={{ root: classes.infoContainer }}
          recommend={recommend} />
      </div>
      <CandidateSnapshot recommend={recommend} />
    </Paper>
  );
};

CandidateProfile.propTypes = {
  classes: PropTypes.object.isRequired,
  recommend: PropTypes.object
};

CandidateProfile.defaultProps = {
  recommend: {
    expertiseArea: 'Sales',
    subExpertises: ['Account', 'Enterprise'],
    howYouKnow: 'Founder of GLG, worked with Jane for 2 years at Voray',
    whyGreat: 'Jane designed our MVP in two weeks and led a product team of 10 people to get it built in half the time I budgeted.',
    whichCapacity: 'Client',
    candidate: {
      firstName: 'Jane',
      lastName: 'Doe',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      location: 'New York City, NY',
      linkedInURL: 'https://www.linkedin.com/in/aniqrahman/',
      yearsOfExperience: 11,
      currentEmployment: {
        companyName: 'Airbnb',
        title: 'Senior Product Manager'
      },
      employmentHistories: [
        {
          companyName: 'Instinctiv (Acquired by SoundCloud)',
          title: 'CEO',
          startYear: '2010',
          startMonth: 'Feb',
          endYear: '2011',
          endMonth: 'Jul',
          currentlyWorks: false
        },
        {
          companyName: 'Moat (Acquired by Oracle)',
          title: 'President',
          startYear: '2011',
          startMonth: 'Oct',
          currentlyWorks: true
        }
      ],
      educationHistories: [
        {
          school: 'Cornell University',
          majorOrFocus: 'Engineering',
          degree: 'BA',
          graduatingYear: 2008
        }
      ],
    },
    referrer: {
      firstName: 'Alex',
      lastName: 'Krone',
      email: 'test@confer.com',
      avatar: 'https://images.unsplash.com/photo-1540176192406-747b9cb55194?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      location: 'New York',
      linkedInURL: 'https://www.linkedin.com/in/thepeterkuhn/',
      employmentHistories: [
        {
          companyName: 'Moat',
          title: 'Director of Sales',
          startYear: '2017',
          startMonth: 'Jan',
          endYear: '2017',
          endMonth: 'Dec',
          currentlyWorks: false
        },
        {
          companyName: 'Moat (acq. by Oracle)',
          title: 'Senior Director of Sales',
          startYear: '2017',
          startMonth: 'Dec',
          currentlyWorks: true,
        },
      ],
    }
  }
};

export default withStyles(styles)(CandidateProfile);