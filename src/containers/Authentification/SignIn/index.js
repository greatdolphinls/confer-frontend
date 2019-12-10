import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { loginUser, setLoadingStatus } from '../../../actions';
import { AuthLayout } from '../Shared';
import { OutlineButton } from '../../../components';
import { useInput } from '../../../utils/hooks';
import { showErrorToast } from '../../../utils/utility'
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      marginTop: theme.spacing(4),
      flexDirection: 'column'
    },
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    input: {
      marginBottom: theme.spacing(3),
      borderTopLeftRadius: theme.spacing(0.5),
      borderTopRightRadius: theme.spacing(0.5)
    },
    button: {
      width: 100,
      marginBottom: theme.spacing(1)
    },
    forgotPassword: {
      width: '100%',
      fontSize: 16,
      display: 'flex',
      justifyContent: 'center',
      textDecoration: 'none',
      color: theme.palette.subForeColor,
      marginBottom: theme.spacing(4)
    }
  };
};

const SignIn = ({ classes, history }) => {
  const dispatch = useDispatch();
  const email = useInput('');
  const password = useInput('');

  const submitHandler = async () => {
    const data = {
      email: email.value,
      password: password.value
    }

    await dispatch(setLoadingStatus({
      loading: true,
      text: 'Signing In...'
    }));
    await dispatch(loginUser(data, history, successCallback, errorCallback));
  };

  const successCallback = () => {
    dispatch(setLoadingStatus({ loading: false }));
  };

  const errorCallback = error => {
    dispatch(setLoadingStatus({ loading: false }));

    if (!error.response) {
      showErrorToast(notifications.NO_RESPONSE);
    } else {
      const { data: { message } } = error.response;
      showErrorToast(message || notifications.NO_RESPONSE);
    }
  };

  return (
    <main className={classes.root}>
      <AuthLayout>
        <ValidatorForm
          className={classes.container}
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
            validators={['required', 'matchRegexp:[0-9a-zA-Z\\d!@#$%^&*]{6,}']}
            errorMessages={['Password cannot be empty', 'Password must contain at least 6 characters']} />
          <OutlineButton
            type='submit'
            classes={{ root: classes.button }}>
            Sign In
          </OutlineButton>
          <Link to={pageLinks.ForgotPassword.url} className={classes.forgotPassword}>
            Forgot password?
          </Link>
        </ValidatorForm>
      </AuthLayout>
    </main>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(SignIn);
