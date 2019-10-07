
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { defaultAvatarLink } from '../../constants/links';
import { Avatar } from '../index';
import LinkedInImage from '../../assets/img/linkedIn.svg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      }
    },
    infoContent: {
      paddingLeft: theme.spacing(3.5),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(2),
        paddingLeft: 0,
      }
    },
    name: {
      fontSize: 24,
      color: theme.palette.buttonColor
    },
    location: {
      fontSize: 14,
      marginBottom: theme.spacing(1.5)
    },
    employment: {
      fontSize: 20,
      marginBottom: theme.spacing(0.5)
    },
    referrer: {
      fontSize: 20,
      marginBottom: theme.spacing(0.5)
    },
    referrerName: {
      color: theme.palette.buttonColor
    }
  };
};

const CandidateInfo = ({ classes, candidate, referrer, showReferrer, showLinkedIn }) => {

  const renderReferrer = () => {
    if (!showReferrer) {
      return (
        <Typography className={classes.employment}>
          {`Total ${candidate.yearsOfExperience} years of experience`}
        </Typography>
      );
    }

    const { firstName, lastName, currentEmployment: { companyName, title } } = referrer;
    return (
      <Typography className={classes.referrer}>
        Recommended by
        <span className={classes.referrerName}>{` ${firstName} ${lastName}`}</span>
        {`, ${title} of ${companyName} `}
      </Typography>
    );
  }

  return (
    <div className={classes.root}>
      <Avatar src={candidate.avatar} size={158} />
      <div className={classes.infoContent}>
        <Typography className={classes.name}>
          {`${candidate.firstName} ${candidate.lastName}`}
        </Typography>
        <Typography className={classes.location}>
          {candidate.location}
        </Typography>
        <Typography className={classes.employment}>
          {`${candidate.currentEmployment.title} @ ${candidate.currentEmployment.companyName}`}
        </Typography>
        {renderReferrer()}
        {showLinkedIn &&
          <img src={LinkedInImage} alt='linkedIn' />
        }
      </div>
    </div>
  );
};

CandidateInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  candidate: PropTypes.object.isRequired,
  referrer: PropTypes.object.isRequired
};

CandidateInfo.defaultProps = {
  candidate: {
    firstName: '',
    lastName: '',
    avatar: defaultAvatarLink,
    location: '',
    linkedInURL: '',
    yearsOfExperience: 0,
    currentEmployment: {
      companyName: '',
      title: ''
    }
  },
  referrer: {
    firstName: '',
    lastName: '',
    currentEmployment: {
      companyName: '',
      title: ''
    }
  },
  showReferrer: false,
  showLinkedIn: false
};

export default withStyles(styles, { withTheme: true })(CandidateInfo);
