
import React, { useMemo } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';

import { getCurrentEmployment } from '../../../utils/utility';
import LinkedInImage from '../../../assets/img/icons/linkedIn.svg';

const styles = theme => {
  return {
    root: {
      height: 'fit-content',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      boxShadow: '20px 4px 40px rgba(0, 0, 0, 0.05)'
    },
    image: {
      height: 200,
      width: 260,
      borderRadius: 5,
      objectFit: 'cover',
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    tint: {
      position: 'absolute',
      width: '100%',
      height: 200,
      borderRadius: 5,
      backgroundColor: 'rgba(0, 0, 0, 0.29)'
    },
    container: {
      position: 'absolute',
      padding: theme.spacing(2),
      bottom: 0
    },
    name: {
      display: 'flex',
      alignItems: 'center',
      fontSize: 24,
      lineHeight: '24px',
      fontFamily: 'Ogg',
      fontWeight: 'bold',
      color: theme.palette.whiteColor
    },
    linkedIn: {
      marginLeft: theme.spacing(1)
    },
    description: {
      fontSize: 10,
      textTransform: 'uppercase',
      color: theme.palette.whiteColor
    },
    smallDescription: {
      fontSize: 12
    }
  };
};

const CandidatePhoto = ({ classes, candidate, isSmall }) => {

  const currentEmployment = useMemo(() => getCurrentEmployment(candidate.employmentHistories)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    , [candidate]);

  return (
    <div className={classes.root}>
      <img
        alt='candidateImage'
        src={candidate.avatar}
        className={classes.image} />
      <div className={classes.tint} />
      <div className={classes.container}>
        <Typography
          className={classNames(classes.name, { [classes.smallName]: isSmall })}>
          {candidate.firstName}
          <a
            target='_blank'
            rel='noreferrer noopener'
            href={candidate.linkedInURL}
            className={classes.logoContainer}>
            <img
              src={LinkedInImage}
              alt='linkedIn'
              className={classes.linkedIn} />
          </a>
        </Typography>
        <Typography
          className={classNames(classes.description, { [classes.smallDescription]: isSmall })}>
          {`${currentEmployment.title} `}
          {
            !!currentEmployment.companyName &&
            <>
              @
              <u>{currentEmployment.companyName}</u>
            </>
          }
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
