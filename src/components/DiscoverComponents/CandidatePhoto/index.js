
import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { getCurrentEmployment } from '../../../utils/utility';
import LinkedInImage from '../../../assets/img/icons/linkedIn.svg';

const styles = theme => {
  return {
    root: {
      width: 374,
      height: 374,
      minWidth: 374,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    image: {
      width: '100%',
      height: '100%',
      borderRadius: 5,
      objectFit: 'cover'
    },
    container: {
      position: 'absolute',
      padding: theme.spacing(1),
      bottom: 0
    },
    name: {
      display: 'flex',
      alignItems: 'flex-end',
      fontSize: 30,
      lineHeight: '20px',
      fontFamily: 'Moret-Bold',
      color: theme.palette.whiteColor,
      marginBottom: theme.spacing(0.5)
    },
    smallName: {
      fontSize: 24
    },
    linkedIn: {
      marginLeft: theme.spacing(1)
    },
    description: {
      fontSize: 14,
      textAlign: 'center',
      textTransform: 'uppercase',
      color: theme.palette.whiteColor
    },
    smallDescription: {
      fontSize: 12
    }
  };
};

const CandidatePhoto = ({ classes, candidate, isSmall }) => {
  const currentEmployment = getCurrentEmployment(candidate.employmentHistories);

  return (
    <div className={classes.root}>
      <img
        alt='candidateImage'
        src={candidate.avatar}
        className={classes.image} />
      <div className={classes.container}>
        <Typography
          className={classNames(classes.name, { [classes.smallName]: isSmall })}>
          {`${candidate.firstName} ${candidate.lastName}`}
          <img
            src={LinkedInImage}
            alt='linkedIn'
            className={classes.linkedIn} />
        </Typography>
        <Typography
          className={classNames(classes.description, { [classes.smallDescription]: isSmall })}>
          {`${currentEmployment.title} @`}
          <u>{currentEmployment.companyName}</u>
        </Typography>
      </div>
    </div>
  );
};

CandidatePhoto.propTypes = {
  classes: PropTypes.object.isRequired
};

CandidatePhoto.defaultProps = {
  isSmall: false
};

export default withStyles(styles, { withTheme: true })(CandidatePhoto);
