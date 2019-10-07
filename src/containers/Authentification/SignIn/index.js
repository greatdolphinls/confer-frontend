import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { loginUser, clearErrors, setLoadingStatus } from '../../../actions';
import { AuthLayout } from '../Shared';
import { PrimaryButton } from '../../../components';
import { useInput } from '../../../utils/hooks';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';
import LogoImage from '../../../assets/img/logo.png';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      marginTop: 36,
      flexDirection: 'column',
      alignItems: 'center'
    },
    logoImage: {
      width: 161,
      marginBottom: 19
    },
    input: {
      marginBottom: theme.spacing(3),
      borderTopLeftRadius: theme.spacing(0.5),
      borderTopRightRadius: theme.spacing(0.5)
    },
    button: {
      marginBottom: theme.spacing(1)
    },
    forgotPassword: {
      fontSize: 16,
      display: 'flex',
      justifyContent: 'center',
      textDecoration: 'none',
      color: theme.palette.subForeColor,
      marginBottom: theme.spacing(4)
    }
  };
};

const SignIn = ({ classes, history, loginUser, clearErrors, setLoadingStatus }) => {
  const email = useInput('');
  const password = useInput('');

  const submitHandler = () => {
    const data = {
      email: email.value,
      password: password.value
    }

    clearErrors();
    setLoadingStatus({
      loading: true,
      text: 'Signing In...'
    });
    loginUser(data, history, successCallback, errorCallback);
  };

  const successCallback = () => {
    setLoadingStatus({ loading: false });
  };

  const errorCallback = error => {
    setLoadingStatus({ loading: false });

    if (!error.response) {
      toast.error(notifications.NO_RESPONSE, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    } else {
      const { data: { message } } = error.response;
      toast.error(message || notifications.NO_RESPONSE, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  };

  return (
    <main className={classes.root}>
      <img src={LogoImage} alt='logo' className={classes.logoImage} />
      <AuthLayout>
        <ValidatorForm
          onSubmit={submitHandler}
          onError={errors => console.log(errors)}>
          <TextValidator
            fullWidth
            name='email'
            label='Email Address'
            className={classes.input}
            value={email.value}
            onChange={email.onChange}
            validators={['isEmail', 'required']}
            errorMessages={['Email is not valid', 'Email cannot be empty']} />
          <TextValidator
            fullWidth
            name='password'
            label='Password'
            type='password'
            className={classes.input}
            value={password.value}
            onChange={password.onChange}
            validators={['required', 'matchRegexp:[0-9a-zA-Z]{6,}']}
            errorMessages={['Password cannot be empty', 'Password must contain at least 6 characters']} />
          <PrimaryButton fullWidth classes={{ root: classes.button }} type='submit'>
            Sign In
          </PrimaryButton>
          <Link to={pageLinks.ForgotPassword.url} className={classes.forgotPassword}>
            Forgot password?
          </Link>
        </ValidatorForm>
      </AuthLayout>
    </main>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorStatus: state.errors.errorStatus,
  loggedInUser: state.auth.user
});

const mapActionToProps = {
  loginUser,
  clearErrors,
  setLoadingStatus
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(SignIn));
