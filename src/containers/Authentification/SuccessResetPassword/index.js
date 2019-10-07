import React from 'react';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { ForgotPasswordLayout } from '../Shared';
import { PrimaryButton } from '../../../components';
import { pageLinks } from '../../../constants/links';

const styles = theme => {
  return {
    root: {},
    button: {
      marginBottom: theme.spacing(2)
    },
    description: {
      fontSize: 20,
      fontWeight: 500,
      textAlign: 'center',
      marginBottom: theme.spacing(3)
    }
  };
};

const SuccessResetPassword = ({ classes, history }) => {

  const buttonHandler = () => {
    history.push(pageLinks.SignIn.url);
  };

  return (
    <ForgotPasswordLayout>
      <Typography className={classes.description}>
        Your password has been reset.
      </Typography>
      <PrimaryButton
        fullWidth
        onClick={buttonHandler}
        classes={{ root: classes.button }}>
        Log in now
      </PrimaryButton>
    </ForgotPasswordLayout>
  );
};

export default withStyles(styles)(SuccessResetPassword);
