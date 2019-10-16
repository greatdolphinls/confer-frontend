
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { Avatar, GroupItem } from '../index';
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
      paddingLeft: theme.spacing(3.5),
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
    shortDescription: {
      fontSize: 20,
      marginBottom: theme.spacing(0.5)
    },
    howYouKnow: {
      marginBottom: theme.spacing(0.5)
    },
    whyGreat: {
      fontSize: 14,
      opacity: 0.6,
      marginBottom: theme.spacing(0.5)
    },
    groupContainer: {
      display: 'flex'
    }
  };
};

const ReferrerInfo = ({ classes, recommend }) => {
  const { referrer, howYouKnow, whyGreat } = recommend;

  return (
    <div className={classes.root}>
      <Avatar src={referrer.avatar} size={158} />
      <div className={classes.infoContent}>
        <div className={classes.headerContainer}>
          <Typography className={classes.name}>
            {`${referrer.firstName} ${referrer.lastName}`}
          </Typography>
          {
            !!referrer.linkedInURL &&
            <a
              target='_blank'
              rel='noreferrer noopener'
              href={referrer.linkedInURL}
              className={classes.logoContainer}>
              <img src={LinkedInImage} alt='linkedIn' />
            </a>
          }
        </div>
        <Typography className={classes.shortDescription}>
          {referrer.shortDescription}
        </Typography>
        <Typography className={classes.howYouKnow}>
          {howYouKnow}
        </Typography>
        <Typography className={classes.whyGreat}>
          {`“${whyGreat}”`}
        </Typography>
        {
          !!referrer.groupObjects &&
          <div className={classes.groupContainer}>
            {referrer.groupObjects.map((group, index) => (
              <GroupItem key={index} name={group.name} />
            ))}
          </div>
        }

      </div>
    </div>
  );
};

ReferrerInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  recommend: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ReferrerInfo);
