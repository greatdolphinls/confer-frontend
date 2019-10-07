import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles';

import { ForgotPasswordLayout } from '../Shared';
import { PrimaryButton } from '../../../components';

const styles = theme => {
  return {
    root: {},
    button: {
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
    const token = match.params.token;
    const url = '/reset-password/' + token;

    history.push(url);
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

const mapStateToProps = state => ({
});

const mapActionToProps = {
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(Verification));
