
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

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
    },
    whyGreat: {
      fontSize: 14,
      marginBottom: theme.spacing(1.5)
    },
    howYouKnow: {
      fontSize: 20,
      marginBottom: theme.spacing(0.5)
    }
  };
};

const ReferrerInfo = ({ classes, recommend, showLinkedIn }) => {
  const { referrer, howYouKnow, whyGreat } = recommend;

  return (
    <div className={classes.root}>
      <Avatar src={referrer.avatar} size={158} />
      <div className={classes.infoContent}>
        <Typography className={classes.name}>
          {`${referrer.firstName} ${referrer.lastName}`}
        </Typography>
        <Typography className={classes.howYouKnow}>
          {howYouKnow}
        </Typography>
        <Typography className={classes.whyGreat}>
          {`“${whyGreat}”`}
        </Typography>
        {showLinkedIn &&
          <img src={LinkedInImage} alt='linkedIn' />
        }
      </div>
    </div>
  );
};

ReferrerInfo.propTypes = {
  classes: PropTypes.object.isRequired,
};

ReferrerInfo.defaultProps = {
  showLinkedIn: false
};

export default withStyles(styles, { withTheme: true })(ReferrerInfo);
