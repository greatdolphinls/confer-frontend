
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { Avatar } from '../index';
import { getCurrentEmployment, getTotalYears } from '../../utils/utility';
import LinkedInImage from '../../assets/img/icons/linkedIn.svg';

const styles = theme => {
  return {
    root: {
      display: 'flex',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      }
    },
    infoContent: {
      width: '100%',
      paddingLeft: theme.spacing(3),
      [theme.breakpoints.down('xs')]: {
        marginTop: theme.spacing(2),
        paddingLeft: 0,
      }
    },
    headerContainer: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between'
    },
    name: {
      fontSize: 24
    },
    location: {
      fontSize: 14,
      fontWeight: 500,
      opacity: 0.6,
      marginBottom: theme.spacing(1)
    },
    description: {
      fontSize: 20,
      marginBottom: theme.spacing(0.5)
    },
    subDescription: {
      fontSize: 14,
      fontWeight: 500,
      opacity: 0.6,
      marginBottom: theme.spacing(0.5)
    }
  };
};

const CandidateInfo = ({ classes, recommend }) => {
  const { candidate, expertiseArea, subExpertises } = recommend;

  const expertises
    = expertiseArea + ','
    + subExpertises.map((subExpertise) => (' ' + subExpertise));

  const currentEmployment = getCurrentEmployment(candidate.employmentHistories);
  const totalYears = getTotalYears(candidate.employmentHistories);

  return (
    <div className={classes.root}>
      <Avatar src={candidate.avatar} size={158} />
      <div className={classes.infoContent}>
        <div className={classes.headerContainer}>
          <Typography className={classes.name}>
            {`${candidate.firstName} ${candidate.lastName}`}
          </Typography>
          {
            !!candidate.linkedInURL &&
            <a
              target='_blank'
              rel='noreferrer noopener'
              href={candidate.linkedInURL}
              className={classes.logoContainer}>
              <img src={LinkedInImage} alt='linkedIn' />
            </a>
          }
        </div>
        <Typography className={classes.location}>
          {candidate.location}
        </Typography>
        {
          !!currentEmployment &&
          <Typography className={classes.description}>
            {`${currentEmployment.title} @ ${currentEmployment.companyName}`}
          </Typography>
        }
        <Typography className={classes.subDescription}>
          {`Total ${totalYears} years of experience`}
        </Typography>
        <Typography className={classes.subDescription}>
          {`Expertise in ${expertises}`}
        </Typography>
      </div>
    </div>
  );
};

CandidateInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  recommend: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(CandidateInfo);
