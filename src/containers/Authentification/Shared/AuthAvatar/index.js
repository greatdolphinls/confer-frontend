import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { Avatar } from '../../../../components';

const styles = (theme) => {
  return {
    root: {
      padding: theme.spacing(2)
    },
    avatar: {
      marginBottom: theme.spacing(1.5)
    },
    info: {
      fontSize: 14
    }
  };
};

const AuthAvatar = ({ referrer, classes }) => {

  return (
    <div className={classes.root}>
      <Avatar
        size={145}
        src={referrer.avatar}
        classes={{ root: classes.avatar }}
      />
      <Typography className={classes.info}>
        {`${referrer.firstName} ${referrer.lastName}`}
      </Typography>
      <Typography className={classes.info}>
        {referrer.role}
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