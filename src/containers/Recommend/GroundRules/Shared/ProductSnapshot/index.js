
import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';

import { CandidatePhoto, RecommendCard } from '../../../../../components';
import AyeshaCurryImage from '../../../../../assets/img/users/ayesha-curry.jpg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      boxShadow: '0px 4px 25px rgba(0, 0, 0, 0.25)',
      backgroundColor: theme.palette.mainBackColor,
      padding: theme.spacing(1),
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    recommendCard: {
      marginLeft: theme.spacing(2)
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
        recommend={recommend}
        classes={{ root: classes.recommendCard }} />
    </Paper>
  );
};

ProductSnapshot.propTypes = {
  classes: PropTypes.object.isRequired
};

ProductSnapshot.defaultProps = {
  recommend: {
    whichCapacity: 'Direct Report',
    howYouKnow: 'WORKED WITH FOR TWO YEARS',
    whyGreat: `She is a remarkably attentive, focused, detail oriented 
    professional who cares deeply for her clients.`,
    candidate: {
      firstName: 'Adara',
      lastName: 'O.',
      avatar: AyeshaCurryImage,
      linkedInURL: 'https://www.linkedin.com/in/elizabethdelliott/',
      employmentHistories: [
        {
          companyName: '',
          title: 'Sales Professional',
          startYear: '2017',
          startMonth: 'Dec',
          currentlyWorks: true
        }
      ]
    },
    referrer: {
      firstName: 'Joe',
      lastName: 'N.',
      linkedInURL: 'https://www.linkedin.com/in/elizabethdelliott/',
      employmentHistories: [
        {
          companyName: 'McKinsey alumn',
          title: 'Former legislative director to U.S. Senator',
          startYear: '2017',
          startMonth: 'Dec',
          currentlyWorks: true
        }
      ]
    }
  }
};

export default withStyles(styles, { withTheme: true })(ProductSnapshot);
