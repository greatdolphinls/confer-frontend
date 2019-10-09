import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { Avatar } from '../../../../components';

const styles = (theme) => {
  return {
    root: {
      minWidth: 185,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      padding: theme.spacing(2)
    },
    avatar: {
      marginBottom: theme.spacing(0.5)
    },
    name: {
      fontSize: 14,
      fontWeight: 500
    },
    shortDescription: {
      fontSize: 14
    }
  };
};

const AuthAvatar = ({ referrer, classes }) => {

  return (
    <div className={classes.root}>
      <Avatar
        size={146}
        src={referrer.avatar}
        classes={{ root: classes.avatar }}
      />
      <Typography className={classes.name}>
        {`${referrer.firstName} ${referrer.lastName}`}
      </Typography>
      <Typography className={classes.shortDescription}>
        {referrer.shortDescription}
      </Typography>
    </div>
  )
}

AuthAvatar.defaultProps = {
  referrer: {
    avatar: '',
    firstName: '',
    lastName: '',
    role: ''
  }
};

AuthAvatar.propTypes = {
  referrer: PropTypes.object
};

export default withStyles(styles, { withTheme: true })(AuthAvatar);