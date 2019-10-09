import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { AuthAvatar } from '../index';
import MarkGeosonImage from '../../../../assets/img/users/mark_geoson.jpg';
import AmandaFreemanImage from '../../../../assets/img/users/amanda_freeman.jpg';
import TaliRapaportImage from '../../../../assets/img/users/tali_rapaport.jpg';
import AniqRahmanImage from '../../../../assets/img/users/aniq_rahman.jpg';

const styles = theme => {
  return {
    root: {
      width: 548,
      marginRight: theme.spacing(2),
      color: theme.palette.mainForeColor,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    title: {
      fontSize: 34,
      marginBottom: theme.spacing(3)
    },
    description: {
      fontSize: 17,
      marginBottom: theme.spacing(3)
    },
    subDescription: {
      fontSize: 24
    },
    referrers: {
      display: 'flex',
      flexFlow: 'wrap',
      justifyContent: 'space-around',
      marginBottom: theme.spacing(5)
    }
  };
};

const AuthDescription = ({ classes, referrers }) => {
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Hire the best by paying it forward.
      </Typography>
      <Typography className={classes.description}>
        Recommend three people who are the best at what they do.
        Once they’re approved, you’ll get access to all
        recommendations in your collective so you can hire
        with confidence. Forget expensive search firms;
        identify great talent through people you trust at no cost.
      </Typography>
      <Typography className={classes.subDescription}>
        We don’t ask just anyone to recommend. Join our current members:
      </Typography>
      <div className={classes.referrers}>
        {referrers.map((referrer, index) => (
          <AuthAvatar key={index} referrer={referrer} />
        ))}
      </div>
    </div>
  );
};

AuthDescription.defaultProps = {
  referrers: [
    {
      firstName: 'Mark',
      lastName: 'Gerson',
      avatar: MarkGeosonImage,
      shortDescription: 'Co-founder GLG'
    },
    {
      firstName: 'Amanda',
      lastName: 'Freeman',
      avatar: AmandaFreemanImage,
      shortDescription: 'Founder & CEO, SLT'
    },
    {
      firstName: 'Tali',
      lastName: 'Rapaport',
      avatar: TaliRapaportImage,
      shortDescription: 'VP Product, Lyft'
    },
    {
      firstName: 'Aniq',
      lastName: 'Rahman',
      avatar: AniqRahmanImage,
      shortDescription: 'Co-founder, Moat'
    }
  ]
};

AuthDescription.propTypes = {
  referrers: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(AuthDescription);
