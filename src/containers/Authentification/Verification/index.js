import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import { ForgotPasswordLayout } from '../Shared';
import { PrimaryButton } from '../../../components';
import { pageLinks } from '../../../constants/links';

const styles = theme => {
  return {
    root: {},
    button: {
      width: 'fit-content',
      marginBottom: theme.spacing(2)
    },
    mainDescription: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: theme.spacing(3)
    },
    footerDescription: {
      fontSize: 12,
      textAlign: 'center'
    }
  };
};

const Verification = ({ classes, match, history }) => {

  const buttonHandler = () => {
    history.push(pageLinks.ResetPassword.url.replace(':token', match.params.token));
  };

  return (
    <ForgotPasswordLayout>
      <Typography className={classes.mainDescription}>
        Looks like you forgot your password. Good news,
        you can reset it by clicking the button below.
      </Typography>
      <PrimaryButton fullWidth onClick={buttonHandler} classes={{ root: classes.button }}>
        RESET PASSWORD
      </PrimaryButton>
      <Typography className={classes.footerDescription}>
        If you didn’t request your password to be reset, just ignore this page.
      </Typography>
    </ForgotPasswordLayout>
  );
};

Verification.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Verification);