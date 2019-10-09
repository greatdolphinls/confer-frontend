import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import withStyles from '@material-ui/core/styles/withStyles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import { registerUser, clearErrors, setLoadingStatus } from '../../../actions';
import { AuthLayout } from '../Shared';
import { PrimaryButton } from '../../../components';
import { useInput } from '../../../utils/hooks';
import { pageLinks } from '../../../constants/links';
import notifications from '../../../constants/notifications';
import GroupImage from '../../../assets/img/groupLogos/techaviv.svg';

const styles = theme => {
  return {
    root: {
      width: '100%',
      display: 'flex',
      marginTop: theme.spacing(3),
      flexDirection: 'column',
      alignItems: 'center'
    },
    groupImage: {
      width: 161,
      height: 49,
      marginBottom: theme.spacing(4)
    },
    input: {
      marginBottom: theme.spacing(3),
      borderTopLeftRadius: theme.spacing(0.5),
      borderTopRightRadius: theme.spacing(0.5)
    },
    button: {
      marginBottom: theme.spacing(6),
    }
  };
};

const SignUp = ({ classes, match, history, setLoadingStatus, clearErrors, registerUser }) => {
  const email = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const password = useInput('');
  const groupPassword = useInput('');

  const submitHandler = () => {
    const groupId = match.params.group;
    const data = {
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      password: password.value,
      groupId,
      groupPassword: groupPassword.value,
      host: window.location.origin
    }

    clearErrors();
    setLoadingStatus({
      loading: true,
      text: 'Sign Up ...'
    });
    registerUser(data, successCallback, errorCallback);
  }

  const successCallback = () => {
    setLoadingStatus({ loading: false });
    history.replace(pageLinks.SignIn.url);
    toast.info(notifications.SIGN_UP_SUCCESS, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  const errorCallback = (response, message, status) => {
    setLoadingStatus({ loading: false });
    if (status === 402) {
      history.replace(pageLinks.SignIn.url);
    }
    toast.error(message || notifications.NO_RESPONSE, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  };

  return (
    <main className={classes.root}>
      <img src={GroupImage} alt='group logo' className={classes.groupImage} />
      <AuthLayout selectedTab='signup' >
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
            name='firstName'
            label='First Name'
            className={classes.input}
            value={firstName.value}
            onChange={firstName.onChange}
            validators={['required']}
            errorMessages={['First Name cannot be empty']} />
          <TextValidator
            fullWidth
            name='lastName'
            label='Last Name'
            className={classes.input}
            value={lastName.value}
            onChange={lastName.onChange}
            validators={['required']}
            errorMessages={['Last Name cannot be empty']} />
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
          <TextValidator
            fullWidth
            name='groupPassword'
            label='Group Password'
            type='password'
            className={classes.input}
            value={groupPassword.value}
            onChange={groupPassword.onChange}
            validators={['required']}
            errorMessages={['Group Password cannot be empty']} />
          <PrimaryButton fullWidth classes={{ root: classes.button }} type='submit'>
            Sign Up
          </PrimaryButton>
        </ValidatorForm>
      </AuthLayout>
    </main>
  );
};

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  errorStatus: state.errors.errorStatus
});

const mapActionToProps = {
  registerUser,
  clearErrors,
  setLoadingStatus
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(SignUp));
