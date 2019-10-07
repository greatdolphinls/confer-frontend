import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

import { AuthAvatar } from '../index';

const styles = theme => {
  return {
    root: {
      width: 514,
      marginRight: theme.spacing(3),
      color: theme.palette.mainForeColor,
      [theme.breakpoints.down('sm')]: {
        width: '100%'
      }
    },
    title: {
      fontSize: 34,
      marginBottom: theme.spacing(5)
    },
    description: {
      fontSize: 20,
      marginBottom: theme.spacing(5)
    },
    referrers: {
      display: 'flex',
      flexFlow: 'wrap',
      justifyContent: 'space-between',
      marginBottom: theme.spacing(5)
    }
  };
};

const AuthDescription = ({ classes, referrers }) => {
  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        Discover top talent, together.
      </Typography>
      <Typography className={classes.description}>
        Share three people who are <i>the best</i> at what they do. Then access all
        recommendations in your network so you can hire faster with more confidence.
      </Typography>
      <Typography className={classes.description}>
        We don’t ask just anyone to recommend. Join our existing contributors:
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
      avatar: 'https://images.unsplash.com/photo-1563170423-18f482d82cc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      role: 'Co-founder GLG'
    },
    {
      firstName: 'Andy',
      lastName: 'Dunn',
      avatar: 'https://images.unsplash.com/photo-1557612083-4b87d90dd7c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      role: 'Co-founder Bonobos'
    },
    {
      firstName: 'Amanda',
      lastName: '',
      avatar: 'https://images.unsplash.com/photo-1554741995-7e71ded4ae1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      role: 'CEO of SLT'
    },
    {
      firstName: 'Mia',
      lastName: '',
      avatar: 'https://images.unsplash.com/photo-1549907319-f028c3db04e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      role: 'CEO of Recruit'
    }
  ]
};

AuthDescription.propTypes = {
  referrers: PropTypes.array
};

export default withStyles(styles, { withTheme: true })(AuthDescription);
